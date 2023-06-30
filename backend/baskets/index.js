import { createModule } from '../creators/index.js';

const initialItems = [{ id: 1 }];
export const basketsModule = createModule('baskets', initialItems);
