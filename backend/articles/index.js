import { createModule } from '../creators/index.js';

const initialItems = [
  { id: 1, name: 'Article 1 with a long price name or even longer longer name', price: 99999.99 },
  { id: 2, name: 'Article 2', price: 99.99 },
  { id: 3, name: 'Article 3', price: 4.99 }
];

export const articlesModule = createModule('articles', initialItems);
