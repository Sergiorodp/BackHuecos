const { Server } = require("socket.io")

module.exports = function createIo( server_socket ){

    const io = new Server(server_socket);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
          });
      });

} 

