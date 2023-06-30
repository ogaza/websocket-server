import { createApi, createListener, createStore } from './index.js';

export function createModule(name, dbSeed) {
  const store = createStore(dbSeed);
  const api = createApi(store);

  return {
    store,
    api,
    getListeners: function (io) {
      return createListener(io, name, api);
    }
  };
}
