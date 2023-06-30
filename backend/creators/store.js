export function createStore(initailState) {
  let nextId = initailState.length + 1;

  const store = [...initailState];

  return {
    get: function (options = {}) {
      const [firstKey] = Object.keys(options);

      const filtered = store.filter((x) => x[firstKey] === options[firstKey]);

      return [...filtered];
    },
    add: function (item) {
      const newItem = { ...item, id: nextId };

      store.push(newItem);
      nextId++;

      return newItem;
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
