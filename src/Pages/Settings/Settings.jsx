import { Container, Typography, Box, FormControl, MenuItem, Select, InputLabel, Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { themeActions } from "../../Redux/theme";
import { languageActions } from "../../Redux/languageSlice";
import { userActions } from "../../Redux/userSlice";
import "./Settings.scss";
import axios from "axios";
import { useTranslation } from "react-i18next";
export const Settings = () => {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(
    JSON.parse(window.localStorage.getItem("language")) || "uz"
  );
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const handleTheme = (e) => {
    console.log(e.target.value);
    window.localStorage.setItem('theme', e.target.value);
    dispatch(themeActions.setTheme(e.target.value));
    setTheme(e.target.value)
  }
  const handleLanguage = (e) => {
    i18n.changeLanguage(e.target.value)
    window.localStorage.setItem('language',JSON.stringify(e.target.value));
    setLanguage(e.target.value);
  }
  const handleLogout = () => {
    axios.get("http://localhost:7007/logout").then(res => console.log(res));
    dispatch(userActions.setUser(null));
    window.localStorage.removeItem('user');
  }
  return (
    <>
      <Container maxWidth="xl">
        <Typography color={"primary"} variant="h4">
          {t("Settings")}
        </Typography>
        <Box
          width={"100%"}
          component="div"
          sx={{ display: "flex", marginTop: "30px", flexWrap:'wrap' }}
        >
          <Box sx={{width:'500px', maxWidth:'100%', marginTop:'20px' , marginRight:'10px'}}>
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
                  <MenuItem value={"light"}>{ t("Light")}</MenuItem>
                  <MenuItem value={"dark"}>{ t("Dark")}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{width:'500px', maxWidth:'100%', marginTop:'20px' }}>
            <Typography variant="h5" color={"primary.light"}>
              {t("ProfileSettings")}
            </Typography>
            <Box marginTop={'30px'}>
              <Button variant="contained" size="medium" color="error"  sx={{marginRight:'20px'}}>
                {t("DeleteAccount")}
              </Button>
              <Button onClick={handleLogout} variant="contained" size="medium" color="warning">
                {t("Logout")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
