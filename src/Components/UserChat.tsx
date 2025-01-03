import { ChatContext } from "@/context/ChatContext";
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
import DeleteIcon from "@mui/icons-material/Delete";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";

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
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => {
              if (currentUserNotification?.length)
                markUserNotificationAsRead(receipientUser, notifications);
            }}
          >
            <SwipeRightIcon />
          </IconButton>
        }
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <ListItemAvatar>
          <Avatar src="/file.svg" />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography
              variant="body1"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              {receipientUser?.name}
              <div style={isOnline ? styles : undefined}></div>
            </Typography>
          }
          secondary={
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              {trucateText(lastestMessage?.text)}
              <Typography variant="caption" color="text.secondary">
                {convertDate(lastestMessage?.createdAt)}
              </Typography>
            </Typography>
          }
        />
      </ListItem>
      <Divider />
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
    </>
  );
};

export default UserChat;
