import { createModule } from '../creators/index.js';

const initialItems = [
  {
    id: 1,
    name: 'Article 1 with a long price name or even longer longer name',
    price: 99999.99,
    quantity: 1,
    basketId: 1
  }
];
export const basketItemsModule = createModule('basketItems', initialItems);
