import { useFetchRecipientUser } from "@/hooks/useFetchRecipient";
import { Avatar } from "@mui/material";

const UserChat = ({ user, chat }: any) => {

  console.log(" UserChat user",user)
  console.log(" UserChat chat",chat)

  const { receipientUser } = useFetchRecipientUser(chat, user);
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: 10,
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <Avatar alt="Remy Sharp" src="/file.svg" />
          <div>
            <div>{receipientUser?.data?.data?.name}</div>
            <div>Text Message</div>
          </div>
        </div>
        <div>
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
