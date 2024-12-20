"use client";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Grid2 } from "@mui/material";
import UserChat from "@/Components/UserChat";
import PotentialChats from "@/Components/PotentialChats";

const Chat = () => {
  const { userChats, isLoading } = useContext(ChatContext);
  const { user } = useContext<any>(AuthContext);

  // console.log("userData", user);

  return (
    <>
      <Grid2 container spacing={4} height={"80vh"}>
        <Grid2 size={4} sx={{ border: "solid #eedd82", padding: 1 }}>
          <>{isLoading ? "...loading chats" : ""}</>
          <PotentialChats user={user} />
          <UserChat user={user} chat={userChats?.data} />
          {/* {userChats && userChats?.data?.map((e: any) => <>chato</>)} */}
        </Grid2>
        <Grid2 size={8} sx={{ border: "solid #eedd82" }}>
          MessageBox
        </Grid2>
      </Grid2>
    </>
  );
};
export default Chat;
