import { createModule } from '../creators/index.js';

const initialItems = [
  { id: 1, text: 'item 1', completed: false, created: 1678698280962, listId: 1 },
  { id: 2, text: 'item 2', completed: false, created: 1678698280962, listId: 1 },
  { id: 3, text: 'item 3', completed: false, created: 1678698280962, listId: 2 },
  { id: 4, text: 'item 4', completed: false, created: 1678698280962, listId: 2 },
  { id: 5, text: 'item 5', completed: false, created: 1678698280962, listId: 2 }
];
export const itemsModule = createModule('items', initialItems);

const initialItemLists = [{ id: 1 }, { id: 2 }];
export const itemListsModule = createModule('itemLists', initialItemLists);
