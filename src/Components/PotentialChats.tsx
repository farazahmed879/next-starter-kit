import { AuthContext } from "@/context/AuthContext";
import { ChatContext } from "@/context/ChatContext";
import { Typography } from "@mui/material";
import { useContext } from "react";

const PotentialChats = ({ user }: { user: any }) => {
//   const { user } = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  //   console.log("potentialChats", potentialChats);
  return (
    <div style={{ display: "flex", gap: 5 }}>
      {potentialChats &&
        potentialChats.map((e: any, index: number) => (
          <Typography
            key={index}
            onClick={() => createChat(user?._id, e?._id)}
            style={{
              fontSize: "small",
              background: "green",
              color: "white",
              borderRadius: "5px",
              padding: 3,
            }}
          >
            {e.name}
          </Typography>
        ))}
    </div>
  );
};

export default PotentialChats;
