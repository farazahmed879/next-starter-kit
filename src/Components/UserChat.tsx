import { ChatContext } from "@/context/ChatContext";
import { convertDate, unreadNotification } from "@/helper/helper";
import { useFetchLatestMessage } from "@/hooks/useFetchLastMessage";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import { Avatar, Typography } from "@mui/material";
import { useContext } from "react";

const UserChat = ({ user, chat }: any) => {
  const { receipientUser } = useFetchRecipientUser(chat, user);

  const { lastestMessage } = useFetchLatestMessage(chat);

  const { onlineUsers, notifications, markUserNotificationAsRead } =
    useContext(ChatContext);

  const unreadNotifications = unreadNotification(notifications);

  const currentUserNotification = unreadNotifications.filter(
    (i) => i?.senderId == receipientUser?._id
  );

  const isOnline = onlineUsers.some(
    (i: any) => i.userId == receipientUser?._id
  );

  const styles: React.CSSProperties = {
    background: "skyblue",
    border: "solid skyblue",
    borderRadius: "62%",
    height: "10px",
    width: "10px",
  };

  const trucateText = (text: string = "") => {
    if (text?.length > 20) return `${text?.substring(0, 20)}...`;

    return text;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          margin: 10,
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={() => {
          if (currentUserNotification?.length)
            markUserNotificationAsRead(receipientUser, notifications);
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <Avatar alt="Remy Sharp" src="/file.svg" />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div>{receipientUser?.name}</div>

              <div style={isOnline ? styles : undefined}></div>
            </div>

            <div>{trucateText(lastestMessage?.text)}</div>
          </div>
        </div>
        <div>
          <div style={{ fontSize: "small" }}>
            {convertDate(lastestMessage?.createdAt)}
          </div>
          <div
            style={{
              background: "red",
              borderRadius: 50,
              width: "25px",
              display: "flex",
              justifyContent: "center",
              color: "white",
            }}
          >
            {currentUserNotification?.length
              ? currentUserNotification?.length
              : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default UserChat;
