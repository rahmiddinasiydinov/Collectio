import { Routes, Route } from "react-router";
import "./App.scss";
import { Login } from "./Pages/Login/Login";
import { Registration } from "./Pages/Registration/Registration";
import axios from "axios";
import { CssBaseline } from "@mui/material";
import { Main } from "./Pages/Main/Main";
import { OneCollection } from "./Pages/OneCollection/OneCollection";
import { Home } from "./Pages/Home/Home";
import { Collections } from "./Pages/Collections/Collections";
import { Add } from "./Pages/Add/Add";
import { Settings } from "./Pages/Settings/Settings";
import {ThemeProvider} from "@mui/material";
import { theme } from "./Utils/MuiTheme";
import { themeDark } from "./Utils/MuiTheme";
import { useSelector } from "react-redux";
import { OneItem } from "./Pages/OneItem/OneItem";
import { SocketProvider } from "./Contexts/SocketIo";
import Admin from "./Pages/Admin/Admin";
function App() {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://collectios.herokuapp.com/";
  const themeType = useSelector(state => state.theme.currentTheme);
  return (
    <ThemeProvider theme={themeType === "light" ? theme : themeDark}>
      <SocketProvider>
        {" "}
        <div className="App">
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<Home />} />
              <Route path="collection/:id" element={<OneCollection />} />
              <Route path="item/:id" element={<OneItem />} />
              <Route path="collection" element={<Collections />} />
              <Route path="add" element={<Add />} />
              <Route path="settings" element={<Settings />} />
              <Route path='admin' element={<Admin/> } />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </Routes>
        </div>
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
