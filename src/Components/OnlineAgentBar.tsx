import { OnlineUser, User } from "@/helper/interface";
import { Typography } from "@mui/material";

const styles = {
  padding: "10px",
  fontSize: "large",
  color: "green",
  fontFamily: "serif",
};

const OnlineAgentBar = ({
  onlineUsers = [],
  user,
}: {
  onlineUsers: OnlineUser[];
  user: User;
}) => {
  return (
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
          onlineUsers?.filter(
            (i: OnlineUser) => i.userId != user?._id && i.role != "ADMIN"
          )?.length
        }
      </span>
    </Typography>
  );
};
export default OnlineAgentBar;
