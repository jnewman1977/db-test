import Dexie, { Table } from 'dexie';

export interface TodoItem {
  id?: number;
  title: string;
  done?: boolean;
}

export class AppDB extends Dexie {
  todoItems!: Table<TodoItem, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(1).stores({
      todoItems: '++id, title, done',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await db.todoItems.bulkAdd([
      {
        title: 'Feed the birds',
      },
      {
        title: 'Watch a movie',
      },
      {
        title: 'Have some sleep',
      },
    ]);
  }

  async resetDatabase() {
    await db.transaction('rw', 'todoItems', () => {
      this.todoItems.clear();
      this.populate();
    });
  }
}

export const db = new AppDB();
