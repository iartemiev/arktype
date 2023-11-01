import type {
	AbstractableConstructor,
	conform,
	ErrorMessage,
	exactMessageOnError,
	mutable
} from "@arktype/util"
import {
	domainOf,
	isKeyOf,
	listFrom,
	throwInternalError,
	throwParseError,
	transform
} from "@arktype/util"
import {
	baseAttributeKeys,
	type BaseAttributes,
	BaseNode,
	type declareNode,
	type IrreducibleRefinementKind,
	irreducibleRefinementKinds,
	type withAttributes
} from "../base.js"
import type { BasisKind, parseBasis } from "../bases/basis.js"
import type { DomainSchema, NonEnumerableDomain } from "../bases/domain.js"
import { DomainNode } from "../bases/domain.js"
import type { ProtoSchema } from "../bases/proto.js"
import { ProtoNode } from "../bases/proto.js"
import type { DiscriminableUnitSchema, UnitSchema } from "../bases/unit.js"
import { UnitNode } from "../bases/unit.js"
import type {
	ConstraintContext,
	ConstraintIntersectionInput,
	ConstraintKind
} from "../constraints/constraint.js"
import { Disjoint } from "../disjoint.js"
import {
	type Node,
	type NodeClass,
	type RuleKind,
	type Schema
} from "../nodes.js"
import { RootNode } from "../root.js"
import { type MorphSchema } from "./morph.js"

export type IntersectionInner = withAttributes<{
	readonly [k in RuleKind]?: k extends IrreducibleRefinementKind
		? readonly Node<k>[]
		: Node<k>
}>

export type IntersectionDeclaration = declareNode<
	"intersection",
	{
		schema: IntersectionSchema
		inner: IntersectionInner
		intersections: {
			intersection: "intersection" | Disjoint
			constraint: "intersection" | Disjoint
		}
	},
	typeof IntersectionNode
>

export class IntersectionNode<t = unknown> extends RootNode<
	IntersectionDeclaration,
	t
> {
	static readonly kind = "intersection"

	static {
		this.classesByKind.intersection = this
	}

	declare readonly constraints: readonly Node<ConstraintKind>[]
	declare readonly refinements: readonly Node<ConstraintKind>[]

	constructor(inner: IntersectionInner) {
		const rawConstraints = flattenConstraints(inner)
		const reducedConstraints = intersectConstraints([], rawConstraints)
		if (reducedConstraints instanceof Disjoint) {
			return reducedConstraints.throw()
		}
		if (reducedConstraints.length < rawConstraints.length) {
			const reducedInner = unflattenConstraints(reducedConstraints)
			if ("alias" in inner) {
				reducedInner.alias = inner.alias
			}
			if ("description" in inner) {
				reducedInner.description = inner.description
			}
			inner = reducedInner
		}
		super(inner)
		this.constraints = reducedConstraints
		this.basis = this.constraints[0]?.isBasis()
			? this.constraints[0]
			: undefined
		this.refinements = (
			this.constraints[0]?.isBasis()
				? this.constraints.slice(1)
				: this.constraints
		) as never
		assertValidRefinements(this.basis, this.refinements)
	}

	static compile = this.defineCompiler((inner) => "true")

	static readonly keyKinds = this.declareKeys(
		transform(constraintClassesByKind, ([kind]) => [kind, "in"] as const)
	)

	static childrenOf(inner: IntersectionInner): readonly Node<ConstraintKind>[] {
		return Object.values(inner)
			.flat()
			.filter(
				(value): value is Node<ConstraintKind> => value instanceof BaseNode
			)
	}

	static readonly intersections = this.defineIntersections({
		intersection: (l, r) => {
			const constraints = intersectConstraints(l.constraints, r.constraints)
			return constraints instanceof Disjoint
				? constraints
				: unflattenConstraints(constraints)
		},
		constraint: (l, r) => {
			const constraints = addConstraint(l.constraints, r)
			return constraints instanceof Disjoint
				? constraints
				: unflattenConstraints(constraints)
		}
	})

	readonly basis: Node<BasisKind> | undefined;
	// for ease of use when comparing to MorphNode
	readonly in = this
	readonly out = undefined

	static parse(schema: IntersectionSchema) {
		const inner = parseIntersectionSchema(schema as never)
		return new IntersectionNode(inner)
	}

	static writeDefaultDescription(inner: IntersectionInner) {
		const constraints = flattenConstraints(inner)
		return constraints.length === 0 ? "a value" : constraints.join(" and ")
	}
}

