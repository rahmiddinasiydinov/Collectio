import { Outlet } from "react-router";
import { Header } from "../../Components/Header";
import "./Main.scss";
import axios from "axios";
import {useDispatch} from 'react-redux'
import { userActions } from "../../Redux/userSlice";
import { useEffect } from "react";
import { MobileMenu } from "../../Components/MobileMenu";
import { ViewAs } from "../../Components/ViewAs";
export const Main = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem('user')) || null;
  dispatch(userActions.setUser(user));
  // useEffect(() => {
  //   axios.get("user").then(res => {
  //     dispatch(userActions.setUser(res.data?.user))
  //     dispatch(userActions.setAdmin(null));
  //     console.log(res);
  //     if (!res.data.user) {
  //       window.localStorage.removeItem('user')
  //     }
  //   });
  // }, [])
  return (
    <main className="main">
      <ViewAs/>
      <Header />
      <MobileMenu/>
      <Outlet />
    </main>
  );
};
