import type { conform, ErrorMessage, exactMessageOnError } from "@arktype/util"
import type {
	Basis,
	BasisClassesByKind,
	BasisInput,
	BasisKind,
	validateBasisInput
} from "../constraints/basis.js"
import type { ConstraintNode } from "../constraints/constraint.js"
import type { DomainInput } from "../constraints/domain.js"
import type { ProtoInput } from "../constraints/proto.js"
import type { Refinement, RefinementKind } from "../constraints/refinement.js"
import type { UnitInput } from "../constraints/unit.js"
import type { BaseAttributes, inputOf, parseConstraint } from "../node.js"
import type { MorphInput } from "./morph.js"
import type { IntersectionNode } from "./type.js"

export type IntersectionSchema = BaseAttributes & {
	constraints: readonly ConstraintNode[]
}

type parseBasis<input extends BasisInput> = conform<
	{
		[k in BasisKind]: input extends BasisInput<k>
			? parseConstraint<BasisClassesByKind[k], input>
			: never
	}[BasisKind],
	Basis
>

type basisOf<k extends RefinementKind> =
	Refinement<k>["applicableTo"] extends ((
		_: Basis | undefined
	) => _ is infer basis extends Basis | undefined)
		? basis
		: never

type refinementKindOf<basis> = {
	[k in RefinementKind]: basis extends basisOf<k> ? k : never
}[RefinementKind]

export type refinementsOf<basis> = {
	[k in refinementKindOf<basis>]?: Refinement<k>
}

type refinementInputsOf<basis> = {
	[k in refinementKindOf<basis>]?: inputOf<k>
}

type IntersectionBasisInput<basis extends BasisInput = BasisInput> =
	| {
			domain: conform<basis, DomainInput>
			proto?: never
			unit?: never
	  }
	| {
			domain?: never
			proto: conform<basis, ProtoInput>
			unit?: never
	  }
	| {
			domain?: never
			proto?: never
			unit: conform<basis, UnitInput>
	  }

export type BasisedBranchInput<basis extends BasisInput = BasisInput> =
	IntersectionBasisInput<basis> &
		refinementInputsOf<parseBasis<basis>> &
		BaseAttributes

export type NarrowedBranchInput = {
	narrow?: inputOf<"narrow">
} & BaseAttributes

export type IntersectionInput<basis extends BasisInput = BasisInput> =
	| basis
	| NarrowedBranchInput
	| BasisedBranchInput<basis>

export type parseIntersection<input> = input extends IntersectionInput<
	infer basis
>
	? IntersectionNode<
			BasisInput extends basis ? unknown : parseBasis<basis>["infer"]
	  >
	: never

type exactBasisMessageOnError<branch extends BasisedBranchInput, expected> = {
	[k in keyof branch]: k extends keyof expected
		? branch[k]
		: ErrorMessage<`'${k & string}' is not allowed by ${branch[keyof branch &
				BasisKind] extends string
				? `basis '${branch[keyof branch & BasisKind]}'`
				: `this schema's basis`}`>
}

export type validateIntersectionInput<input> =
	input extends validateBasisInput<input>
		? input
		: input extends BasisedBranchInput<infer basis>
		? exactBasisMessageOnError<input, BasisedBranchInput<basis>>
		: input extends NarrowedBranchInput
		? exactMessageOnError<input, NarrowedBranchInput>
		: IntersectionInput | MorphInput

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

// // TODO: naming
// export const constraintsByPrecedence: Record<
// 	BasisKind | RefinementKind,
// 	number
// > = {
// 	// basis
// 	domain: 0,
// 	class: 0,
// 	unit: 0,
// 	// shallow
// 	bound: 1,
// 	divisor: 1,
// 	regex: 1,
// 	// deep
// 	props: 2,
// 	// narrow
// 	narrow: 3
// }
