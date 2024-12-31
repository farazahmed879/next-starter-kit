"use client";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Grid2 } from "@mui/material";
import UserChat from "@/Components/UserChat";
import PotentialChats from "@/Components/PotentialChats";
import { ApiCall } from "@/helper/helper";
import ChatBox from "@/Components/ChatBox";

const Chat = () => {
  const {
    userChats,
    isLoading,
    setUserChats,
    updateCurrentChat,
    isMessageLoading,
    messages,
  } = useContext(ChatContext);
  const { user } = useContext<any>(AuthContext);

  const createChat = async (firstId: number, secondId: number) => {
    const url = "chats";
    const response = await ApiCall(url, "post", { firstId, secondId });
    if (!response) return console.log("something went wrong");

    let chats: any = [];
    if (userChats && userChats.length) {
      chats = [...userChats];
    }
    chats.push(response?.data);
    setUserChats(chats);
  };

  return (
    <>
      <Grid2 container spacing={4} height={"80vh"}>
        <Grid2
          size={4}
          sx={{
            border: "solid #eedd82",
            padding: 1,
            borderRadius: 2,
            width: "30%",
          }}
        >
          <>{isLoading ? "...loading chats" : ""}</>
          <PotentialChats user={user} createChat={createChat} />
          {userChats?.map((chat: any, index: number) => (
            <div key={index} onClick={() => updateCurrentChat(chat)}>
              <UserChat user={user} chat={chat} />
            </div>
          ))}

          {/* {userChats && userChats?.data?.map((e: any) => <>chato</>)} */}
        </Grid2>
        <Grid2 size={8} sx={{ border: "solid #eedd82", borderRadius: 2 }}>
          <ChatBox />
        </Grid2>
      </Grid2>
    </>
  );
};
export default Chat;
