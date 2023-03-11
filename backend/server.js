import http from 'http';
import handler from 'serve-handler';
// import nanobuffer from 'nanobuffer';
import { Server } from 'socket.io';

let newId = 1;
let todos = [];

function getNewId() {
  const todosLength = todos.length;

  if (!todosLength) return 1;

  const existingIds = todos.map(({ id }) => id).sort();

  return existingIds[todosLength - 1] + 1;
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
  // io.emit('todo:get', { todos });

  socket.on('todo:get', () => {
    try {
      console.log('todos requested');
      io.emit('todo:get', { todos });
    } catch (e) {
      console.log('error: ', e);
    }
  });

  socket.on('todo:post', (todo) => {
    try {
      console.log('got todo: ', todo);
      todos.push({ ...todo, id: newId });
      newId++;
      io.emit('todo:get', { todos });
    } catch (e) {
      console.log('error: ', e);
    }
  });

  socket.on('todo:delete', (todoId) => {
    try {
      console.log('requested deletion of todo with the id: ', todoId);
      todos = todos.filter((x) => x.id !== todoId);
      io.emit('todo:get', { todos });
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