const flattenConstraints = (inner: IntersectionInner) =>
	Object.values(inner)
		.flat()
		.filter((v): v is Node<ConstraintKind> => v instanceof BaseNode)

const unflattenConstraints = (constraints: readonly Node<ConstraintKind>[]) => {
	return constraints.reduce<mutable<IntersectionInner>>((result, node) => {
		if (isKeyOf(node.kind, irreducibleRefinementKinds)) {
			const existing = result[node.kind] as
				| Node<IrreducibleRefinementKind>[]
				| undefined
			if (existing) {
				existing.push(node as never)
			} else {
				result[node.kind] = [node as never]
			}
		} else if (result[node.kind]) {
			throwInternalError(`Unexpected intersection ${node.kind} nodes`)
		} else {
			result[node.kind] = node as never
		}
		return result
	}, {})
}

const intersectConstraints = (
	l: readonly Node<ConstraintKind>[],
	r: readonly Node<ConstraintKind>[]
) => {
	let constraints: Node<ConstraintKind>[] | Disjoint = [...l]
	for (const constraint of r) {
		if (constraints instanceof Disjoint) {
			break
		}
		constraints = addConstraint(constraints, constraint)
	}
	return constraints
}

const addConstraint = (
	constraints: readonly Node<ConstraintKind>[],
	constraint: Node<ConstraintKind>
): Node<ConstraintKind>[] | Disjoint => {
	const result: Node<ConstraintKind>[] = []
	if (constraint.isBasis() && !constraints.at(0)?.isBasis()) {
		return [constraint, ...constraints]
	}
	let includesConstraint = false
	for (let i = 0; i < constraints.length; i++) {
		const elementResult = constraint.intersect(constraints[i])
		if (elementResult === null) {
			result.push(constraints[i])
		} else if (elementResult instanceof Disjoint) {
			return elementResult
		} else if (!includesConstraint) {
			result.push(elementResult)
			includesConstraint = true
		} else if (!result.includes(elementResult)) {
			return throwInternalError(
				`Unexpectedly encountered multiple distinct intersection results for constraint ${elementResult}`
			)
		}
	}
	if (!includesConstraint) {
		result.push(constraint)
	}
	return result
}

const assertValidRefinements: (
	basis: Node<BasisKind> | undefined,
	refinements: readonly Node<ConstraintKind>[]
) => asserts refinements is Node<ConstraintKind>[] = (basis, refinements) => {
	for (const refinement of refinements) {
		if (
			!refinement.nodeClass.basis.isUnknown() &&
			(!basis || !basis.extends(refinement.nodeClass.basis))
		) {
			throwParseError(refinement.writeInvalidBasisMessage(basis))
		}
	}
}

const parseIntersectionSchema = (
	schema: IntersectionSchema
): IntersectionInner => {
	switch (typeof schema) {
		case "string":
			return { domain: DomainNode.parse(schema) }
		case "function":
			return { proto: ProtoNode.parse(schema) }
		case "object":
			if ("is" in schema) {
				return { unit: UnitNode.parse(schema) }
			}
			// this could also be UnknownBranchInput but basised makes the type
			// easier to deal with internally
			return parseIntersectionObjectSchema(schema as BasisedBranchInput)
		default:
			return throwParseError(
				`${domainOf(schema)} is not a valid intersection schema input.`
			)
	}
}

