"use client";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import {
  apiCall,
  playMsgSound,
  playNotificationSound,
  SweetAlert,
  baseUrl,
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
  const [requests, setRequests] = useState([]);
  const currentChatRef = useRef(currentChat);
  const { data: session, status: sessionStatus } = useSession();

  const getUserChat = async () => {
    if (user?._id) {
      setIsLoading(true);
      const response = await apiCall(`chats/${user?._id}`, "get");
      setIsLoading(false);
      if (!response) return;
      setUserChats(response);
      // getUsers(response?.data);
    }
  };

  const getMessages = async () => {
    setIsMessageLoading(true);
    const response = await apiCall(`messages/${currentChat?.data?._id}`, "get");
    setIsMessageLoading(false);
    if (!response) return;
    setMessages(response);
    // getUsers(response?.data);
  };

  const updateCurrentChat = useCallback(async (chat) => {
    if (!chat) return;
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
      const response = await apiCall(url, "post", reqData, {
        Authorization: `Bearer ${session?.user?.token}`,
      });
      if (!response) return console.log("Something went wrong");

      if (response) setNewMessage(response);

      setMessages((prev) => [...prev, response]);
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
        const isDesired = c?.data?.members.every((member) => {
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
      const response = await apiCall(`notifications/${user?._id}`, "get");
      setIsLoading(false);
      if (!response) return;

      setNotifications(response);
    }
  };

  const getUsers = async () => {
    const token = session?.user?.token;
    const role =
      user.role == "NORMAL" ? "AGENT" : user.role == "AGENT" ? "NORMAL" : "";
    setIsLoading(true);
    const response = await apiCall(`users/${role}`, "get", undefined, {
      Authorization: `Bearer ${token}`,
    });
    setIsLoading(false);
    if (!response) return;
    const existingChatMembers = userChats
      ? userChats.flatMap((chat) => chat?.members)
      : []; // Collecting all members of existing chats

    const pChats = response.data.filter((u) => {
      // Skip the current user
      if (user._id === u._id) return false;

      // Check if the user has already been in a chat
      return !existingChatMembers.includes(u._id); // Exclude users who are in existing chats
    });

    setPotentialChats(pChats);
    setAllUsers(response?.data);
  };

  const getRequests = async () => {
    const token = session?.user?.token;
    const role =
      user.role == "NORMAL" ? "AGENT" : user.role == "AGENT" ? "NORMAL" : "";
    setIsLoading(true);
    const response = await apiCall(`requests`, "get", undefined, {
      Authorization: `Bearer ${token}`,
    });
    setIsLoading(false);
    if (!response) return;
    setRequests(response);
  };

  const createOrMarkNotificationAsReadApi = async (
    url = "notifications",
    data = {}
  ) => {
    const response = await apiCall(url, "post", data, {
      Authorization: `Bearer ${session?.user?.token}`,
    });
  };

  const createRequest = useCallback(
    async (url = "requests", data = {}, setChatInput) => {
      try {
        const response = await apiCall(url, "post", data, {
          Authorization: `Bearer ${session?.user?.token}`,
        });

        if (response?.success == false)
          return SweetAlert(
            "Warning",
            "info",
            response.message,
            undefined,
            "OK"
          );

        socket.emit("addNewRequest", { ...response, senderId: user });
        SweetAlert(
          "Success",
          "success",
          "Your request has been submitted, our representative will reposnd you shortly",
          undefined,
          "OK"
        );
        setChatInput("");
        const reqNotiData = {
          senderId: user?._id,
          isRead: false,
          message: `${user?.name} requested for a chat`,
        };

        createOrMarkNotificationAsReadApi("notifications", reqNotiData);
      } catch (error) {
        console.log(error);
      }
    }
  );
  const acceptRequest = useCallback(async (url = "requests", data = {}) => {
    try {
      const response = await apiCall(url, "put", data, {
        Authorization: `Bearer ${session?.user?.token}`,
      });

      if (response?.success == false)
        return SweetAlert("Warning", "info", response.message, undefined, "OK");

      const newRequests = requests.filter((i) => i._id != data?.id);
      setRequests(newRequests);
      setCurrentChat(response.chat);
      setUserChats((prev) => [...prev, response.chat]);
      const userChat = {
        data: response?.chat?.data,
        userDetail: user, // who accepts the request
        senderId: data.senderId, //who are supposed to get notification
      };
      socket.emit("requestAccepted", userChat);
    } catch (error) {
      console.log(error);
    }
  });

  const updateUserChat = (newChat, setter) => {
    console.log("newChat", newChat);
    console.log("userChats", userChats);
    const updatedChats = userChats.map((e) =>
      e.data._id === newChat._id ? { ...e, data: newChat } : e
    );
    setter(updatedChats);
    setCurrentChat(null);
  };
  const closeChat = useCallback(async (url = "chats", data = {}) => {
    try {
      const response = await apiCall(url, "put", data, {
        Authorization: `Bearer ${session?.user?.token}`,
      });

      if (!response) return;

      SweetAlert("Success", "success", "Chat has been closed", undefined, "OK");

      updateUserChat(response, setUserChats);

      socket.emit("sendChatClosed", response);
    } catch (error) {
      console.log(error);
    }
  });

  const closeChatBox = () => {
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
    if (user?.role != "NORMAL") getRequests();
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
    if (!socket) return;

    const receipientId = currentChat?.data?.members?.find(
      (id) => id !== user?._id
    );

    socket.emit("sendMessage", {
      ...newMessage,
      senderName: user?.email,
      receipientId,
    });
    const url = "notifications";
    const data = {
      senderId: user?._id,
      userId: receipientId,
      isRead: false,
      message: `${user?.email} sent you a message`,
    };

    createOrMarkNotificationAsReadApi(url, data);
  }, [newMessage]);

  useEffect(() => {
    if (!socket) return;
    socket.on("getMessage", (res) => {
      if (currentChatRef.current?.data?._id !== res.chatId) return;

      setMessages((prev) => [...prev, res]);
      playMsgSound();
    });

    socket.on("getNotification", (res) => {
      const isChatOpen = currentChatRef.current?.data?.members.some(
        (id) => id == res.senderId
      );
      if (isChatOpen) {
        setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
      } else {
        setNotifications((prev) => [...prev, res]);
        playNotificationSound();
      }
    });

    socket.emit("addNewUser", user);
    socket.on("getOnlneUsers", (res) => {
      setOnlineUsers(res);
    });

    socket.on("getRequest", (res) => {
      setRequests((prev) => [...prev, res]);
    });

    socket.on("getChatClosed", (res) => {
      updateUserChat(res, setUserChats);
    });

    socket.on("getAcceptRequest", (res) => {
      console.log("accpet request");
      if (res?.userDetail?._id != user?._id) getUserChat();
    });

    return () => {
      socket.off("getMessage");
      socket.off("getNotification");
      socket.off("getOnlneUsers");
      socket.off("getRequest");
      socket.off("getChatClosed");
    };
  }, [socket]);

  useEffect(() => {
    currentChatRef.current = currentChat; // update the ref whenever currentChat changes
  }, [currentChat]);

  console.log("userChats", userChats);

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
        closeChatBox,
        createRequest,
        requests,
        acceptRequest,
        closeChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
