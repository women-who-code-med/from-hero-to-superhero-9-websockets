const io = require('socket.io')(process.env.SOCKET_PORT || 3001, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado');
  
  // Escucha el evento 'mensaje' enviado por el cliente
  socket.on('mensaje', (data) => {
    console.log('Mensaje recibido:', data);
    
    // Envía un mensaje de confirmación al cliente
    socket.emit('confirmacion', 'Mensaje recibido');
  });
  
  // Escucha el evento 'disconnect' cuando el cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

console.log('Servidor Socket.IO en ejecución');