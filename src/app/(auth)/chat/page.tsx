"use client";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Grid2, Typography } from "@mui/material";
import UserChat from "@/Components/UserChat";
import PotentialChats from "@/Components/PotentialChats";
import { apiCall } from "@/helper/helper";
import ChatBox from "@/Components/ChatBox";
import { ROLE } from "@/helper/constant";
import { OnlineUser, UserRequest } from "@/helper/interface";
import CustomAccordion from "@/Components/CustomAccordion";
import CustomCompoentBox from "@/Components/CustomCommentBox";
import CustomChat from "@/Components/CustomChat";

const styles = {
  padding: "10px",
  fontSize: "large",
  color: "green",
  fontFamily: "serif",
};

const Chat = () => {
  const {
    userChats,
    isLoading,
    setUserChats,
    updateCurrentChat,
    isMessageLoading,
    messages,
    onlineUsers,
    requests,
  } = useContext(ChatContext);

  const { user } = useContext<any>(AuthContext);

  const createChat = async (firstId: number, secondId: number) => {
    const url = "chats";
    const response = await apiCall(url, "post", { firstId, secondId });
    if (!response) return console.log("something went wrong");

    let chats: any = [];
    if (userChats && userChats.length) {
      chats = [...userChats];
    }
    chats.push(response?.data);
    setUserChats(chats);
  };

  const RequestCom = () => {
    return <CustomCompoentBox data={requests} />;
  };

  const UserChatsCom = () => {
    // return <CustomCompoentBox data={userChats} />;
    return (
      <>
        {userChats?.map((chat: any, index: number) => (
          <div key={index} onClick={() => updateCurrentChat(chat)}>
            <UserChat user={user} chat={chat} />
          </div>
        ))}
      </>
    );
  };

  const PotentialUsersCom = () => {
    return <PotentialChats user={user} createChat={createChat} />;
  };

  const accordionData = [
    {
      id: "panel1",
      title: "",
      data: <RequestCom />,
      extraProp: (
        <div
          style={{
            display: "flex", 
            alignItems: "center", 
            gap: "8px", 
          }}
        >
          <span style={{ fontSize: "16px" }}>Requests</span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#4caf50",
              borderRadius: "100px",
              color: "white",
              fontWeight: "bold",
              fontSize: "14px",
              textAlign: "center",
              width: "30px",
              height: "25px",
            }}
          >
            {requests?.length || 0}
          </div>
        </div>
      ),
    },
    // { id: "users", title: "Users", data: <PotentialUsersCom /> },
    { id: "chats", title: "Chats", data: <UserChatsCom /> },
  ];

  console.log("userChats", userChats);

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
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <>{isLoading ? "...loading chats" : ""}</>
            {user?.role == ROLE.NORMAL && (
              <Typography sx={styles} component={"div"}>
                {` Online Agents `}
                <span
                  style={{
                    background: "green",
                    height: "10px",
                    width: "20px",
                    borderRadius: "50px",
                    color: "white",
                  }}
                >
                  {
                    onlineUsers.filter(
                      (i: OnlineUser) =>
                        i.userId != user?._id && i.role != "ADMIN"
                    )?.length
                  }
                </span>
              </Typography>
            )}

            <CustomAccordion data={accordionData} />
          </div>

          <CustomChat user={user} createChat={createChat} />

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
