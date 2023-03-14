export function createItemsDb() {
  const initialItems = [
    { id: 1, text: 'item 1', completed: false, created: 1678698280962, listId: 1 },
    { id: 2, text: 'item 2', completed: false, created: 1678698280962, listId: 1 },
    { id: 3, text: 'item 3', completed: false, created: 1678698280962, listId: 1 }
  ];

  return createStore(initialItems);
}

function createStore(initailState) {
  let nextId = initailState.length + 1;

  const store = [...initailState];

  return {
    get: function () {
      return [...store];
    },
    add: function (item) {
      store.push({ ...item, id: nextId });
      nextId++;
    },
    remove: function (itemId) {
      const idx = store.findIndex((x) => x.id === itemId);
      store.splice(idx, 1);
    }
  };
}

function getNewId() {
  const itemsLength = itemsDb.length;

  if (!itemsLength) return 1;

  const existingIds = itemsDb.map(({ id }) => id).sort();

  return existingIds[itemsLength - 1] + 1;
}

let itemLists = [{ id: 1 }];
