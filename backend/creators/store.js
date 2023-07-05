export function createStore(initailState) {
  let nextId = initailState.length + 1;

  const store = [...initailState];

  return {
    get: function (options = {}) {
      const [firstKey] = Object.keys(options);

      const filtered = store.filter((x) => x[firstKey] === options[firstKey]);

      console.log('store:get:', filtered);

      return [...filtered];
    },
    add: function (item) {
      const newItem = { ...item, id: nextId };

      store.push(newItem);
      nextId++;

      return newItem;
    },
    update: function (item) {
      const { id } = item;

      const itemToEdit = store.find((x) => x.id === id);
      const idx = store.findIndex((x) => x.id === id);

      store.splice(idx, 1, { ...itemToEdit, ...item });

      return store[idx];
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
