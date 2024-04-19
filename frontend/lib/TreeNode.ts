/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
export default class TreeNode {
    type: string;

    value?: string;

    children?: TreeNode[];

    constructor(
        type: string,
        value: string | undefined = undefined,
        children: TreeNode[] | undefined = undefined,
    ) {
        this.type = type;
        this.value = value;
        this.children = children;
    }
}
