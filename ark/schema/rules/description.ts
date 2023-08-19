import type { BaseAttributes } from "../node.js"
import { RuleNode } from "./rule.js"

export interface DescriptionRule extends BaseAttributes {
	readonly value: string
}

export class DescriptionAttribute extends RuleNode<DescriptionRule> {
	readonly kind = "divisor"

	writeDefaultDescription() {
		return this.value
	}

	protected reduceRules(other: DescriptionAttribute) {
		return null
	}
}
