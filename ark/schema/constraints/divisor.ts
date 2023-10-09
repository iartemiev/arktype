import type { conform } from "@arktype/util"
import { Hkt } from "@arktype/util"
import { baseAttributeProps, type BaseAttributes, schema } from "../node.js"
import type { Basis } from "./basis.js"
import { BaseConstraint, constraintParser } from "./constraint.js"
import type { DomainNode } from "./domain.js"
import type { BaseRefinement } from "./refinement.js"

export interface DivisibilitySchema extends BaseAttributes {
	divisor: number
}

export type DivisibilityInput = number | DivisibilitySchema

export class DivisibilityNode extends BaseConstraint implements BaseRefinement {
	readonly kind = "divisor"

	protected constructor(schema: DivisibilitySchema) {
		super(schema)
	}

	static hkt = new (class extends Hkt {
		f = (input: conform<this[Hkt.key], DivisibilityInput>) => {
			return new DivisibilityNode(
				typeof input === "number" ? { divisor: input } : input
			)
		}
	})()

	static schema = schema("number", {
		domain: "object",
		prop: [...baseAttributeProps, { key: "divisor", value: "number" }]
	})

	static from = constraintParser(this)

	applicableTo(
		basis: Basis | undefined
	): basis is DomainNode<{ domain: "number" }> {
		return (
			basis !== undefined &&
			basis.kind === "domain" &&
			basis.domain === "number"
		)
	}

	hash() {
		return ""
	}

	writeDefaultDescription() {
		return this.divisor === 1 ? "an integer" : `a multiple of ${this.divisor}`
	}

	intersectSymmetric(other: DivisibilityNode) {
		return {
			divisor:
				(this.divisor * other.divisor) /
				greatestCommonDivisor(this.divisor, other.divisor)
		}
	}

	intersectAsymmetric() {
		return null
	}
}

// https://en.wikipedia.org/wiki/Euclidean_algorithm
const greatestCommonDivisor = (l: number, r: number) => {
	let previous: number
	let greatestCommonDivisor = l
	let current = r
	while (current !== 0) {
		previous = current
		current = greatestCommonDivisor % current
		greatestCommonDivisor = previous
	}
	return greatestCommonDivisor
}

export const writeIndivisibleMessage = <root extends string>(
	root: root
): writeIndivisibleMessage<root> =>
	`Divisibility operand ${root} must be a number`

export type writeIndivisibleMessage<root extends string> =
	`Divisibility operand ${root} must be a number`
