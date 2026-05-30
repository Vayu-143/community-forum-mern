const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const discussionRoutes =
  require("./routes/discussionRoutes");

const commentRoutes =
  require("./routes/commentRoutes");

const messageRoutes =
  require("./routes/messageRoutes");

/* =========================
   NEW USER ROUTES
========================= */

const userRoutes =
  require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================
   ROUTES
========================= */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/discussions",
  discussionRoutes
);

app.use(
  "/api/comments",
  commentRoutes
);

app.use(
  "/api/messages",
  messageRoutes
);

/* =========================
   NEW PROFILE ROUTE
========================= */

app.use(
  "/api/users",
  userRoutes
);

app.get("/", (req, res) => {
  res.send(
    "Community Forum API Running..."
  );
});

/* =========================
   SOCKET.IO
========================= */

const server =
  http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      "http://localhost:5173",
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
    ],
  },
});

const connectedUsers =
  new Set();

io.on(
  "connection",
  (socket) => {
    console.log(
      "Connected:",
      socket.id
    );

    connectedUsers.add(
      socket.id
    );

    io.emit(
      "onlineUsers",
      connectedUsers.size
    );

    socket.on(
      "getOnlineUsers",
      () => {
        socket.emit(
          "onlineUsers",
          connectedUsers.size
        );
      }
    );

    /* =========================
       JOIN ROOM
    ========================= */

    socket.on(
      "joinRoom",
      (roomId) => {
        socket.join(
          roomId
        );

        console.log(
          `Joined Room: ${roomId}`
        );
      }
    );

    /* =========================
       SEND MESSAGE
    ========================= */

    socket.on(
      "sendMessage",
      async (data) => {
        try {
          const Message =
            require(
              "./models/Message"
            );

          const savedMessage =
            await Message.create({
              roomId:
                data.roomId,
              sender:
                data.sender,
              message:
                data.message,
            });

          io.to(
            data.roomId
          ).emit(
            "receiveMessage",
            savedMessage
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        }
      }
    );

    /* =========================
       DISCONNECT
    ========================= */

    socket.on(
      "disconnect",
      () => {
        console.log(
          "Disconnected:",
          socket.id
        );

        connectedUsers.delete(
          socket.id
        );

        io.emit(
          "onlineUsers",
          connectedUsers.size
        );
      }
    );
  }
);

/* =========================
   SERVER START
========================= */

const PORT =
  process.env.PORT ||
  5000;

server.listen(
  PORT,
  () => {
    console.log(
      `Server Running on Port ${PORT}`
    );
  }
);