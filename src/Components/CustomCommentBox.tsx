import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Chat, UserRequest } from "@/helper/interface";
import { IconButton } from "@mui/material";
import CustomIcon from "./CustomIcon";
import { avatar } from "@/helper/constant";

export default function CustomCompoentBox({
  data = [],
  handleAcceptRequest,
  userChats = [],
}: {
  data: UserRequest[];
  handleAcceptRequest: any;
  userChats: any;
}) {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data.map((e: UserRequest, index: number) => (
        <div key={index} style={{ width: "100%" }}>
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleAcceptRequest(e)}
              >
                <CustomIcon name="SwipeRight" sx={{ color: "success.main" }} />
              </IconButton>
            }
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={e?.senderId?.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary" }}
                  >
                    {e?.senderId?.email}
                  </Typography>
                  -- {e?.text}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
