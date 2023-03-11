import http from 'http';
import handler from 'serve-handler';
// import nanobuffer from 'nanobuffer';
import { Server } from 'socket.io';

let newId = 1;
let items = [];

function getNewId() {
  const itemsLength = items.length;

  if (!itemsLength) return 1;

  const existingIds = items.map(({ id }) => id).sort();

  return existingIds[itemsLength - 1] + 1;
}

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

io.on('connection', (socket) => {
  console.log(`connected: ${socket.id}`);

  // send all on connection established
  // io.emit('item:get', { items });

  socket.on('item:get', () => {
    try {
      console.log('items requested');
      io.emit('item:get', { items });
    } catch (e) {
      console.log('error: ', e);
    }
  });

  socket.on('item:post', (item) => {
    try {
      console.log('got item: ', item);
      items.push({ ...item, id: newId });
      newId++;
      io.emit('item:get', { items });
    } catch (e) {
      console.log('error: ', e);
    }
  });

  socket.on('item:delete', (itemId) => {
    try {
      console.log('requested deletion of item with the id: ', itemId);
      items = items.filter((x) => x.id !== itemId);
      io.emit('item:get', { items });
    } catch (e) {
      console.log('error: ', e);
    }
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

const port = process.env.PORT || 8008;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
