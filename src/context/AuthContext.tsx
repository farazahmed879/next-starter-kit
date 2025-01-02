import { apiCall, SweetAlert } from "@/helper/helper";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { jwtDecode } from "jwt-decode";
import {
  AuthContextProviderProps,
  AuthContextType,
  DecodedToken,
  RegisterInfo,
} from "@/helper/interface";

// Define types for the context value

// Create the context with the type
export const AuthContext = createContext<AuthContextType | undefined | DecodedToken>(
  undefined
);

export const AuthConextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [registerInfo, setRegisterInfo] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();

  const { data: session, status: sessionStatus } = useSession();

  let user: DecodedToken | null = null;
  if (session) {
    user = jwtDecode<DecodedToken>(session?.user.token); // Type the decoded token
  }

  const registerUser = async (data: RegisterInfo) => {
    try {
      setIsloading(true);
      const response = await apiCall("users", "post", data);

      setIsloading(false);
      if (response.data.message === "User Created Successfully") {
        const res = await SweetAlert(
          "Success",
          "success",
          "User added successfully!",
          false,
          "OK"
        );

        if (res.isDenied) return;
        router.replace("/auth/login");
      } else {
        const errorData = await response.json();
        console.log("Error:", errorData);
      }
    } catch (error) {
      console.error("Network error", error);
      alert("Failed to submit form, please try again");
    }
  };

  const updateregisterInfo = useCallback(async (info: RegisterInfo) => {
    setRegisterInfo(info);
    await registerUser(info);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, registerInfo, updateregisterInfo, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
