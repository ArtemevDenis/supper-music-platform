export interface INode {
    value: any;
    next: LinkedListNode<any> | null;
    previous: LinkedListNode<any> | null;

    toString(fn?: Fn): string;
}

export type Fn = (value: { [ket: string]: any }) => string;


export class LinkedListNode<T> implements INode {
    constructor(
        public value: T,
        public next: LinkedListNode<T> | null = null,
        public previous: LinkedListNode<T> | null = null,
    ) {
    }

    public toString(callback?: Fn): string {
        return callback
            ? callback(this.value as { [ket: string]: any })
            : `${this.value}`;
    }
}


export default LinkedListNode