"use client";
import { ChatContext } from "@/context/ChatContext";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { Box, Grid2 } from "@mui/material";
import UserChat from "@/Components/UserChat";
import { apiCall } from "@/helper/helper";
import ChatBox from "@/Components/ChatBox";
import { ROLE } from "@/helper/constant";
import CustomAccordion from "@/Components/CustomAccordion";
import CustomCompoentBox from "@/Components/CustomCommentBox";
import CustomPotentialUsers from "@/Components/CustomPotentialUsers";
import OnlineAgentBar from "@/Components/OnlineAgentBar";
import { User, UserRequest } from "@/helper/interface";

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
    acceptRequest,
  } = useContext(ChatContext);

  const { user } = useContext<any>(AuthContext);

  const createChat = async (firstId: number, secondId: number) => {
    const url = "chats";
    const response = await apiCall(url, "post", { firstId, secondId });
    if (!response) return console.log("something went wrong");

    setUserChats([...userChats, response]);
  };

  const RequestCom = () => {
    return (
      <>
        {requests?.length ? (
          <CustomCompoentBox
            userChats={userChats}
            data={requests}
            handleAcceptRequest={(e: UserRequest) =>
              acceptRequest("requests", {
                id: e?._id,
                agentId: user?._id,
                senderId: e.senderId._id, //who generate the request
              })
            }
          />
        ) : (
          <div>You don't have any requests yet</div>
        )}
      </>
    );
  };

  const UserChatsCom = () => {
    return (
      <>
        {userChats?.length ? (
          userChats?.map((chat: any, index: number) => (
            <div
              key={index}
              onClick={() => updateCurrentChat(chat)}
              style={{ cursor: "pointer" }}
            >
              <UserChat chat={chat} />
            </div>
          ))
        ) : (
          <>You have not started any chat yet</>
        )}
      </>
    );
  };

  const accordionData = [
    {
      id: "requests",
      title: "Requests",
      data: <RequestCom />,
      extraProp: (
        <div
          style={{
            background: "red",
            width: "20px",
            color: "white",
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          {requests?.length}
        </div>
      ),
    },
    { id: "chats", title: "Chats", data: <UserChatsCom /> },
  ];

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
          <Box>
            <>{isLoading ? "...loading chats" : ""}</>
            {user?.role == ROLE.NORMAL && (
              <OnlineAgentBar user={user} onlineUsers={onlineUsers} />
            )}

            <CustomAccordion
              data={
                user.role == ROLE.NORMAL
                  ? accordionData.filter((i) => i.id != "requests")
                  : accordionData
              }
            />
          </Box>

          <CustomPotentialUsers user={user} createChat={createChat} />
        </Grid2>
        <Grid2 size={8} sx={{ border: "solid #eedd82", borderRadius: 2 }}>
          <ChatBox />
        </Grid2>
      </Grid2>
    </>
  );
};
export default Chat;
