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
    // console.log('%cAppComponent => ngOnInit', 'color:#00ff00');

    // const record: IRecord = { name: 'testing 123' };
    // const result = await this.dbService.add(this.dbName, this.dbVer, this.storeName, record);

    const dataResult = await this.dbService.get<IRecord[]>(this.dbName, this.dbVer, this.storeName);
    // console.log(dataResult);

    this.data = of(dataResult);
  }
}
