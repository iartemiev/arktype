import type { TypeNode } from "../../nodes/type.js"
import { type error, throwParseError } from "../../utils/errors.js"
import { type inferAst, writeUnsatisfiableExpressionError } from "../ast/ast.js"
import type { ParseContext } from "../definition.js"
import { DynamicState } from "./reduce/dynamic.js"
import type { state, StaticState } from "./reduce/static.js"
import { parseOperand } from "./shift/operand/operand.js"
import { parseOperator } from "./shift/operator/operator.js"
import type { Scanner } from "./shift/scanner.js"

// TODO: cache
export const parseString = (def: string, ctx: ParseContext) =>
    maybeNaiveParse(def, ctx) ?? fullStringParse(def, ctx)

// TODO: investigate naive parse
export type parseString<def extends string, $> = fullStringParse<def, $>

export type inferString<def extends string, $> = inferAst<
    parseString<def, $>,
    $
>

/**
 * Try to parse the definition from right to left using the most common syntax.
 * This can be much more efficient for simple definitions.
 */
type maybeNaiveParse<def extends string, $> = def extends `${infer child}[]`
    ? child extends keyof $
        ? [child, "[]"]
        : fullStringParse<def, $>
    : def extends keyof $
    ? def
    : fullStringParse<def, $>

export const maybeNaiveParse = (def: string, ctx: ParseContext): TypeNode =>
    ctx.scope.maybeResolve(def)?.root ??
    ((def.endsWith("[]") &&
        ctx.scope.maybeResolve(def.slice(0, -2))?.root.array()) ||
        fullStringParse(def, ctx))

export const fullStringParse = (def: string, ctx: ParseContext) => {
    const s = new DynamicState(def, ctx)
    parseOperand(s)
    const result = parseUntilFinalizer(s).root
    return result.isNever()
        ? throwParseError(writeUnsatisfiableExpressionError(def))
        : result
}

type fullStringParse<def extends string, $> = extractFinalizedResult<
    parseUntilFinalizer<state.initialize<def>, $>
>

export const parseUntilFinalizer = (s: DynamicState) => {
    while (!s.scanner.finalized) {
        next(s)
    }
    return s.finalize()
}

export type parseUntilFinalizer<
    s extends StaticState | error,
    $
> = s extends StaticState
    ? Scanner.skipWhitespace<
          s["unscanned"]
      > extends infer unscanned extends string
        ? unscanned extends ""
            ? state.finalize<s, $>
            : unscanned extends `${infer finalizer extends Scanner.FinalizingLookahead}${infer nextUnscanned}`
            ? // ensure the initial > is not treated as a finalizer in an expression like Set<number>5> or Set<number>=5>
              // also ensures we still give correct error messages for invalid expressions like 3>number<5
              [finalizer, Scanner.skipWhitespace<nextUnscanned>] extends [
                  ">",
                  // if the > is actually part of a bound, the next token should be an operand, not an operator
                  "" | `${"=" | ""}${Scanner.OperatorToken}${string}`
              ]
                ? state.finalize<s, $>
                : parseUntilFinalizer<next<state.scanTo<s, unscanned>, $>, $>
            : parseUntilFinalizer<next<state.scanTo<s, unscanned>, $>, $>
        : never
    : // s is an error here
      s

export type extractFinalizedResult<s extends StaticState | error> =
    s extends StaticState ? s["root"] : s

const next = (s: DynamicState) =>
    s.hasRoot() ? parseOperator(s) : parseOperand(s)

type next<s extends StaticState, $> = s["root"] extends undefined
    ? parseOperand<s, $>
    : parseOperator<s>
