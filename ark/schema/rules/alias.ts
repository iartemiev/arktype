import type { BaseAttributes } from "../node.js"
import { RuleNode } from "./rule.js"

export interface AliasRule extends BaseAttributes {
	readonly value: string
}

export class AliasAttribute extends RuleNode<AliasRule> {
	readonly kind = "divisor"

	writeDefaultDescription() {
		return this.value
	}

	protected reduceRules(other: AliasAttribute) {
		return null
	}
}
