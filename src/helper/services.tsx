export const baseUrl = "http://localhost:8080/";
import { useSession } from "next-auth/react";
export const postMethod = async (url: string, body: any, isToken?: boolean) => {
  url = `${baseUrl}${url}`;
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
