/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
class TreeNode {
    type: string;

    value: string;

    children: TreeNode[];

    constructor(type: string, value: string, children: TreeNode[] = []) {
        this.type = type;
        this.value = value;
        this.children = children;
    }
}
