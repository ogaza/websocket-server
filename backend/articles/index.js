import { createModule } from '../creators/index.js';

const initialItems = [
  { id: 1, name: 'Article 1', price: 2.99 },
  { id: 2, name: 'Article 2', price: 14.99 },
  { id: 3, name: 'Article 3', price: 4.99 }
];

export const articlesModule = createModule('articles', initialItems);
