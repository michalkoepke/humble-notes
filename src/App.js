import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import Create from "./pages/Create";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { responsiveFontSizes } from "@material-ui/core/styles";

// contexty

import { AuthProvider } from "./Firebase/AuthContext";
import { DialogProvider } from "../src/store/DialogContext";

import PrivateRoute from "./components/PrivateRoute";

// podstrony

import Home from "./pages/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
// import Layout from './components/Layout'
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import LayoutExp from "./components/LayoutExp";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#eceff1",
    },

    // primary: blueGrey,

    secondary: {
      main: "#673ab7",
    },
  },

  typography: {
    fontFamily: "Poppins",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },

  overrides: {
    // Style sheet name ⚛️
    MuiCardHeader: {
      title: {
        // color: "#673ab7",
        fontSize: "1.2rem",
        // fontWeight: 400
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/forgot-password">
              <ForgotPassword />
            </Route>

            <DialogProvider>
              <LayoutExp>
                <PrivateRoute exact path="/notes" component={Notes}>
                  {/* <Notes /> */}
                </PrivateRoute>

                <PrivateRoute path="/create" component={Create}>
                  {/* <Create /> */}
                </PrivateRoute>
              </LayoutExp>
            </DialogProvider>
          </Switch>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
