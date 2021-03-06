import LinkedListNode, {Fn} from "./LinkedListNode";
import compare2Objects from "./Compare2Objects";

export interface INodeList<T> {
    head: LinkedListNode<T> | null;
    tail: LinkedListNode<T> | null;

    prepend(value: T): LinkedList<T>;

    append(value: T): LinkedList<T>;

    delete(value: T): LinkedListNode<T> | null;

    find(value?: T | undefined): LinkedListNode<T> | null;

    deleteTail(): LinkedListNode<T> | null;

    deleteHead(): LinkedListNode<T> | null;

    fromArray(values: Array<T>): LinkedList<T>;

    toArray(): LinkedListNode<T>[];

    toString(callback?: Fn): string;

    reverse(): LinkedList<T>;
}

export class LinkedList<T> implements INodeList<T> {
    public head: LinkedListNode<T> | null = null;
    public tail: LinkedListNode<T> | null = null;

    // Добавляем узел в начало списка.
    prepend(value: T): LinkedList<T> {
        // Создаем новый узел, который будет head.
        const newNode = new LinkedListNode(value, this.head);

        // Если есть head, то он больше не будет head.
        // Поэтому делаем его предыдущую (previous) ссылку на новый узел (new head).
        // Затем делаем новый узел head.

        if (this.head) {
            this.head.previous = newNode;
        }
        this.head = newNode;

        // Если еще нет tail, сделаем новый узел tail.
        if (!this.tail) {
            this.tail = newNode;
        }

        return this;
    }

    // Добавляем узел в конец списка.
    append(value: T): LinkedList<T> {
        const newNode = new LinkedListNode(value);

        if (this.tail) {
            // Присоединяем новый узел к концу связанного списка.
            this.tail.next = newNode;
        }

        // Присоединяем текущий tail к предыдущей (previous) ссылке нового узла.
        newNode.previous = this.tail;

        // Переназначаем tail на новый узел.
        this.tail = newNode;

        if (!this.head) {
            this.head = newNode;
        }

        return this;
    }

    delete(value: T): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let deletedNode = null;
        let currentNode = this.head as LinkedListNode<T> | null;

        while (currentNode) {
            if (compare2Objects(currentNode.value, value)) {
                deletedNode = currentNode;

                if (compare2Objects(deletedNode, this.head)) {
                    // Если head должен быть удален..

                    // Сделать следующий узел, новым head

                    this.head = deletedNode.next;

                    // Установить в новом head сслыку (previous) на ноль.
                    if (this.head) {
                        this.head.previous = null;
                    }

                    // Если все узлы в списке имеют одинаковое значение,
                    // которое передается в качестве аргумента,
                    // тогда все узлы будут удалены, поэтому tail необходимо обновить.

                    if (compare2Objects(deletedNode, this.tail)) {
                        this.tail = null;
                    }
                } else if (compare2Objects(deletedNode, this.tail)) {
                    // Если tail должен быть удален.abs
                    // Установить tail на предпоследний узел, который станет новым tail.

                    this.tail = deletedNode.previous as LinkedListNode<T>;
                    this.tail.next = null;
                } else {
                    // Если средний узел будет удален ...
                    const previousNode = deletedNode.previous as LinkedListNode<T>;
                    const nextNode = deletedNode.next as LinkedListNode<T>;

                    previousNode.next = nextNode;
                    nextNode.previous = previousNode;
                }
            }

            currentNode = currentNode.next;
        }

        return deletedNode;
    }

    find(value?: T | undefined): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        let currentNode: LinkedListNode<T> | null = this.head;

        while (currentNode) {
            // Если указано значение, пробуем сравнить по значению.
            if (value !== undefined && compare2Objects(currentNode.value, value)) {
                return currentNode;
            }

            currentNode = currentNode.next;
        }

        return null;
    }

    deleteTail(): LinkedListNode<T> | null {
        if (!this.tail) {
            return null;
        }

        const deletedTail = this.tail;

        if (this.tail.previous) {
            this.tail = this.tail.previous;
            this.tail.next = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedTail;
    }

    deleteHead(): LinkedListNode<T> | null {
        if (!this.head) {
            return null;
        }

        const deletedHead = this.head;

        if (this.head.next) {
            this.head = this.head.next;
            this.head.previous = null;
        } else {
            this.head = null;
            this.tail = null;
        }

        return deletedHead;
    }

    fromArray(values: Array<T>): LinkedList<T> {
        values.forEach((value: T) => this.append(value));

        return this;
    }

    toArray(): LinkedListNode<T>[] {
        const nodes = [];

        let currentNode = this.head;
        while (currentNode) {
            nodes.push(currentNode);
            currentNode = currentNode.next;
        }

        return nodes;
    }

    toString(callback?: Fn): string {
        return this.toArray()
            .map((node) => node.toString(callback))
            .toString();
    }

    reverse(): LinkedList<T> {
        let currNode = this.head;
        let prevNode = null;
        let nextNode = null;

        while (currNode) {
            // Сохраняем следующий и предыдуший узел.
            nextNode = currNode.next;
            prevNode = currNode.previous;

            // Меняем следующий узел текущего узла, чтобы он ссылался с предыдущий узел.
            currNode.next = prevNode;
            currNode.previous = nextNode;

            // Перемещаем узлы prevNode и currNode на один шаг вперед.
            prevNode = currNode;
            currNode = nextNode;
        }

        // Сбрасываем head и tail.
        this.tail = this.head;
        this.head = prevNode;

        return this;
    }
}

export default LinkedList
