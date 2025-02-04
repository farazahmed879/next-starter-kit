import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ROLE } from "@/helper/constant";
import RequestChat from "./RequestChat";
import { convertDate } from "@/helper/helper";
import CustomEmojiInput from "./CustomEmojiInput";
import io from "socket.io-client";

interface Message {
  senderId: string;
  chatId: string;
  text: string;
  createdAt: string;
}

const ChatBox = () => {
  const { user } = useContext<any>(AuthContext);
  const {
    currentChat,
    messages,
    isMessageLoading,
    sendTextMessage,
    closeChatBox,
    closeChat,
    setMessages,
  } = useContext(ChatContext);

  const [chatInput, setChatInput] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  const socket = useRef<any>(null);

  // useEffect(() => {
  //   socket.current = io("http://localhost:4000");

  //   // Listen for incoming messages
  //   socket.current.on("getMessage", (message: Message) => {
  //     console.log("Received message:", message); // Log the message
  //     if (currentChat?.data?._id === message.chatId) {
  //       setMessages((prevMessages: Message[]) => [...prevMessages, message]);
  //     }
  //   });

  //   return () => {
  //     socket.current.disconnect();
  //   };
  // }, [currentChat?.data?._id, setMessages]);

  const handleSendButton = () => {
    sendTextMessage(chatInput, user?._id, currentChat?.data?._id, setChatInput);
    // socket.current.emit("sendMessage", {
    //   chatId: currentChat?.data?._id,
    //   senderId: user?._id,
    //   text: chatInput,
    // });
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!currentChat)
    return (
      <p style={{ textAlign: "center", width: "100%", marginTop: 10 }}>
        {user.role == ROLE.NORMAL ? (
          <RequestChat />
        ) : (
          "No Conversation Selected yet..."
        )}
      </p>
    );

  if (isMessageLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
    );

  return (
    <Box>
      <div
        style={{
          background: "gray",
          color: "white",
          textAlign: "center",
          padding: "10px",
          borderRadius: "5px 5px 0px 0px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {currentChat?.userDetail?.name}
        <Typography
          component={"span"}
          onClick={() => closeChatBox()}
          sx={{ cursor: "pointer" }}
        >
          <CloseIcon />
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "space-between",
          height: "72vh",
          justifyContent: "space-between",
        }}
      >
        <div style={{ overflowY: "scroll" }}>
          {messages?.length ? (
            messages.map((msg: Message, index: number) => (
              <div
                key={index}
                style={{
                  background: `${msg?.senderId !== user._id ? "darkgray" : "green"}`,
                  color: "white",
                  margin: 10,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: `${msg?.senderId !== user?._id ? "flex-start" : "flex-end"}`,
                  }}
                  ref={scroll}
                >
                  <div>
                    <div>{msg?.text}</div>
                    <div style={{ fontSize: "small" }}>
                      {convertDate(msg?.createdAt)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Chat empty</div>
          )}
        </div>
        <div>
          {currentChat?.data?.isOpen ? (
            <Box>
              <CustomEmojiInput
                disabled={!currentChat?.data?.isOpen}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleSendButton={handleSendButton}
              />
              <button
                style={{ width: "100%", cursor: "pointer" }}
                onClick={() =>
                  closeChat("chats/close", {
                    chatId: currentChat?.data?._id,
                    recipientId: currentChat?.userDetail?._id,
                  })
                }
              >
                Close Chat
              </button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              This chat has been closed
            </Box>
          )}
        </div>
      </div>
    </Box>
  );
};
export default ChatBox;
