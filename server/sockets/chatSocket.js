const Message = require("../models/Message");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `User Connected: ${socket.id}`
    );

    socket.on(
      "joinRoom",
      (roomId) => {
        socket.join(roomId);

        console.log(
          `Joined Room: ${roomId}`
        );
      }
    );

    socket.on(
      "sendMessage",
      async (data) => {
        try {
          const savedMessage =
            await Message.create(data);

          io.to(data.roomId).emit(
            "receiveMessage",
            savedMessage
          );
        } catch (error) {
          console.log(error);
        }
      }
    );

    socket.on(
      "disconnect",
      () => {
        console.log(
          "User Disconnected"
        );
      }
    );
  });
};

module.exports = chatSocket;