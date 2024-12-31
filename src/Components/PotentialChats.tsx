import { ChatContext } from "@/context/ChatContext";
import { Typography } from "@mui/material";
import { useContext } from "react";

const PotentialChats = ({ user, createChat }: any) => {
  //   const { user } = useContext(AuthContext);
  const { potentialChats, onlineUsers } = useContext(ChatContext);

  const styles: React.CSSProperties = {
    background: "skyblue",
    border: "solid skyblue",
    borderRadius: "62%",
    height: "5px",
    width: "5px",
    position: "absolute"
  };

  return (
    <div
      style={{
        display: "grid",
        cursor: "pointer",
        gridTemplateColumns: "repeat(auto-fill, minmax(50px, 1fr))",
        gap: "5px",
      }}
    >
      {potentialChats &&
        potentialChats.map((e: any, index: number) => (
          <Typography
            className="text-wrap"
            component={"div"}
            key={index}
            onClick={() => createChat(user?._id, e?._id)}
            style={{
              fontSize: "small",
              background: "green",
              color: "white",
              borderRadius: "5px",
              padding: 3,
              position: 'relative'
            }}
          >
            {e.name}
            <span
              style={
                onlineUsers.some((i: any) => i.userId == e?._id)
                  ? styles
                  : undefined
              }
            >
              {/* {" "}
              {onlineUsers.some((i: any) => i.userId == e?._id) ? "online" : ""} */}
            </span>
          </Typography>
        ))}
    </div>
  );
};

export default PotentialChats;
