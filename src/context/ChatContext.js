"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, ApiCall } from "../helper/helper";
import { useSession } from "next-auth/react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [potentialChats, setPotentialChats] = useState(null);
  const { data: session, status: sessionStatus } = useSession();

  const getUserChat = async () => {
    if (user?._id) {
      setIsLoading(true);
      const response = await ApiCall(`chats/${user?._id}`);
      setIsLoading(false);
      if (response) return setUserChats(response);
    }
  };

  const getUsers = async () => {
    const token = session?.user?.token;
    setIsLoading(true);
    const response = await ApiCall(`users/`, "get", undefined, {
      Authorization: `Bearer ${token}`,
    });
    setIsLoading(false);
    if (!response) return;
    const pChats = response.data.data.filter((u) => {
      let isChatCreated = false;

      if (user._id == u._id) return false;

      if (userChats) {
        isChatCreated = userChats?.data?.some((chat) => {
          return chat.members[0] == u._id || chat.members[1] == u._id;
        });
      }

      return !isChatCreated;
    });
    setPotentialChats(pChats);
  };

  const createChat = useCallback(async (firstId, secondId) => {
    const url = "chats";
    const response = await ApiCall(url, "post", { firstId, secondId });
    if (!response) return console.log("something went wrong");

    setUserChats((prev) => [...prev, response]);
  },[]);

  useEffect(() => {
    getUsers();
  }, [userChats]);

  useEffect(() => {
    getUserChat();
  }, [user]);


  return (
    <ChatContext.Provider value={{ userChats, isLoading, potentialChats, createChat }}>
      {children}
    </ChatContext.Provider>
  );
};
