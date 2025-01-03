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
import Redirecting from "@/app/redirecting";

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

//   console.log(pathname);

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
      <Typography component="span">Dashboard content for {pathname}</Typography>
    </Box>
  );
}

interface DecodedToken {
  _id: string;
  email: string;
  role: string;
}
const DashboardLayoutBasic = ({ children }: { children: React.ReactNode }) => {
  // const { window, children } = props;
  const router1 = useRouter();
  // const session = await getServerSession(options);
  const { data: session, status: sessionStatus } = useSession();

  // Decode the token safely
  let decodedToken;
  if (session) {
    decodedToken = jwtDecode<DecodedToken>(session?.user.token);
    // console.log("Decoded token from layout",decodedToken);
  }

  // console.log("session from layout", session);

  React.useEffect(() => {
    if (sessionStatus === "unauthenticated") {
      router1.replace("/auth/login");
    }
  }, [sessionStatus, router1]);

  if (sessionStatus === "loading") {
    return <>..Loading</>;
  }

  // const logout = () => {
  //   signOut();
  // };
  // console.log(sessionStatus)

  return (
    <>
      <div>
        {sessionStatus === "authenticated" ? (
          <>
            {/* <nav>
              <button onClick={logout}>Logout</button>
            </nav>
            {children} */}
            {/* <MiniDrawer /> */}
            <Layout>{children}</Layout>
          </>
        ) : (
          <Link href={"/auth/login"}>
            <Redirecting />
          </Link>
        )}
      </div>
    </>
  );
};

export default DashboardLayoutBasic;
