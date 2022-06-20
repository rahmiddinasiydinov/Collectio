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
import { languageStore } from "../../Utils/Language";
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
  const[message, setMessage] = useState('');
  const [status, setStatus] = useState(0);
  const currentLanguage =
    JSON.parse(window.localStorage.getItem("language")) || "uz";
  const [lang, setLang] = useState(currentLanguage);
  const handleChange = (e) => {
    setLang(e.target.value);
  };

  useEffect(() => {
    window.localStorage.setItem("language", JSON.stringify(lang));
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, username, password, email } = e.target.elements;
    axios.post("http://localhost:7007/register", { fullName: fullName.value, username: username.value, email: email.value, password: password.value }).then(res => {
      console.log(res.data);
      setStatus(res.data?.status);
      setMessage(res.data?.message);
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
          }}
        >
          <FormControl
            sx={{ position: "absolute", right: "50px", top: "30px" }}
          >
            <InputLabel id="demo-simple-select-label">
              {languageStore[lang]?.language}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={lang}
              label={`${languageStore[lang]?.auth.username}`}
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
            {languageStore[lang]?.auth.register}
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
              label={`${languageStore[lang]?.auth.fullName}`}
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
              label={`${languageStore[lang]?.auth.username}`}
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
              label={`${languageStore[lang]?.auth.password}`}
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
              {languageStore[lang]?.auth.submit}
            </Button>
            <Box component={"div"} sx={{ marginTop: "20px" }}>
              <Typography
                color={"primary"}
                component={"span"}
                sx={{ marginRight: "10px" }}
              >
                {languageStore[lang]?.auth.haveAccount}
              </Typography>
              <Link to="/login">
                {" "}
                <Typography
                  component={"span"}
                  sx={{ fontSize: "20px", fontWeight: "700", color: "#4a148c" }}
                >
                  {languageStore[lang]?.auth.login}
                </Typography>
              </Link>
            </Box>
          </FormControl>
        </Container>
      </div>
    </div>
  );
};