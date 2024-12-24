import { ChatContext } from "@/context/ChatContext";
import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import { Avatar } from "@mui/material";
import { useContext } from "react";

const UserChat = ({ user, chat }: any) => {
  const { receipientUser } = useFetchRecipientUser(chat, user);

  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers.some(
    (i: any) => i.userId == receipientUser?._id
  );

  const styles: React.CSSProperties = {
    background: "skyblue",
    border: "solid skyblue",
    borderRadius: "62%",
    height: "5px",
    width: "5px",
    position: "absolute",
    margin: -2,
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
      >
        <div style={{ display: "flex", gap: 5 }}>
          <Avatar alt="Remy Sharp" src="/file.svg" />
          <div>
            <div>{receipientUser?.name}</div>
            <div>Text Message</div>
          </div>
        </div>
        <div>
          <span style={isOnline ? styles : undefined}></span>
          <div style={{ fontSize: "small" }}>12/12/12</div>
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
            2
          </div>
        </div>
      </div>
    </>
  );
};
export default UserChat;
