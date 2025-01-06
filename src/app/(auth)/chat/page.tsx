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
import CustomPotentialUsers from "@/Components/CustomPotentialUsers";
import { red } from "@mui/material/colors";

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
      <CustomCompoentBox
        userChats={userChats}
        data={requests}
        handleAcceptRequest={(e: string) =>
          acceptRequest("requests", { id: e, agentId: user?._id })
        }
      />
    );
  };

  const UserChatsCom = () => {
    return (
      <>
        {userChats?.length ? (
          userChats?.map((chat: any, index: number) => (
            <div key={index} onClick={() => updateCurrentChat(chat)}>
              <UserChat user={user} chat={chat} />
            </div>
          ))
        ) : (
          <>You have not started any chat yet</>
        )}
      </>
    );
  };

  // const PotentialUsersCom = () => {
  //   return <PotentialChats user={user} createChat={createChat} />;
  // };

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
    // { id: "users", title: "Users", data: <PotentialUsersCom /> },
    { id: "chats", title: "Chats", data: <UserChatsCom /> },
  ];

  // console.log("userChats", userChats);

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
              <Typography sx={styles} component={"span"}>
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

            <CustomAccordion
              data={
                user.role == ROLE.NORMAL
                  ? accordionData.filter((i) => i.id != "requests")
                  : accordionData
              }
            />
          </div>

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
