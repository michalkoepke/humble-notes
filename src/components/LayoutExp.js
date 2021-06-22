import React, { useState } from "react";
import PropTypes from "prop-types";

import { Box } from "@material-ui/core";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import { format } from "date-fns";
import { useHistory, useLocation } from "react-router";

import logo from "../images/HumbleLogoText.svg";

import MyDialog from "./MyDialog";
import { useDialog } from "../store/DialogContext";
import { useAuth } from "../Firebase/AuthContext";
import Footer from "./Footer";
import Notes from "../pages/Notes";
import Create from "../pages/Create";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  // necessary for content to be below app bar

  // toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    background: "#673ab7",
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  page: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },

    backgroundColor: "#f9f9f9",
    padding: theme.spacing(3),

    // experimental:

    display: "flex",
    minHeight: "100vh",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  date: {
    flexGrow: 1,
  },

  itemText: {
    color: "white",
  },

  title: {
    padding: theme.spacing(2),
  },

  active: {
    background: "#7e57c2",
  },

  humbleLogo: {
    height: "50px",
    padding: "0.3rem",
  },

  belka: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
  },
}));

const menuItems = [
  {
    text: "My Notes",
    icon: <SubjectOutlined color="primary" />,
    path: "/notes",
  },

  {
    text: "Create Note",
    icon: <AddCircleOutlineOutlined color="primary" />,
    path: "/create",
  },

  {
    text: "Home",
    icon: <HomeOutlinedIcon color="primary" />,
    path: "/humble-notes",
  },
];

function LayoutExp(props) {
  const { openDialog } = useDialog();

  const menuItemsadditional = [
    {
      text: "Your Account",
      icon: <PersonOutlineOutlinedIcon color="primary" />,

      funkcja: openDialog,
    },

    {
      text: "Logout",
      icon: <ExitToAppOutlinedIcon color="primary" />,

      funkcja: handleLogout,
    },
  ];

  const history = useHistory();
  const location = useLocation();

  const [error, setError] = useState("");

  // handler do logoutu

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const { logout } = useAuth();

  const { currentUser } = useAuth();

  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const zamknij = () => {
    setMobileOpen(false);
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  // ! tutaj szuflada

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider />

      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={() => {
              history.push(item.path);
              zamknij();
            }}
            className={location.pathname == item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} className={classes.itemText} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
        {menuItemsadditional.map((item) => (
          <ListItem
            key={item.text}
            button
            onClick={item.funkcja}
            className={location.pathname == item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} className={classes.itemText} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="secondary">
        <Toolbar>
          <div className={classes.belka}>
            <Box>
              <img src={logo} alt="Logo" className={classes.humbleLogo} />
            </Box>
          </div>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>

        <MyDialog />
      </AppBar>

      {/* Szuflada */}

      <nav className={classes.drawer} aria-label="navigation links">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <div className={classes.page}>
        {/* <div className={classes.toolbar}></div> */}

        {props.children}
      </div>

      <Footer />
    </div>
  );
}

LayoutExp.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LayoutExp;
