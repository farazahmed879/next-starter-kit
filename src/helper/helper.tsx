import axios, { Axios, AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import { Notifications } from "./interface";
import moment from "moment";
// const { data: session, status: sessionStatus } = useSession();

export const baseUrl = "http://localhost:8080/";

export const apiCall = async (
  url: string,
  method: any,
  payload?: any,
  headers?: Record<string, string>
): Promise<any> => {
  try {
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

    return response;
  } catch (error) {
    console.error("Error in API call", error);
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
