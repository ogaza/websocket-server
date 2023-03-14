let newItemId = 4;
export function createItemsDb() {
  return [
    { id: 1, text: 'item 1', completed: false, created: 1678698280962, listId: 1 },
    { id: 2, text: 'item 2', completed: false, created: 1678698280962, listId: 1 },
    { id: 3, text: 'item 3', completed: false, created: 1678698280962, listId: 1 }
  ];
}

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
        resolve(store);
      }, operationDelayInMs / 4);
    });
  };
}

function createPost(store) {
  return function post(item) {
    return new Promise((resolve) => {
      setTimeout(() => {
        store.push({ ...item, id: newItemId });
        newItemId++;
        resolve();
      }, operationDelayInMs / 4);
    });
  };
}

function createRemove(store) {
  return function remove(itemId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const idx = store.findIndex((x) => x.id === itemId);
        store.splice(idx, 1);
        resolve();
      }, operationDelayInMs * 3);
    });
  };
}

const operationDelayInMs = 1000;

function getNewId() {
  const itemsLength = itemsDb.length;

  if (!itemsLength) return 1;

  const existingIds = itemsDb.map(({ id }) => id).sort();

  return existingIds[itemsLength - 1] + 1;
}

let itemLists = [{ id: 1 }];
