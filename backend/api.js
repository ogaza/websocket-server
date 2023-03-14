export function createApi(store) {
  return {
    get: createGet(store),
    post: createPost(store),
    remove: createRemove(store)
  };
}

function createGet(store) {
  return function get() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(store.get());
      }, operationDelayInMs / 4);
    });
  };
}

function createPost(store) {
  return function post(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.add(item);
        resolve();
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