const parseIntersectionObjectSchema = (schema: BasisedBranchInput) => {
	const basis: Node<BasisKind> | undefined = schema.unit
		? UnitNode.parse(schema.unit)
		: schema.proto
		? ProtoNode.parse(schema.proto)
		: schema.domain
		? DomainNode.parse(schema.domain)
		: undefined
	const refinementContext: ConstraintContext = { basis }
	return transform(schema, ([k, v]) =>
		isKeyOf(k, irreducibleRefinementKinds)
			? [
					k,
					listFrom(v).map((innerSchema) =>
						constraintClassesByKind[k].parse(innerSchema as never)
					)
			  ]
			: isKeyOf(k, constraintClassesByKind)
			? [k, (constraintClassesByKind[k].parse as any)(v, refinementContext)]
			: isKeyOf(k, baseAttributeKeys)
			? [k, v]
			: throwParseError(`'${k}' is not a valid refinement kind`)
	) as IntersectionInner
}

type refinementKindOf<basis> = {
	[k in ConstraintKind]: basis extends NodeClass<k>["basis"]["infer"]
		? k
		: never
}[ConstraintKind]

export type refinementsOf<basis> = {
	[k in refinementKindOf<basis>]?: Node<k>
}

type refinementInputsOf<basis> = {
	[k in refinementKindOf<basis>]?: ConstraintIntersectionInput<k>
}

type IntersectionBasisInput<
	basis extends Schema<BasisKind> = Schema<BasisKind>
> =
	| {
			domain: conform<basis, DomainSchema>
			proto?: never
			unit?: never
	  }
	| {
			domain?: never
			proto: conform<basis, ProtoSchema>
			unit?: never
	  }
	| {
			domain?: never
			proto?: never
			unit: conform<basis, UnitSchema>
	  }

export type BasisedBranchInput<
	basis extends Schema<BasisKind> = Schema<BasisKind>
> = IntersectionBasisInput<basis> &
	refinementInputsOf<parseBasis<basis>> &
	BaseAttributes

export type UnknownBranchInput = {
	predicate?: ConstraintIntersectionInput<"predicate">
} & BaseAttributes

type DiscriminableBasisInputValue =
	| AbstractableConstructor
	| NonEnumerableDomain
	| DiscriminableUnitSchema

export type IntersectionSchema<
	basis extends Schema<BasisKind> = Schema<BasisKind>
> =
	| conform<basis, DiscriminableBasisInputValue>
	| UnknownBranchInput
	| BasisedBranchInput<basis>

export type parseIntersection<input> = input extends
	| AbstractableConstructor
	| NonEnumerableDomain
	| DiscriminableUnitSchema
	? parseBasis<input>
	: input extends IntersectionBasisInput<infer basis>
	? parseBasis<basis>
	: unknown

type exactBasisMessageOnError<branch extends BasisedBranchInput, expected> = {
	[k in keyof branch]: k extends keyof expected
		? conform<branch[k], expected[k]>
		: ErrorMessage<`'${k & string}' is not allowed by ${branch[keyof branch &
				BasisKind] extends string
				? `basis '${branch[keyof branch & BasisKind]}'`
				: `this schema's basis`}`>
}

export type validateIntersectionInput<input> = input extends
	| NonEnumerableDomain
	| AbstractableConstructor
	? input
	: input extends DiscriminableUnitSchema
	? exactMessageOnError<input, DiscriminableUnitSchema>
	: input extends IntersectionBasisInput<infer basis>
	? exactBasisMessageOnError<input, BasisedBranchInput<basis>>
	: input extends UnknownBranchInput
	? exactMessageOnError<input, UnknownBranchInput>
	: DiscriminableUnitSchema | IntersectionSchema | MorphSchema

// export class ArrayPredicate extends composePredicate(
// 	Narrowable<"object">,
// 	Instantiatable<typeof Array>,
// 	Boundable
// ) {
// 	// TODO: add minLength prop that would result from collapsing types like [...number[], number]
// 	// to a single variadic number prop with minLength 1
// 	// Figure out best design for integrating with named props.

// 	readonly prefix?: readonly TypeRoot[]
// 	readonly variadic?: TypeRoot
// 	readonly postfix?: readonly TypeRoot[]
// }

// export class DatePredicate extends composePredicate(
// 	Narrowable<"object">,
// 	Instantiatable<typeof Date>,
// 	Boundable
// ) {}
