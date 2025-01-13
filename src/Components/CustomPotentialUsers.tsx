import { MouseEvent, useContext, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { User } from "@/helper/interface";
import { ChatContext } from "@/context/ChatContext";
import { Typography } from "@mui/material";
import CustomIcon from "./CustomIcon";
import { avatar } from "@/helper/constant";

const styles: React.CSSProperties = {
  background: "skyblue",
  border: "solid skyblue",
  borderRadius: "62%",
  height: "5px",
  width: "5px",
  position: "absolute",
};

export default function CustomPotentialUsers({
  user,
  createChat,
}: {
  user: User;
  createChat: any;
}) {
  const { potentialChats, onlineUsers } = useContext(ChatContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
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
            <CustomIcon name="ThreeP" />
            {/* <Avatar sx={{ width: 32, height: 32 }}>M</Avatar> */}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
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
                top: 70,
                right: 110,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <div style={{ padding: "15px" }}>
          <Typography component={"span"} sx={{ margin: 10 }}>
            Potential Users
          </Typography>
          {potentialChats
            ? potentialChats.map((e: any, index: number) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    createChat(user?._id, e?._id);
                    handleClose();
                  }}
                >
                  <Avatar src={avatar} /> {e?.name}{" "}
                  <span
                    style={
                      onlineUsers.some((i: any) => i.userId == e?._id)
                        ? styles
                        : undefined
                    }
                  ></span>
                </MenuItem>
              ))
            : "Not found"}
        </div>
      </Menu>
    </div>
  );
}
