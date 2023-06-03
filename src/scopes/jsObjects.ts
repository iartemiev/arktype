import { TypeNode } from "../nodes/type.js"
import { EmptyScope } from "../scope.js"

export const jsObject = EmptyScope.scope({
    Function: TypeNode.from({ basis: Function }),
    Date: TypeNode.from({ basis: Date }),
    Error: TypeNode.from({ basis: Error }),
    Map: TypeNode.from({ basis: Map }),
    RegExp: TypeNode.from({ basis: RegExp }),
    Set: TypeNode.from({ basis: Set }),
    WeakMap: TypeNode.from({ basis: WeakMap }),
    WeakSet: TypeNode.from({ basis: WeakSet }),
    Promise: TypeNode.from({ basis: Promise })
})

export const jsObjectTypes = jsObject.compile()
