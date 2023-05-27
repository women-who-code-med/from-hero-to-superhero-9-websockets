module.exports = (socket) => {
  console.log('Cliente conectado');
  
  // Escucha el evento 'mensaje' enviado por el cliente
  socket.on('message', (data) => {
    console.log('Mensaje recibido:', data);
    
    // Envía un mensaje de confirmación al cliente
    socket.emit('message', data);
  });
  
  // Escucha el evento 'disconnect' cuando el cliente se desconecta
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
};