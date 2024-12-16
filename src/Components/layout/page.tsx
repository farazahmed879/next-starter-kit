import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Navbar from "./navbar/page";
import Sidebar from "./sidebar/page";

const drawerWidth = 240;

interface layoutProps {
  children: React.ReactNode;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Layout: React.FC<layoutProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Sidebar
          openState={open}
          setOpenState={setOpen}
          drawerWidth={drawerWidth}
        />
        <Navbar openState={open} setOpenState={setOpen} drawerWidth={drawerWidth} />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Typography sx={{ marginBottom: 2 }}>{children}</Typography>
        </Box>
      </Box>
    </>
  );
};

export default Layout;
