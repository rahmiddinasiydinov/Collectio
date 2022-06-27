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
import { useEffect, useState } from "react";
import { theme } from "./Utils/MuiTheme";
import { themeDark } from "./Utils/MuiTheme";
import { themeActions } from "./Redux/theme";
import { useSelector } from "react-redux";
function App() {
  axios.defaults.withCredentials = true;
  const themeType = useSelector(state => state.theme.currentTheme);
  console.log(themeType);
  return (
      <ThemeProvider theme={themeType==='light'? theme:themeDark}>
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="home" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="collection/:id" element={<OneCollection />} />
          <Route path="collection" element={<Collections />} />
          <Route path="add" element={<Add />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
      </div>
      </ThemeProvider>
  );
}

export default App;
