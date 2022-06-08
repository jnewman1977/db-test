import {AppDB} from "./db";
require('fake-indexeddb/auto');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

describe('AppDB', () => {
  const appDb = new AppDB({ dbName: 'test-db', dexieOptions: { indexedDB: indexedDB, IDBKeyRange: dbKeyRange }});

  it('should open the db', async () => {
    expect(appDb).toBeDefined();

    await appDb.resetDatabase();

    expect(appDb.todoItems).toBeDefined();
  });

  it('can get the first item', async () => {
    await appDb.resetDatabase();

    appDb.todoItems.get(1).then(item => expect(item).toBeDefined());
    appDb.todoItems.get(1).then(item => expect(item?.id).toEqual(1));
  });
});
