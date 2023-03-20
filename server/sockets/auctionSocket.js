module.exports = (socket, io) => {
  let highestBid = 0;

  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
  socket.on("bid", (data) => {
    io.sockets.emit("reciveBid", data);
  });
};
