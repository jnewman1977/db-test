import {Component, OnInit} from '@angular/core';
import {JhaIndexedDbService} from '@uid/indexed-db';

@Component({
  selector: 'db-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'db-test';

  constructor(private dbService: JhaIndexedDbService) {
  }

  async ngOnInit(): Promise<void> {
    console.log('%cAppComponent => ngOnInit', 'color:#00ff00');

    const db = await this.dbService.open('Database1', 2);
    console.log(db?.objectStoreNames);

    const result = await this.dbService.add('Database1', 2, 'test',{name: 'testing 123'});
    console.log('Result', result);
  }
}
