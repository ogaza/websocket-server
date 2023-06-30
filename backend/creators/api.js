export function createApi(store) {
  return {
    get: createGet(store),
    post: createPost(store),
    remove: createRemove(store)
  };
}

function createGet(store) {
  return function get(options = {}) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.get(options));
      }, operationDelayInMs / 4);
    });
  };
}

function createPost(store) {
  return function post(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItem = store.add(item);
        resolve(newItem);
      }, operationDelayInMs / 4);
    });
  };
}

function createRemove(store) {
  return function remove(itemId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.remove(itemId);
        resolve();
      }, operationDelayInMs * 3);
    });
  };
}

const operationDelayInMs = 1000;
