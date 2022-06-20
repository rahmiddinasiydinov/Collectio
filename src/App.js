import { Routes, Route } from "react-router";
import "./App.scss";
import { Login } from "./Pages/Login/Login";
import { Registration } from "./Pages/Registration/Registration";
import axios from "axios";
import { CssBaseline } from "@mui/material";
import { Main } from "./Pages/Main/Main";
import { Personal } from "./Pages/Personal/Personal";
function App() {
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="home" element={<Main />}>
          <Route path='profile' element={<Personal/> } />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="registration" element={<Registration />} />
      </Routes>
    </div>
  );
}

export default App;
