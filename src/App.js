import { Routes, Route } from "react-router";
import "./App.scss";
import { Login } from "./Pages/Login/Login";
import { Registration } from "./Pages/Registration/Registration";
import axios from "axios";
import { CssBaseline } from "@mui/material";
import { Main } from "./Pages/Main/Main";
import { Personal } from "./Pages/Personal/Personal";
import { Home } from "./Pages/Home/Home";
import { Collections } from "./Pages/Collections/Collections";
import { Add } from "./Pages/Add/Add";
import { Settings } from "./Pages/Settings/Settings";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="home" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Personal />} />
          <Route path="collection" element={<Collections />} />
          <Route path="add" element={<Add />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
