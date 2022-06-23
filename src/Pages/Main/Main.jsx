import { Outlet } from "react-router";
import { Header } from "../../Components/Header";
import "./Main.scss";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { userActions } from "../../Redux/userSlice";
import { useEffect } from "react";
export const Main = () => {
  const dispatch = useDispatch(); 
  useEffect(() => {
    axios.get("http://localhost:7007/user").then((res) => {
      dispatch(userActions.setUser(res.data?.user))
    });
  }, []);
  return (
    <main className="main">
      <Header />
      <Outlet />
    </main>
  );
};
