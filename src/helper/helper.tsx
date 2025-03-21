import axios, { Axios, AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { Notifications } from "./interface";
import moment from "moment";
import { signOut } from "next-auth/react";

// const { data: session, status: sessionStatus } = useSession();

export const baseUrl = "http://localhost:8080/";

export const apiCall = async (
  url: string,
  method: any,
  payload?: any,
  headers?: Record<string, string>
): Promise<any> => {
  try {
    if (!method) return;
    // const token = session?.user?.token;
    url = `${baseUrl}${url}`;
    const config: AxiosRequestConfig = {
      url,
      method: method as AxiosRequestConfig["method"],
      data: payload,
      headers: headers || { "Content-Type": "application/json" },
    };

    // if (method === "POST" || method === "PUT") {
    //   config.data = payload;
    // }

    const response = await axios.request(config);

    return response?.data;
  } catch (error: any) {
    if (error.code == "ERR_BAD_RESPONSE")
      await signOut({
        redirect: true, // Optionally redirect the user after signing out
        callbackUrl: "/", // Redirect URL after logout (default is home page)
      });
    console.log("Error in API call", error);
  }
};

export const SweetAlert = async (
  title: String,
  icon: "success" | "error" | "info" | "question",
  text?: string,
  showCancelButton?: boolean,
  confirmButtonText?: string,
  cancelButtonText?: string
) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: icon,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
  });
};

export const unreadNotification = (notifications: Notifications[] = []) => {
  return notifications.filter((e: Notifications) => e.isRead == false);
};

export const ArrowBack = ArrowBackIcon;

export const convertDate = (date: any) => {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
};

export const playNotificationSound = () => {
  const audio = new Audio("/long-pop.wav");
  audio.loop = false; // Set to loop the audio if required
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export const playMsgSound = () => {
  const audio = new Audio("/pop.mp3");
  audio.loop = false; // Set to loop the audio if required
  audio.play().catch((error) => {
    console.error("Error playing sound:", error);
  });
};

export const postMethod = async (url: string, body: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, message };
  }

  return { status: response.status, data };
};
