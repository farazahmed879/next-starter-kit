import axios, { Axios, AxiosRequestConfig } from "axios";
import Swal from "sweetalert2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ApiCall = async (
  url: string,
  method: "post" | "put" | "get" | "delete" | "patch",
  payload?: any
): Promise<any> => {
  try {
    const config: AxiosRequestConfig = {
      url,
      method: method as AxiosRequestConfig["method"],
      data: payload,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (method === "post" || method === "put") {
      config.data = payload;
    }

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

export const ArrowBack = ArrowBackIcon;
