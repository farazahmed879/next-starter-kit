"use client";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  baseUrl,
  ApiCall,
  playMsgSound,
  playNotificationSound,
} from "../helper/helper";
import { useSession } from "next-auth/react";

import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const currentChatRef = useRef(currentChat);
  const { data: session, status: sessionStatus } = useSession();

  const getUserChat = async () => {
    if (user?._id) {
      setIsLoading(true);
      const response = await ApiCall(`chats/${user?._id}`, "get");
      setIsLoading(false);
      if (!response) return;
      setUserChats(response?.data);
      // getUsers(response?.data);
    }
  };

  const getMessages = async () => {
    setIsMessageLoading(true);
    const response = await ApiCall(`messages/${currentChat?._id}`, "get");
    setIsMessageLoading(false);
    if (!response) return;
    setMessages(response?.data);
    // getUsers(response?.data);
  };

  const updateCurrentChat = useCallback(async (chat) => {
    setCurrentChat(chat);
  }, []);

  const sendTextMessage = useCallback(
    async (textMessage, senderId, chatId, setTextMessage) => {
      if (!textMessage) return console.log("Text msg should not be empty");
      const url = "messages";
      const reqData = {
        chatId: chatId,
        senderId: senderId,
        text: textMessage,
      };
      const response = await ApiCall(url, "post", reqData, {
        Authorization: `Bearer ${session?.user?.token}`,
      });
      if (!response) return console.log("Something went wrong");

      if (response) setNewMessage(response.data);

      setMessages((prev) => [...prev, response.data]);
      setTextMessage("");
    },
    []
  );

  const markAllNotificationAsRead = useCallback(async (notifications) => {
    const newNotifications = notifications.map((e) => {
      return { ...e, isRead: true };
    });
    const url = "notifications/markAllRead";
    const data = { userId: user?._id };
    createOrMarkNotificationAsReadApi(url, data);
    setNotifications(newNotifications);
  });

  const markNotificationAsRead = useCallback(
    async (n, userChats, user, notifications) => {
      const chat = userChats.find((c) => {
        const chatMembers = [user._id, n.senderId];
        const isDesired = c?.members.every((member) => {
          return chatMembers.includes(member);
        });

        return isDesired;
      });

      //
      const mNotifications = notifications.map((e) => {
        if (n.senderId == e.senderId) return { ...n, isRead: true };
        else return e;
      });

      const url = "notifications/markReadByUserId";
      const data = { userId: n?.userId, senderId: n?.senderId };
      createOrMarkNotificationAsReadApi(url, data);
      updateCurrentChat(chat);
      setNotifications(mNotifications);
    }
  );
  const markUserNotificationAsRead = useCallback(async (chatUser) => {
    let mNotifcations = [];
    notifications.forEach((e) => {
      if (e?.senderId == chatUser?._id) e.isRead = true;
      mNotifcations.push(e);
    });
    const url = "notifications/markReadByUserId";
    const data = { userId: user?._id, senderId: chatUser?._id };
    createOrMarkNotificationAsReadApi(url, data);
    setNotifications(mNotifcations);
  });

  const getNotifications = async () => {
    if (user?._id) {
      setIsLoading(true);
      const response = await ApiCall(`notifications/${user?._id}`, "get");
      setIsLoading(false);
      if (!response) return;

      setNotifications(response?.data);
      //setUserChats(response?.data);
      // getUsers(response?.data);
    }
  };

  const getUsers = async () => {
    const token = session?.user?.token;
    console.log("user aaa", user);
    const role =
      user.role == "NORMAL" ? "AGENT" : user.role == "AGENT" ? "NORMAL" : "";
    setIsLoading(true);
    const response = await ApiCall(`users/${role}`, "get", undefined, {
      Authorization: `Bearer ${token}`,
    });
    setIsLoading(false);
    if (!response) return;
    const existingChatMembers = userChats
      ? userChats.flatMap((chat) => chat.members)
      : []; // Collecting all members of existing chats

    const pChats = response.data.data.filter((u) => {
      // Skip the current user
      if (user._id === u._id) return false;

      // Check if the user has already been in a chat
      return !existingChatMembers.includes(u._id); // Exclude users who are in existing chats
    });

    setPotentialChats(pChats);
    setAllUsers(response?.data?.data);
  };

  const createOrMarkNotificationAsReadApi = async (
    url = "notifications",
    data = {}
  ) => {
    const response = await ApiCall(url, "post", data, {
      Authorization: `Bearer ${session?.user?.token}`,
    });
    console.log("response", response);
  };

  const closeChat = () => {
    setCurrentChat(null);
    currentChatRef.current = null;
  };

  useEffect(() => {
    // if (!userChats || !userChats?.length) return;
    getUsers();
  }, [userChats]);

  useEffect(() => {
    if (!user) return;
    getUserChat();
    getNotifications();
  }, [user]);

  useEffect(() => {
    if (!currentChat) return;
    getMessages();
  }, [currentChat]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("getOnlneUsers", (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off("getOnlneUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    const receipientId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessage, receipientId });
    const url = "notifications";
    const data = {
      senderId: user?._id,
      userId: receipientId,
      isRead: false,
      message: `${user?.email}`,
    };

    createOrMarkNotificationAsReadApi(url, data);
  }, [newMessage]);

  //receive message and notifcations

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (res) => {
      if (currentChatRef.current?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
      playMsgSound();
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChatRef.current?.members.some(
        (id) => id == res.senderId
      );
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [...prev, res]);
        playNotificationSound();
      }
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
    };
  }, [socket]);

  useEffect(() => {
    currentChatRef.current = currentChat; // update the ref whenever currentChat changes
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isLoading,
        potentialChats,
        setUserChats,
        updateCurrentChat,
        isMessageLoading,
        messages,
        currentChat,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationAsRead,
        markNotificationAsRead,
        markUserNotificationAsRead,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
