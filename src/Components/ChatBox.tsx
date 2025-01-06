import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import { useContext, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import CustomButton from "./CustomButton";
import { convertDate } from "@/helper/helper";
import { Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ROLE } from "@/helper/constant";
import RequestChat from "./RequestChat";
import CustomEmojiInput from "./CustomEmojiInput";

const ChatBox = () => {
  const { user } = useContext<any>(AuthContext);
  const {
    currentChat,
    messages,
    isMessageLoading,
    sendTextMessage,
    closeChat,
  } = useContext(ChatContext);
  // const { receipientUser } = useFetchRecipientUser(currentChat, user);

  const [chatInput, setChatInput] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);

  const handleSendButton = () => {
    sendTextMessage(chatInput, user?._id, currentChat?._id, setChatInput);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("currentChat ChatBox", currentChat);

  if (!currentChat)
    return (
      <>
        <p style={{ textAlign: "center", width: "100%", marginTop: 10 }}>
          {user.role == ROLE.NORMAL ? (
            <RequestChat />
          ) : (
            " No Conversation Selected yet..."
          )}
        </p>
      </>
    );

  if (isMessageLoading)
    return (
      <>
        <p style={{ textAlign: "center", width: "100%" }}>Loading chat...</p>
      </>
    );

  return (
    <section>
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
          onClick={() => closeChat()}
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
            messages.map((msg: any, index: number) => (
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
        <CustomEmojiInput
          chatInput={chatInput}
          setChatInput={setChatInput}
          handleSendButton={handleSendButton}
        />
      </div>
    </section>
  );
};
export default ChatBox;
