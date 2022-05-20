import {JhaIndexedDbService} from "./jha-indexed-db.service";
import SpyInstance = jest.SpyInstance;

describe('JhaIndexedDbService', () => {
  let windowSpy: SpyInstance<Window>;

  beforeEach(() => {
    windowSpy = jest.spyOn(window, "window", "get");
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should open the db', async () => {
    const windowInstance = windowSpy.mock.instances[0];
    const service = new JhaIndexedDbService(windowInstance);
    const db = await service.open('testdb', 1);
    expect(db).toBeTruthy();
  });
});
