import axios from "axios";
import { useEffect } from "react";
import "./Registration.scss";
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
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  TextField,
  FormControl,
  Button,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userActions } from "../../Redux/userSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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

export const Registration = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(0);
  const navigate = useNavigate();
  const currentLanguage = JSON.parse(window.localStorage.getItem("language")) || "uz";
  const [lang, setLang] = useState(currentLanguage);
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setLang(e.target.value);
    i18n.changeLanguage(e.target.value)
    window.localStorage.setItem("language", JSON.stringify(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, username, password, email } = e.target.elements;
    axios
      .post("register", {
        fullName: fullName.value,
        username: username.value,
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        console.log(res.data);
        setStatus(res.data?.status);
        setMessage(res.data?.message);
      if (res.data?.status === 200) {
        dispatch(userActions.setUser(res?.data.data));
        window.localStorage.setItem("user", JSON.stringify(res.data?.data));
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        dispatch(userActions.setUser(null));
        window.localStorage.setItem("user", JSON.stringify(null));
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
            paddingBottom: "30px",
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
              { t("Language")}
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
            }}
          >
            {t("Register")}
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
              id="fullname"
              name="fullName"
              label={`${t("FullName")}`}
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              id="email"
              name="email"
              label="email"
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              id="username"
              name="username"
              label={`${t("Username")}`}
              inputProps={{ minLength: 2 }}
              sx={{
                width: "100%",
                marginBottom: "20px",
              }}
            />
            <TextField
              required
              name="password"
              id="password"
              label={`${t("Username")}`}
              inputProps={{ minLength: 4 }}
              sx={{
                width: "100%",
                marginBottom: "5px",
              }}
            />
            <Typography
              component={"span"}
              color={status === 200 ? "success.main" : "warning.main"}
            >
              {message}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              sx={{ marginTop: "30px", fontSize: "18px" }}
            >
              {t("Submit")}
            </Button>
            <Box component={"div"} sx={{ marginTop: "20px" }}>
              <Typography
                color={"primary"}
                component={"span"}
                sx={{ marginRight: "10px" }}
              >
                {t("DoYouHaveAccount")}
              </Typography>
              <Link to="/login">
                {" "}
                <Typography
                  component={"span"}
                  sx={{ fontSize: "20px", fontWeight: "700" }}
                  color="primary.light"
                >
                  {t("Login")}
                </Typography>
              </Link>
            </Box>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};
