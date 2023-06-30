import { createModule } from '../creators/index.js';

const initialItems = [{ id: 1, name: 'article 1', price: 2.99, quantity: 1, basketId: 1 }];
export const basketItemsModule = createModule('basketItems', initialItems);
