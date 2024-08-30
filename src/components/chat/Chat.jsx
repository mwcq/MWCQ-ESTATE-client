import { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

function Chat({ chats }) {
  const [chat, setChat] = useState(null);

  console.log(chats);

  const { currentUser } = useContext(AuthContext);

  const { socket } = useContext(SocketContext);

  const messageEndRef = useRef();

  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest.get("/chats/" + id);

      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }

      setChat({ ...res.data, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;

    try {
      const res = await apiRequest.post("/message/" + chat.id, {
        text,
      });
      setChat((prve) => ({ ...prve, message: [...prve.message, res.data] }));
      e.target.reset();
      socket.emit("send_message", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const read = async () => {
      try {
        const res = await apiRequest.put("/chats/read" + chat.id);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat && socket) {
      socket.on("get_message", (data) => {
        if (data.chatId === chat.id) {
          setChat((prve) => ({ ...prve, message: [...prve.message, data] }));
          read();
        }
      });
    }
    return () => {
      socket.off("get_message");
    };
  }, [socket, chat]);

  return (
    <div className="chat">
      <div className="messages">
        <h1>消息</h1>
        {chats.map((c) => {
          return (
            <div
              className="message"
              key={c.id}
              style={{
                backgroundColor:
                  c.seenBy.includes(currentUser.id) || chat?.id === c.id
                    ? "white"
                    : "#fecd514e",
              }}
              onClick={() => {
                handleOpenChat(c.id, c.receiver);
              }}
            >
              <img
                src={
                  c.receiver.avatar ||
                  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt=""
              />
              <span>{c.receiver.username}</span>
              <p>{c.lastMessage}</p>
            </div>
          );
        })}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={
                  chat.receiver.avatar ||
                  "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                }
                alt=""
              />
              {chat.receiver.username}
            </div>
            <span className="close" onClick={() => setChat(null)}>
              X
            </span>
          </div>
          <div className="center">
            {chat.message.map((item) => {
              return (
                <div
                  className={`chatMessage ${
                    item.userId === currentUser.id ? "own" : ""
                  }`}
                  key={item.id}
                >
                  <p>{item.text}</p>
                  <span>{format(item.createdAt, "zh_CN")}</span>
                </div>
              );
            })}
            <div ref={messageEndRef}></div>
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text" placeholder="输入消息"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
