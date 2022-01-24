import { Modifier } from "../modifier.js"
import { Fragment } from "../../fragment.js"
import {
    duplicateModifierError,
    typeDefProxy,
    createParser
} from "../internal.js"

// Any
// Not (!)
// Or (|)
// And (,)
// Keywords (e.g. positive, email)

// Numbers:
// Less than/greater, equals (>, <, =)
// Integer
// Positive
// Negative

// Strings:
// Length
// Regex

export namespace Constraint {
    export type Definition<
        Def extends string = string,
        Constraints extends string = string
    > = `${Def}:${Constraints}`

    export const type = typeDefProxy as Definition

    export const parse = createParser(
        {
            type,
            parent: () => Modifier.parse,
            components: (def, ctx) => {
                const parts = def.split(":")
                if (parts.length > 2) {
                    throw new Error(duplicateModifierError(":"))
                }
                return {
                    typeDef: Fragment.parse(parts[0], ctx),
                    constraints: parts[1]
                }
            }
        },
        {
            matches: (def) => def.includes(":"),
            allows: ({ def, components, ctx }, valueType, opts) => {
                return {}
            },
            generate: ({ components }, opts) =>
                components.typeDef.generate(opts)
        }
    )

    export const delegate = parse as any as Definition
}
