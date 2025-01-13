import { ChatContext } from "@/context/ChatContext";
import { avatar } from "@/helper/constant";
import { convertDate, unreadNotification } from "@/helper/helper";
import { useFetchLatestMessage } from "@/hooks/useFetchLastMessage";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import {
  Avatar,
  Typography,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
} from "@mui/material";
import { useContext } from "react";

const UserChat = ({ user, chat }: any) => {
  const { onlineUsers, notifications, markUserNotificationAsRead } =
    useContext(ChatContext);

  const unreadNotifications = unreadNotification(notifications);

  const currentUserNotification = unreadNotifications.filter(
    (i) => i?.senderId == chat?.userDetail?._id
  );

  const isOnline = onlineUsers.some(
    (i: any) => i.userId == chat?.userDetail?._id
  );

  // console.log("unreadNotifications", currentUserNotification);
  // console.log("chat", chat);

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
      <ListItem
        onClick={() => markUserNotificationAsRead(chat?.userDetail)}
        alignItems="flex-start"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <ListItemAvatar>
          <Avatar src={avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              component={"span"}
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {chat?.userDetail?.name}
              <div style={isOnline ? styles : undefined}></div>
            </Typography>
          }
          secondary={
            <Typography
              component={"span"}
              variant="body2"
              color="text.primary"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {trucateText(chat?.lastMessage?.text)}
              <Typography
                component={"span"}
                variant="caption"
                color="text.secondary"
              >
                {convertDate(chat?.lastMessage?.createdAt)}
              </Typography>
              {currentUserNotification?.length > 0 && (
                <div
                  style={{
                    background: "red",
                    borderRadius: "50%",
                    width: "25px",
                    height: "25px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    fontSize: "small",
                  }}
                >
                  {currentUserNotification?.length}
                </div>
              )}
            </Typography>
          }
        />
      </ListItem>
      <Divider />
    </>
  );
};

export default UserChat;
