import axios, { Axios, AxiosRequestConfig } from "axios";
import { url } from "inspector";
import Swal from "sweetalert2";

export const baseUrl = `http://localhost:8080`;

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

export const getMethod = async (url: string) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error has occured...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, message };
  }

  return { status: response.status, data };
};

export const getMethodAxio = async (url: string) => {
  try {
    const response = await axios.get(url);

    return { status: response.status, data: response.data };
  } catch (error: any) {
    let message = "An error has occurred...";

    if (error.response && error.response.data?.message) {
      message = error.response.data.message;
    }

    return { error: true, message };
  }
};
