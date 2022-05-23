import {Component, OnInit} from '@angular/core';
import { liveQuery } from "dexie";
import {AppDB, TodoItem} from "@uid/indexed-db";

@Component({
  selector: 'db-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  todoItems$ = liveQuery(() => this.listTodoItems());

  constructor(private db: AppDB) {
  }

  async ngOnInit(): Promise<void> {
    console.log('OnInit');

    // await this.db.resetDatabase();
    // await this.db.populate();
  }

  async listTodoItems(): Promise<TodoItem[]> {
    return this.db.todoItems.toArray();
  }

  async changeDone(item: TodoItem, $event: Event): Promise<number> {
    return this.db.todoItems
      .update(item, {done: item.done});
  }

  async addTodo(value: string): Promise<number> {
    return this.db.todoItems.add({ title: value});
  }

  async removeTodo(item: TodoItem): Promise<void> {
    return this.db.todoItems.delete(<number>item.id);
  }
}
