import * as React from "react";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { ChatContext } from "@/context/ChatContext";
import { Typography } from "@mui/material";
import { convertDate, unreadNotification } from "@/helper/helper";
import { Notifications, User } from "@/helper/interface";
import { AuthContext } from "@/context/AuthContext";

export default function Notification() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
  } = useContext(ChatContext);
  const { user } = useContext<any>(AuthContext);

  const unReadNotifications: Notifications[] =
    unreadNotification(notifications);
  const modifiedNotifications: Notifications[] = notifications.map(
    (n: Notifications) => {
      const sender = allUsers.find((user: User) => user._id == n.senderId);
      return {
        ...n,
        senderName: sender?.name,
      };
    }
  );


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (ev = "") => {
    setAnchorEl(null);
  };


  const CountSpan = ({ noti = [] }: any) => {
    return <span style={style}>{noti?.length}</span>;
  };

  const style: React.CSSProperties = {
    background: "red",
    borderRadius: "50px",
    height: "5",
    width: "17px",
    color: "white",
    fontSize: "small",
    position: "absolute",
    top: "0px",
    right: "0px",
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {unReadNotifications?.length ? (
              <>
                <CountSpan noti={unReadNotifications} />
                <NotificationsActiveIcon />
              </>
            ) : (
              <NotificationsIcon />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => handleClose()}
        onClick={() => handleClose()}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              width: 300,
              overflowY: "scroll",
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <>
          {!!modifiedNotifications.length && (
            <>
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "4",
                }}
              >
                <Typography component={"span"}>Notifications</Typography>
                <Typography
                  sx={{ fontSize: "small" }}
                  component={"h6"}
                  onClick={() => markAllNotificationAsRead(notifications)}
                >
                  Mark all as read
                </Typography>
              </MenuItem>
            </>
          )}
          {modifiedNotifications?.length ? (
            modifiedNotifications.map((e: Notifications, key: number) => (
              <MenuItem
                key={key}
                onClick={() => handleClose()}
                sx={{ backgroundColor: e?.isRead ? "" : "bisque" }}
              >
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                <Typography
                  component={"span"}
                  onClick={() =>
                    markNotificationAsRead(e, userChats, user, notifications)
                  }
                >
                  <Typography component={"span"}>{`${e.message}`}</Typography>
                  <Typography component={"span"} sx={{ fontSize: "small" }}>
                    {convertDate(e.date)}
                  </Typography>
                </Typography>
              </MenuItem>
            ))
          ) : (
            <MenuItem onClick={() => handleClose()}>
              No notifications yet!
            </MenuItem>
          )}
        </>
      </Menu>
    </React.Fragment>
  );
}
