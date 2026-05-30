import {
  useEffect,
  useState,
  useRef,
} from "react";

import socket from "../sockets/socket";

import {
  getMessages,
} from "../services/messageService";

function ChatBox({
  roomId,
}) {
  const [messages,
    setMessages] =
    useState([]);

  const [message,
    setMessage] =
    useState("");

  const [onlineUsers,
    setOnlineUsers] =
    useState(0);

  const bottomRef =
    useRef(null);

  // Request count when socket connects
  useEffect(() => {
    const handleConnect =
      () => {
        console.log(
          "Connected:",
          socket.id
        );

        socket.emit(
          "getOnlineUsers"
        );
      };

    socket.on(
      "connect",
      handleConnect
    );

    return () => {
      socket.off(
        "connect",
        handleConnect
      );
    };
  }, []);

  // Join Room
  useEffect(() => {
    if (!roomId) return;

    socket.emit(
      "joinRoom",
      roomId
    );
  }, [roomId]);

  // Online Users Listener
  useEffect(() => {
    const handleOnlineUsers =
      (count) => {
        console.log(
          "Online Users:",
          count
        );

        setOnlineUsers(
          count
        );
      };

    socket.on(
      "onlineUsers",
      handleOnlineUsers
    );

    socket.emit(
      "getOnlineUsers"
    );

    return () => {
      socket.off(
        "onlineUsers",
        handleOnlineUsers
      );
    };
  }, []);

  // Load Messages
  useEffect(() => {
    loadMessages();

    const handleMessage =
      (newMessage) => {
        setMessages(
          (prev) => [
            ...prev,
            newMessage,
          ]
        );
      };

    socket.on(
      "receiveMessage",
      handleMessage
    );

    return () => {
      socket.off(
        "receiveMessage",
        handleMessage
      );
    };
  }, [roomId]);

  const loadMessages =
    async () => {
      try {
        const data =
          await getMessages(
            roomId
          );

        if (
          Array.isArray(
            data
          )
        ) {
          setMessages(
            data
          );
        } else {
          setMessages(
            []
          );
        }
      } catch (
        error
      ) {
        console.log(
          error
        );

        setMessages(
          []
        );
      }
    };

  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [messages]);

  const sendMessage =
    () => {
      if (
        !message.trim()
      )
        return;

      socket.emit(
        "sendMessage",
        {
          roomId,

          sender:
            JSON.parse(
              localStorage.getItem(
                "user"
              )
            )?.name ||
            "User",

          message,
        }
      );

      setMessage("");
    };

  return (
    <div className="card shadow border-0">
      <div className="card-body">

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="fw-bold">
            <i className="bi bi-chat-dots me-2"></i>
            Live Community Chat
          </h3>

          <span className="badge bg-success fs-6">
            🟢 {onlineUsers} Online
          </span>
        </div>

        <div className="chat-container p-3 mb-3">

          {messages.length >
          0 ? (
            messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={
                    msg._id ||
                    index
                  }
                  className="card border-0 shadow-sm mb-2 chat-message"
                >
                  <div className="card-body">
                    <strong>
                      👤{" "}
                      {msg.sender}
                    </strong>

                    <p className="mb-1">
                      {msg.message}
                    </p>

                    <small className="text-muted">
  {new Date(
    msg.createdAt
  ).toLocaleString(
    "en-GB"
  )}
</small>
                  </div>
                </div>
              )
            )
          ) : (
            <div className="text-center text-muted">
              No messages yet
            </div>
          )}

          <div
            ref={
              bottomRef
            }
          ></div>

        </div>

        <div className="input-group">

          <input
            type="text"
            className="form-control"
            placeholder="Type message..."
            value={message}
            onChange={(
              e
            ) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(
              e
            ) => {
              if (
                e.key ===
                "Enter"
              ) {
                sendMessage();
              }
            }}
          />

          <button
            className="btn btn-primary"
            onClick={
              sendMessage
            }
          >
            <i className="bi bi-send-fill"></i>
          </button>

        </div>

      </div>
    </div>
  );
}

export default ChatBox;