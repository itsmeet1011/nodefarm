const hello = 'hey there';
console.log(hello);

////////////////////
const http = require('http');

//////CREATING SERVER
// const server = http.createServer((req, res) => {
//   // res.end IS A WAY TO SEND RESPONCE TO CLIENT SIDE.
//   res.end('Hello from the server!');
// });

// // 8000 is just a normal port number a posrt is a sub address
// server.listen(8000, '127.0.0.1', () => {
//   console.log('server start at port 8000');
// });

// ROUTING
const url = require('url');
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  res.end('Hello from the server!');
});

server.listen(8000, '127.0.0.1', () => {
  console.log('server start at port 8000');
});
