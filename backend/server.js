import http from 'http';
import handler from 'serve-handler';
// import nanobuffer from 'nanobuffer';
import { Server } from 'socket.io';

let newId = 1;
let itemsDb = [];

// serve static assets
const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: './frontend'
  });
});

const io = new Server(server, {
  cors: {
    origin: '*'
    // origin: 'http://localhost'
  }
});

const operationDelayInMs = 1000;

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`);

  // send all on connection established
  // io.emit('item:get', { items });

  socket.on('item:get', async () => {
    console.log('all items requested');

    try {
      const items = await getItems();
      io.emit('item:get', { items });
    } catch (e) {
      console.log(e);
      io.emit('item:get', { items: [] });
    }
  });

  socket.on('item:post', async (item) => {
    console.log('received item: ', item);

    try {
      await postItem(item);
      const items = await getItems();
      io.emit('item:get', { items });
    } catch (e) {
      console.log('error: ', e);
      io.emit('item:get', { items: [] });
    }
  });

  socket.on('item:delete', async (itemId) => {
    console.log('requested deletion of item with the id: ', itemId);

    try {
      await deleteItem(itemId);
      // const items = await getItems();
      io.emit('item:delete', { itemId });
    } catch (e) {
      console.log('error: ', e);
      io.emit('item:get', { items: [] });
    }
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

const port = process.env.PORT || 8008;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));

function getItems() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(itemsDb);
    }, operationDelayInMs);
  });
}

function postItem(item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      itemsDb.push({ ...item, id: newId });
      newId++;
      resolve();
    }, operationDelayInMs);
  });
}

function deleteItem(itemId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      itemsDb = itemsDb.filter((x) => x.id !== itemId);
      resolve();
    }, operationDelayInMs);
  });
}

function getNewId() {
  const itemsLength = itemsDb.length;

  if (!itemsLength) return 1;

  const existingIds = itemsDb.map(({ id }) => id).sort();

  return existingIds[itemsLength - 1] + 1;
}
