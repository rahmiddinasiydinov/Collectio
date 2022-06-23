import { Container, Typography, Box, FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { useState } from "react";
import "./Settings.scss";
export const Settings = () => {
  const [theme, setTheme] = useState('light');
  const handleTheme = (e) => {
    console.log(e.target.value);
    window.localStorage.setItem('theme', e.target.value)
    setTheme(e.target.value)
  }
  return (
    <>
      <Container maxWidth="xl">
        <Typography color={"primary"} variant="h4">
          Settings
        </Typography>
        <Box
          width={"100%"}
          component="div"
          sx={{ display: "flex", marginTop: "30px" }}
        >
          <Box width={"50%"}>
            <Typography variant="h6" color={"primary.light"}>
              App settings
            </Typography>
            <Box display={"flex"} alignItems="center" marginTop={"30px"}>
              <Typography
                color={"primary"}
                variant="h6"
                marginRight={"10px"}
                component={"label"}
              >
                Language:
              </Typography>
              <select className="settings__language" name="lang" id="">
                <option value="uz">🇺🇿 Uzbek</option>
                <option value="en">🇬🇧 English</option>
              </select>
            </Box>
            <Box display={"flex"} alignItems="center" marginTop={"30px"}>
              <Typography
                color={"primary"}
                variant="h6"
                marginRight={"10px"}
                component={"label"}
              >
                Theme:
              </Typography>
              <FormControl>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  className="settings__language"
                  color="primary"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={theme}
                  label="Age"
                  onChange={handleTheme}
                >
                  <MenuItem value={'light'}>Light</MenuItem>
                  <MenuItem value={'dark'}>Dark</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box width={"50%"}>
            <Typography variant="h6" color={"primary.light"}>
              Profile settings
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};
