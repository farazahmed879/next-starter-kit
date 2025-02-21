"use client";
import { Box, Typography } from "@mui/material";
import { useContext, useState } from "react";
import CustomEmojiInput from "./CustomEmojiInput";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";

const RequestChat = () => {
  const { createRequest } = useContext(ChatContext);
  const { user } = useContext<any>(AuthContext);
  const [chatInput, setChatInput] = useState<string>("");

  const handleSendButton = () => {
    const data = {
      senderId: user?._id,
      text: chatInput,
    };
    createRequest("requests", data, setChatInput);
  };

  return (
    <Box>
      <Typography component={"span"}>Request for a Chat</Typography>
      <CustomEmojiInput
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendButton={handleSendButton}
        sendbuttonText="Submit"
      />
    </Box>
  );
};
export default RequestChat;
