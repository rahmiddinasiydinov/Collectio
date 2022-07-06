import { Container, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import UserTable from "../../Components/Table";
import { userActions } from "../../Redux/userSlice";
import { useTranslation } from "react-i18next";


export default function Admin() {
  const [selected, setSelected] = useState([]);
  const [toggle, setToggle] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    if (!user || !user?.isAdmin) navigate("/");
  }, [user]);
  useEffect(() => {
    axios.get("users").then((res) => {
      console.log(res.data);
      setUsers(res.data?.data);
    });
  }, [toggle]);

  const handleAdmin = (adminId) => {
    axios
      .put(`admin/status?id=${adminId}`)
      .then((res) => {
        console.log(res.data);
        if (res?.data?.status === 200) {
          setUsers(res.data?.data);
        } else {
          dispatch(userActions.setUser(res.data?.data));
          window.localStorage.removeItem("user");
          alert(res.data?.message);
          navigate("/");
        }
      });
  };
  const handleUser = (userId) => {
    axios.put(`user/status?id=${userId}`).then((res) => {
      if (res?.data?.status === 200) {
        setUsers(res.data?.data);
      } else {
        dispatch(userActions.setUser(res.data?.data));
        window.localStorage.removeItem("user");
        alert(res.data?.message);
        navigate("/");
      }
    });
  };
  const handleDelete = () => {
    axios
      .delete(`user/delete?Ids=${selected}`)
      .then((res) => {
        console.log(res);
        if (res.data?.status === 200) {
          setToggle(!toggle);
        }
      });
  };
  const handleView = (userId) => {
    axios.get(`view_as?userId=${userId}`).then((res) => {
      if (res.data?.user && res.data?.admin) {
        dispatch(userActions.setAdmin(res.data.admin));
        dispatch(userActions.setUser(res.data.user));
        navigate('/');
      }
    });
  };
  return (
    <Container maxWidth="xl">
      <Typography
        variant="h5"
        component={"h2"}
        marginBottom="30px"
        color="primary.dark"
      >
        {t("WelcomeAdmin", { name: user?.fullName || user?.username })}
      </Typography>
      <UserTable
        handleAdmin={handleAdmin}
        handleUser={handleUser}
        users={users}
        handleDelete={handleDelete}
        selected={selected}
        setSelected={setSelected}
        handleView={handleView}
      />
    </Container>
  );
}
