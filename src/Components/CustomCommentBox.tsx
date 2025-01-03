import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { UserRequest } from "@/helper/interface";
import CustomButton from "./CustomButton";
import { IconButton, ListItemButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import SwipeLeftIcon from "@mui/icons-material/SwipeLeft";

export default function CustomCompoentBox({
  data = [],
}: {
  data: UserRequest[];
}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {data.map((e: UserRequest, index: number) => (
        <div key={index}>
          <ListItem
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <SwipeRightIcon sx={{ color: "success.main" }} />
              </IconButton>
            }
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={e?.senderId.name}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{ color: "text.primary" }}
                  >
                    {e?.senderId.email}
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
