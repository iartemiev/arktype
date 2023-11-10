import {
	type inferDomain,
	type instanceOf,
	type isAny,
	throwParseError
} from "@arktype/util"
import { type BaseNode } from "../base.js"
import { type Node, type Schema } from "../nodes.js"
import type {
	DomainDeclaration,
	DomainImplementation,
	DomainSchema
} from "./domain.js"
import type {
	ProtoDeclaration,
	ProtoImplementation,
	ProtoSchema
} from "./proto.js"
import type { UnitDeclaration, UnitImplementation, UnitSchema } from "./unit.js"

export type BasisDeclarationsByKind = {
	domain: DomainDeclaration
	proto: ProtoDeclaration
	unit: UnitDeclaration
}

export type BasisClassesByKind = {
	domain: typeof DomainImplementation
	proto: typeof ProtoImplementation
	unit: typeof UnitImplementation
}

export type BasisKind = keyof BasisDeclarationsByKind

export type BaseBasis = {
	readonly basisName: string
	readonly implicitBasis: Node<BasisKind>
}

export type parseBasis<schema extends Schema<BasisKind>> =
	//allow any to be used to access all constraints
	isAny<schema> extends true
		? any
		: schema extends DomainSchema<infer domain>
		? Node<"domain", inferDomain<domain>>
		: schema extends ProtoSchema<infer proto>
		? Node<"proto", instanceOf<proto>>
		: schema extends UnitSchema<infer unit>
		? Node<"unit", unit>
		: never
