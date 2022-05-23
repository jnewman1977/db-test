import {JhaIndexedDbService} from "./jha-indexed-db.service";
import SpyInstance = jest.SpyInstance;

describe('JhaIndexedDbService', () => {
  let windowSpy: SpyInstance<Window>;

  beforeEach(() => {
  });

  afterEach(() => {
    windowSpy.mockRestore();
  });

  it('should open the db', async () => {
    const windowInst = jest.spyOn(window, 'window', 'get');
    Object.defineProperty(windowInst, 'indexedDB', { configurable: true });
    const service = new JhaIndexedDbService(windowInst.mock.instances[0]);
    // const db = await service.open('testdb', 1);
    expect(service).toBeTruthy();
  });
});
