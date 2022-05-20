import {Component, OnInit} from '@angular/core';
import {JhaIndexedDbService} from '@uid/indexed-db';
import {concat, from, map, Observable, of} from "rxjs";

interface IRecord {
  _id?: number;
  name: string;
}

@Component({
  selector: 'db-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'db-test';
  dbName = 'Database1';
  dbVer = 2;
  storeName = 'test';

  public data: Observable<IRecord[] | null> | null = null;

  constructor(private dbService: JhaIndexedDbService) {
  }

  async ngOnInit(): Promise<void> {
    console.log('%cAppComponent => ngOnInit', 'color:#00ff00');

    await this.dbService.open(this.dbName, this.dbVer, db => {
      const store = db.createObjectStore(this.storeName, { keyPath: "_id", autoIncrement: true});
      store.createIndex("pk_id", "_id", { unique: true });
    });

    // await this.dbService.add<IRecord>('Database2', 1, "Table1", { name: 'First Record'});

    const queryResult = await this.dbService.get<IRecord[]>(
      this.dbName, this.dbVer, this.storeName);

    this.data = of(queryResult);
  }
}
