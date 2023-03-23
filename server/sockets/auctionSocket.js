module.exports = (socket, io) => {
  //  socket: represents a client-side socket connection
  //  io: represents the server-side socket connection that can broadcast events to all

  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  // When a socket sends the "bid" event to the server, the "reciveBid" event will be broadcast to all connected sockets
  socket.on("bid", (data, room) => {
    io.in(room).emit("reciveBid", data);
    console.log(room, data);
  });

  socket.on("join", (room, cb) => {
    socket.join(room);
    console.log("hangi oda bu", room);
    cb("You have joined the room" + " " + room);
  });
  socket.on("leave", (room, cb) => {
    socket.leave(room);
    cb("You have left the room" + " " + room);
  });
};
