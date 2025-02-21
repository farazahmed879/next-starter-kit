"use client";
import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { jwtDecode } from "jwt-decode";

import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import Link from "next/link";
import Navbar from "@/Components/layout/navbar/page";
import Layout from "@/Components/layout/page";
import { ChatContextProvider } from "@/context/ChatContext";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <ShoppingCartIcon />,
  },

  {
    segment: "clients",
    title: "Clients",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "upload",
    title: "Uploads",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "products",
    title: "Products",
    icon: <ShoppingCartIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// function useDemoRouter(initialPath: string): Router {
//   const [pathname, setPathname] = React.useState(initialPath);

//   const router = React.useMemo(() => {
//     return {
//       pathname,
//       searchParams: new URLSearchParams(),
//       navigate: (path: string | URL) => setPathname(String(path)),
//     };
//   }, [pathname]);

//   return router;
// }

function DemoPageContent({ pathname }: { pathname: string }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography component={"span"}>
        Dashboard content for {pathname}
      </Typography>
    </Box>
  );
}

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
}
const DashboardLayoutBasic = ({ children }: { children: React.ReactNode }) => {
  const router1 = useRouter();
  // const session = await getServerSession(options);
  const { data: session, status: sessionStatus, update } = useSession();

  // Decode the token safely
  let decodedToken;
  if (session) {
    decodedToken = jwtDecode<DecodedToken>(session?.user.token);
  }

  React.useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router1.replace("/auth/login");
    }
  }, [sessionStatus, router1]);

  if (sessionStatus === "loading") {
    return <>..Loading</>;
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     update(); // extend client session
  //     // TODO request token refresh from server
  //   }, 1000 * 60 * 60)
  //   return () => clearInterval(interval)
  // }, [update]); 

  // const logout = () => {
  //   signOut();
  // };

  return (
    <>
      {sessionStatus === "authenticated" ? (
        <>
          {/* <nav>
              <button onClick={logout}>Logout</button>
            </nav>
            {children} */}
          {/* <MiniDrawer /> */}
          <ChatContextProvider user={decodedToken}>
            <Layout>{children}</Layout>
          </ChatContextProvider>
        </>
      ) : (
        <Link href={"/auth/login"}>Please Login...</Link>
        // <Layout>{children}</Layout>
      )}
    </>
  );
};

export default DashboardLayoutBasic;
