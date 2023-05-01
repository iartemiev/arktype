import type { TypeConfig } from "../type.js"
import type { Domain } from "../utils/domains.js"
import type { constructor, evaluate, instanceOf } from "../utils/generics.js"
import { CompiledFunction } from "../utils/generics.js"
import { Path } from "../utils/paths.js"
import { stringify } from "../utils/serialize.js"
import type { PredicateNode } from "./predicate.js"
import type { ProblemCode, ProblemRules } from "./problems.js"
import type { RangeNode } from "./range.js"
import type { TypeNode } from "./type.js"
import type { CompiledPath } from "./utils.js"
import { compilePathAccess, In, insertInitialPropAccess } from "./utils.js"

type BaseAssertion =
    | `${CompiledPath}${string}`
    | `typeof ${CompiledPath}${string}`

type parenthesizable<s extends string> = s | `(${s}`

type negatable<s extends string> = s | `!${s}`

export type CompiledAssertion = evaluate<
    negatable<parenthesizable<parenthesizable<BaseAssertion>>>
>

export type NodeSubclass<subclass extends NodeSubclass<any>> = {
    readonly kind: NodeKind
    new (...args: any[]): Node<subclass>
    compile(definition: any): CompiledAssertion
    intersect(
        l: instanceOf<subclass>,
        r: instanceOf<subclass>
    ): instanceOf<subclass> | DisjointNode
}

type NodeKind =
    | "type"
    | "predicate"
    | "basis"
    | "divisor"
    | "range"
    | "regex"
    | "props"
    | "namedProp"
    | "filter"
    | "morph"

export abstract class Node<
    subclass extends NodeSubclass<subclass> = NodeSubclass<any>,
    input = any,
    narrowed extends input = input
> {
    declare kind: subclass["kind"]
    declare key: CompiledAssertion
    declare allows: (data: input) => data is narrowed

    static #cache: { [kind in NodeKind]: Record<CompiledAssertion, Node> } = {
        type: {},
        predicate: {},
        basis: {},
        divisor: {},
        range: {},
        regex: {},
        props: {},
        namedProp: {},
        filter: {},
        morph: {}
    }

    constructor(
        protected subclass: subclass,
        definition: Parameters<subclass["compile"]>[0]
    ) {
        const kind = subclass.kind
        const key = subclass.compile(definition)
        if (Node.#cache[kind][key]) {
            return Node.#cache[kind][key] as instanceOf<subclass>
        }
        this.key = key
        this.kind = kind
        this.allows = new CompiledFunction<(data: input) => data is narrowed>(
            In,
            `return ${key}`
        )
        Node.#cache[kind][key] = this
    }

    #intersections: Record<string, instanceOf<subclass> | DisjointNode> = {}
    intersect(other: instanceOf<subclass>) {
        if (this.key === other.key) {
            return this as instanceOf<subclass>
        }
        if (this.#intersections[other.key]) {
            return this.#intersections[other.key]
        }
        const result = this.subclass.intersect(
            this as instanceOf<subclass>,
            other
        )
        this.#intersections[other.key] = result
        other.#intersections[this.key] =
            result instanceof DisjointNode ? result.invert() : result
        return result
    }

    abstract compileTraverse(s: CompilationState): string
}

// TODO: multiple disjoints
// intersect ["===", 5], ["===", "foo"]
// const disjoints = {
//     domain: {
//         l: "number",
//         r: "string"
//     },
//     value: {
//         l: 5,
//         r: "foo"
//     }
// }

export type Disjoint = {
    domain?: {
        l: Domain
        r: Domain
    }
    range?: {
        l: RangeNode
        r: RangeNode
    }
    class?: {
        l: constructor
        r: constructor
    }
    value?: {
        l: unknown
        r: unknown
    }
    assignability?:
        | {
              l: unknown
              r: PredicateNode
          }
        | {
              l: PredicateNode
              r: unknown
          }
    union?: {
        l: TypeNode
        r: TypeNode
    }
}

export type DisjointsByPath = Record<CompiledPath, Disjoint>

export type DisjointKind = keyof Disjoint

// TODO: qualified disjoint here?
export class DisjointNode {
    constructor(public paths: DisjointsByPath) {}

    static from(disjoint: Disjoint) {
        return new DisjointNode({ $arkIn: disjoint })
    }

    invert() {
        const inverted: DisjointsByPath = {}
        let path: CompiledPath
        for (path in this.paths) {
            const disjoint = this.paths[path]
            const invertedKinds: Disjoint = {}
            let kind: DisjointKind
            for (kind in disjoint) {
                invertedKinds[kind] = {
                    l: disjoint[kind]!.r as never,
                    r: disjoint[kind]!.l as never
                }
            }
            inverted[path] = invertedKinds
        }
        return new DisjointNode(inverted)
    }

    withPrefixKey(key: string) {
        const disjoints: DisjointsByPath = {}
        let path: CompiledPath
        for (path in this.paths) {
            disjoints[insertInitialPropAccess(path, key)] = this.paths[path]
        }
        return new DisjointNode(disjoints)
    }

    toString() {
        return stringify(this.paths)
    }
}

export type TraversalConfig = {
    [k in keyof TypeConfig]-?: TypeConfig[k][]
}

const initializeCompilationConfig = (): TraversalConfig => ({
    mustBe: [],
    keys: []
})

export class CompilationState {
    path = new Path()
    lastkind: Domain = "undefined"
    unionDepth = 0
    traversalConfig = initializeCompilationConfig()

    constructor() {}

    get data() {
        return compilePathAccess(this.path)
    }

    problem<code extends ProblemCode>(code: code, rule: ProblemRules[code]) {
        return `${
            this.unionDepth ? "return " : ""
        }state.addProblem("${code}", ${
            typeof rule === "function" ? rule.name : JSON.stringify(rule)
        }, ${this.data}, ${this.path.json})` as const
    }

    ifThen<condition extends string, onTrue extends string>(
        condition: condition,
        onTrue: onTrue
    ) {
        return `if (${condition}) {
            ${onTrue}
        }`
    }

    ifNotThen<condition extends string, onFalse extends string>(
        condition: condition,
        onFalse: onFalse
    ) {
        return `if (!(${condition})) {
            ${onFalse}
        }`
    }

    //     arrayOf(node: Node<any>) {
    //         // TODO: increment. does this work for logging?
    //         this.path.push("${i}")
    //         const result = `(() => {
    //     let valid = true;
    //     for(let i = 0; i < ${this.data}.length; i++) {
    //         valid = ${node.compile(this)} && isValid;
    //     }
    //     return valid
    // })()`
    //         this.path.pop()
    //         return result
    //     }
}
