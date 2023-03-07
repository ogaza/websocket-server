import http from 'http';
import handler from 'serve-handler';
// import nanobuffer from 'nanobuffer';
import { Server } from 'socket.io';

// const msg = new nanobuffer(50);
// const getMsgs = () => Array.from(msg).reverse();

// msg.push({
//   user: 'brian',
//   text: 'hi',
//   time: Date.now()
// });

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

  // socket.emit('msg:get', { msg: getMsgs() });

  socket.on('msg:post', (data) => {
    console.log('got data: ', data);
    // msg.push({
    //   user: data.user,
    //   text: data.text,
    //   time: Date.now()
    // });
    io.emit('msg:get', { msg: data });
    // io.emit('msg:get', { msg: getMsgs() });
  });

  socket.on('disconnect', () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

const port = process.env.PORT || 8008;
server.listen(port, () => console.log(`Server running at http://localhost:${port}`));
