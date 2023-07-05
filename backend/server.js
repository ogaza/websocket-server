import http from 'http';
import handler from 'serve-handler';
// import nanobuffer from 'nanobuffer';
import { Server } from 'socket.io';
import { articlesModule } from './articles/index.js';
import { basketItemsModule } from './basketItems/index.js';
import { basketsModule } from './baskets/index.js';

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

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.on('connection', articlesModule.getListeners(io));
io.on('connection', basketsModule.getListeners(io));
io.on('connection', basketItemsModule.getListeners(io));

// io.on('connection', itemsModule.getListeners(io));
// io.on('connection', itemListsModule.getListeners(io));

const port = process.env.PORT || 8008;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
