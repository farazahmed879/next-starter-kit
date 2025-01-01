"use client";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Grid2, Typography } from "@mui/material";
import UserChat from "@/Components/UserChat";
import PotentialChats from "@/Components/PotentialChats";
import { ApiCall } from "@/helper/helper";
import ChatBox from "@/Components/ChatBox";
import { ROLE } from "@/helper/constant";
import { OnlineUser } from "@/helper/interface";

const styles = {
  padding: '10px',
  fontSize: 'large',
  color: 'green',
  fontFamily: 'serif',
}

const Chat = () => {
  const {
    userChats,
    isLoading,
    setUserChats,
    updateCurrentChat,
    isMessageLoading,
    messages,
    onlineUsers
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

  console.log("user", user)
  console.log("onlineusers", onlineUsers)

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
          {user?.role != ROLE.NORMAL ?
            <PotentialChats user={user} createChat={createChat} /> :
            <Typography sx={styles} component={'div'}>{` Online Agents `}<span style={{ background: 'green', height: '10px', width: '20px', borderRadius: '50px', color: 'white' }}>{onlineUsers.filter((i: OnlineUser) => i.userId != user?._id)?.length}</span></Typography>
          }

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
