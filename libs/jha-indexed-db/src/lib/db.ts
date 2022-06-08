import Dexie, {DexieOptions, Table} from 'dexie';
import {Inject, Injectable} from "@angular/core";

export interface AppDbOptions {
  dbName: string;
  dexieOptions?: DexieOptions;
}

export interface TodoItem {
  id?: number;
  title: string;
  done?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AppDB extends Dexie {
  todoItems!: Table<TodoItem, number>;

  constructor(@Inject('DB_OPTIONS') options?: AppDbOptions) {
    if (options) {
      super(options.dbName, options.dexieOptions);
    } else {
      super('ngdexieliveQuery');
    }

    this.version(1).stores({
      todoItems: '++id, title, done',
    });

    this.on('populate', () => this.populate());
  }

  async populate() {
    await this.todoItems.bulkAdd([
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
    await this.transaction('rw', 'todoItems', () => {
      this.todoItems.clear();
      this.populate();
    });
  }
}
