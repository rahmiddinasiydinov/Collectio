import axios from "axios";
import { useEffect, useState } from "react";
import "./Login.scss";
import back1 from "../../Assets/Images/back1.jpg";
import back2 from "../../Assets/Images/back2.webp";
import back3 from "../../Assets/Images/back3.jpg";
import back4 from "../../Assets/Images/back4.jpg";
import back5 from "../../Assets/Images/back5.webp";
import back6 from "../../Assets/Images/back6.jpg";
import back7 from "../../Assets/Images/back7.jpg";
import back8 from "../../Assets/Images/back8.webp";
import back9 from "../../Assets/Images/back9.jpg";
import back10 from "../../Assets/Images/back10.jpg";
import {
  Typography,
  Container,
  TextField,
  FormControl,
  Button,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { languageStore } from "../../Utils/Language";
import { useDispatch } from "react-redux";
import { userActions } from "../../Redux/userSlice";
const arrImg = [
  back1,
  back2,
  back3,
  back4,
  back5,
  back6,
  back7,
  back8,
  back9,
  back10,
];
const random = Math.floor(Math.random() * 10);

export const Login = () => {
  const currentLanguage = JSON.parse(window.localStorage.getItem("language")) || "uz";
  const [lang, setLang] = useState(currentLanguage);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value)
    window.localStorage.setItem("language", JSON.stringify(e.target.value));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target.elements;
    axios
      .post("login", {
        username: username.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res.data);
        setStatus(res.data?.status);
        setMessage(res.data?.message);
        if (res.data?.status === 200) {
          dispatch(userActions.setUser(res?.data.data));
          window.localStorage.setItem('user', JSON.stringify(res.data?.data))
          setTimeout(() => {
            navigate("/");
          }, 1000);
        } else {
          dispatch(userActions.setUser(null));
          window.localStorage.setItem('user', JSON.stringify(null))
          
        }
      });
  };
  return (
    <div className="login__wrapper">
      <div
        className="login__img"
        style={{ backgroundImage: `url(${arrImg[random]})` }}
      >
        <div className="login__img--overflow"></div>
      </div>
      <div className="login__context">
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
            position: "relative",
          }}
        >
          <Button
            color="primary"
            sx={{ position: "absolute", left: "50px", top: "30px" }}
            variant="outlined"
          >
            <Link to="/">
              <Typography variant="h6">{ t("Home")}</Typography>
            </Link>{" "}
          </Button>
          <FormControl
            sx={{ position: "absolute", right: "50px", top: "30px" }}
          >
            <InputLabel id="demo-simple-select-label">
              {t("Language")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label={`${t("Username")}`}
              onChange={handleChange}
            >
              <MenuItem value={"uz"}>Uz</MenuItem>
              <MenuItem value={"en"}>En</MenuItem>
            </Select>
          </FormControl>
          <Typography
            variant="h2"
            color={"primary"}
            sx={{
              textAlign: "center",
              paddingTop: "200px",
              fontWeight: "500",
            }}
          >
            {t("Login")}
          </Typography>

          <FormControl
            component={"form"}
            fullWidth
            sx={{
              marginTop: "50px",
              paddingTop: "0",
              width: "400px",
              maxWidth: "100%",
            }}
            variant="filled"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              inputProps={{ minLength: 2 }}
              id="username"
              name="username"
              label={`${t("Username")}`}
              sx={{
                width: "100%",
                marginBottom: "50px",
              }}
            />
            <TextField
              required
              inputProps={{ minLength: 4 }}
              id="password"
              name="password"
              label={`${t('Password')}`}
              sx={{
                width: "100%",
                marginBottom: "5px",
              }}
            />
            <Typography
              component={"span"}
              color={status === 200 ? "success.main" : "error"}
            >
              {message}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "30px", fontSize: "18px" }}
            >
              {t('Submit')}
            </Button>
            <Box component={"div"} sx={{ marginTop: "20px" }}>
              <Typography
                color={"primary"}
                component={"span"}
                sx={{ marginRight: "10px" }}
              >
                {t('DoNotYouHaveAccount')}
              </Typography>
              <Link to="/registration">
                {" "}
                <Typography
                  component={"span"}
                  sx={{ fontSize: "20px", fontWeight: "700" }}
                  color="primary.light"
                >
                  {t("Register")}
                </Typography>
              </Link>
            </Box>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};
