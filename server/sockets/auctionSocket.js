module.exports = (socket, io) => {
  //  socket: represents a client-side socket connection
  //  io: represents the server-side socket connection that can broadcast events to all

  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  // When a socket sends the "bid" event to the server, the "reciveBid" event will be broadcast to all connected sockets
  socket.on("bid", (data) => {
    io.sockets.emit("reciveBid", data);
  });
};
