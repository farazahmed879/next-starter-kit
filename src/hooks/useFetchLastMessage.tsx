import { ChatContext } from "@/context/ChatContext";
import { apiCall } from "@/helper/helper";
import { Chat, Message } from "@/helper/interface";
import { useContext, useEffect, useState } from "react";

const defaultMessage = {
  chatId: "",
  createdAt: "",
  senderId: "",
  text: "something here",
  updatedAt: "",
  _id: "",
};

export const useFetchLatestMessage = (chat: Chat) => {
  const { newMesage, notifications } = useContext(ChatContext);
  const [lastestMessage, setLatestMessage] = useState<Message>(defaultMessage);


  useEffect(() => {
    const getMessages = async () => {
      const url = `messages/${chat?._id}`;
      const response = await apiCall(url, "get");
      if (!response) console.log("something went wrong");
      const data = response.data;
      const lastMessage = data[data.length - 1];
      setLatestMessage(lastMessage);
    };
    getMessages();
  }, [newMesage, notifications]);

  return { lastestMessage };
};
