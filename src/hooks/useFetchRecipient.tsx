import { useEffect, useState } from "react";
import { ApiCall } from "../helper/helper";
import { Chat, UseFetchRecipientUserReturn, User } from "@/helper/interface";

export const useFetchRecipientUser = (
  chat: Chat | null | undefined,
  user: User | null | undefined
): UseFetchRecipientUserReturn => {
  const [receipientUser, setReceipientUser] = useState<User | null>(null);
  const [error, setError] = useState<any | null>(null);


  const receipientId = chat?.members?.find((id) => id !== user?._id);

  const getUser = async (): Promise<void> => {
    if (!receipientId) return;

    try {
      const url = `users/id/${receipientId}`;
      const response = await ApiCall(url, "get");
      if (response) {
        setReceipientUser(response?.data?.data);
      } else {
        throw new Error("Failed to fetch recipient user.");
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [receipientId, user]);

  return { receipientUser, error };
};
