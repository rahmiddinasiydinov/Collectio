import {
  Container,
  Typography,
  Box,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Button,
  Avatar,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../../Redux/theme";
import { userActions } from "../../Redux/userSlice";
import "./Settings.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { grey } from "@mui/material/colors";

export const Settings = () => {
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") || "light"
  );
  const [img, setImg] = useState(null);
  const [language, setLanguage] = useState(
    JSON.parse(window.localStorage.getItem("language")) || "uz"
  );
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const handleTheme = (e) => {
    console.log(e.target.value);
    window.localStorage.setItem("theme", e.target.value);
    dispatch(themeActions.setTheme(e.target.value));
    setTheme(e.target.value);
  };
  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
    window.localStorage.setItem("language", JSON.stringify(e.target.value));
    setLanguage(e.target.value);
  };
  const handleLogout = () => {
    if (user) {
      axios.get("logout").then((res) => console.log(res));
      dispatch(userActions.setUser(null));
      window.localStorage.removeItem("user");
    } else {
      navigate("/login");
    }
  };

  const handleImage = async (e) => {
    const img = e.target.files[0];
    if (user && img) {
      const formData = new FormData();
      formData.append("img", img);
      axios
        .post("profile", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.data?.data) {
            dispatch(userActions.setUser(res.data?.data));
            window.localStorage.setItem("user", JSON.stringify(res.data?.data));
          }
        });
    }
  };
  return (
    <>
      <Container maxWidth="xl">
        <Typography color={"primary"} variant="h4">
          {t("Settings")}
        </Typography>
        <Box
          width={"100%"}
          component="div"
          sx={{ display: "flex", marginTop: "30px", flexWrap: "wrap" }}
        >
          <Box
            sx={{
              width: "500px",
              maxWidth: "100%",
              marginTop: "20px",
              marginRight: "10px",
            }}
          >
            <Typography variant="h5" color={"primary.light"}>
              {t("AppSettings")}
            </Typography>
            <Box display={"flex"} alignItems="center" marginTop={"30px"}>
              <Typography
                color={"primary"}
                variant="h6"
                marginRight={"10px"}
                component={"label"}
              >
                {t("Language")}:
              </Typography>
              <FormControl className="settings__select">
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  className="settings__language"
                  color="primary"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={language}
                  label="Age"
                  onChange={handleLanguage}
                  variant="standard"
                  sx={{}}
                >
                  <MenuItem value={"uz"}>Uzbek</MenuItem>
                  <MenuItem value={"en"}>English</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box display={"flex"} alignItems="center" marginTop={"30px"}>
              <Typography
                color={"primary"}
                variant="h6"
                marginRight={"10px"}
                component={"label"}
              >
                {t("Theme")}:
              </Typography>
              <FormControl className="settings__select">
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  className="settings__language"
                  color="primary"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={theme}
                  label="Age"
                  onChange={handleTheme}
                  variant="standard"
                  sx={{}}
                >
                  <MenuItem value={"light"}>{t("Light")}</MenuItem>
                  <MenuItem value={"dark"}>{t("Dark")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ width: "500px", maxWidth: "100%", marginTop: "20px" }}>
            <Typography variant="h5" color={"primary.light"}>
              {t("ProfileSettings")}
            </Typography>
            <Box marginTop={"30px"}>
              {/* <Button variant="contained" size="medium" color="error"  sx={{marginRight:'20px'}}>
                {t("DeleteAccount")}
              </Button> */}
              {user && (
                <Typography
                  sx={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Avatar
                    sx={{
                      marginRight: "10px",
                      bgcolor: grey[500],
                      height: 100,
                      width: 100,
                      marginRight: "10px",
                    }}
                    src={user?.img}
                  ></Avatar>
                  <Button component="label">
                    {user?.img ? "Change profile image" : "Upload image"}
                    <input
                      type="file"
                      name="img"
                      hidden
                      required
                      onChange={handleImage}
                    />
                  </Button>
                </Typography>
              )}
              <Button
                onClick={handleLogout}
                variant="contained"
                size="medium"
                color={user ? "warning" : "success"}
              >
                {user ? t("Logout") : t("Login")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
