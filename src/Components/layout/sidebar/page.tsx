import React from "react";
import {
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  styled,
  Theme,
  CSSObject,
  ListItemIcon,
  useTheme,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PersonIcon from "@mui/icons-material/Person";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import DomainIcon from "@mui/icons-material/Domain";
import ContactsIcon from "@mui/icons-material/Contacts";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Link from "next/link";

interface SidebarProps {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  drawerWidth: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  openState,
  setOpenState,
  drawerWidth,
}) => {
  const theme = useTheme();

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme: Theme): CSSObject => ({
    width: `calc(${theme.spacing(7)} + 1px)`,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
  });

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open
      ? {
          ...openedMixin(theme),
          "& .MuiDrawer-paper": openedMixin(theme),
        }
      : {
          ...closedMixin(theme),
          "& .MuiDrawer-paper": closedMixin(theme),
        }),
  }));

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));

  const items = ["dashboard", "products", "user", "chat"];
  const icons: Record<string, JSX.Element> = {
    dashboard: <DashboardIcon />,
    contact: <ContactsIcon />,
    clients: <SupervisedUserCircleIcon />,
    department: <DomainIcon />,
    products: <ProductionQuantityLimitsIcon />,
    projects: <AccountTreeIcon />,
    user: <PersonIcon />,
  };

  const routes: Record<string, string> = {
    dashboard: "/dashboard",
    products: "/products",
    user: "/user",
    chat: "/chat",
  };

  const handleDrawerClose = () => setOpenState(false);

  return (
    <>
      <CssBaseline />
      <Drawer variant="permanent" open={openState}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {items.map((text: string) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Link href={routes[text]} passHref>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: openState ? "initial" : "center",
                    px: 2.5,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: openState ? "flex-start" : "center",
                      marginRight: openState ? 3 : 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  >
                    {icons[text]}
                  </ListItemIcon>
                  <ListItemText
                    primary={text.charAt(0).toUpperCase() + text.slice(1)}
                    sx={{
                      opacity: openState ? 1 : 0,
                      transition: "opacity 0.3s ease-in-out",
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
