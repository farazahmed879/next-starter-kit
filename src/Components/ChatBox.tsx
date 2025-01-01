import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import { useContext, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import CustomButton from "./CustomButton";
import { convertDate } from "@/helper/helper";
import { Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


const ChatBox = () => {
  const { user } = useContext<any>(AuthContext);
  const { currentChat, messages, isMessageLoading, sendTextMessage, closeChat } =
    useContext(ChatContext);
  const { receipientUser } = useFetchRecipientUser(currentChat, user);

  const [chatInput, setChatInput] = useState<string>("");
  const scroll = useRef<HTMLDivElement>(null);
  
  const handleSendButton = () => {
    sendTextMessage(chatInput, user?._id, currentChat?._id, setChatInput);
  };

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!receipientUser || !currentChat)
    return (
      <>
        <p style={{ textAlign: "center", width: "100%" }}>
          No Conversation Selected yet...
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
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {receipientUser?.name}
        <Typography component={'span'} onClick={() => closeChat()}><CloseIcon/></Typography>
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
                    <div style={{ fontSize: "small" }}>{convertDate(msg?.createdAt)}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>Chat empty</div>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <InputEmoji
            placeholderColor="Enter Message here"
            value={chatInput}
            onChange={setChatInput}
            cleanOnEnter
            onEnter={handleSendButton}
            placeholder="Type a message"
            shouldReturn={true}
            shouldConvertEmojiToImage={false}
          />
          <div style={{ margin: 10 }}>
            <CustomButton
              text="Send"
              handleClick={handleSendButton}
              size={"small"}
              variant={"contained"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ChatBox;
