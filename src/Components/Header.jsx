import { Link } from "react-router-dom";
import "./Component.scss";
import { Container, Typography, Box, List, ListItem , Button, Avatar} from "@mui/material";
import { useState } from "react";
import { deepOrange } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import Search from "./Search";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { MenuActions } from "../Redux/mobileMenuSlice";

export const Header = () => {
  const [height, setHeight] = useState(0);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  window.addEventListener("scroll", () => {
    setHeight(window.scrollY);
  });
  const theme = useSelector(state => state.theme.currentTheme);
  const handleMenu = () => {
    dispatch(MenuActions.toggleMenu(true))
  }
  return (
    <header
      className={`header ${
        height > 2 && theme === "light"
          ? "header__scroll"
          : height > 2
          ? "header__scroll--dark"
          : ""
      }`}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button onClick={handleMenu} className="header__burger" color="primary">
          <MenuRoundedIcon fontSize="large" />
        </Button>
        <Typography
          sx={{
            fontFamily: '"Dancing Script", cursive;',
            fontSize: "40px",
            marginRight: "20px",
          }}
          className="header__logo"
        >
          Collectio
        </Typography>
        <Search />

        <List
          sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <ListItem className="header__item">
            <Link to="/">
              <HomeRoundedIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          <ListItem className="header__item">
            <Link to="collection">
              <CollectionsIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          {user && (
            <ListItem className="header__item">
              <Link to="add">
                <AddBoxIcon color="primary" fontSize="large" />
              </Link>
            </ListItem>
          )}
          <ListItem className="header__item">
            <Link to="settings">
              <SettingsIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          {user?.isAdmin ? (
            <ListItem className="header__item">
              <Link to="admin">
                <AdminPanelSettingsIcon color="primary" fontSize="large" />
              </Link>
            </ListItem>
          ) : (
            ""
          )}
          {!user ? (
            <ListItem className="header__item">
              <Link to="/login">
                <LoginRoundedIcon color="primary" fontSize="large" />
              </Link>
            </ListItem>
          ) : (
            ""
          )}
          {user && (
            <Avatar
              className="header__avatar"
              sx={{ bgcolor: deepOrange[500] }}
              src={user?.img}
            >
              {user?.fullName.slice(0, 1) || user?.username.slice(0, 1)}
            </Avatar>
          )}
          <ListItem className="header__item">
            {" "}
            {user ? (
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                  justifyContent: "center",
                  // flexDirection: "column",
                }}
              >
                <Avatar sx={{ bgcolor: deepOrange[500] }} src={user?.img}>
                  {user?.fullName.slice(0, 1) || user?.username.slice(0, 1)}
                </Avatar>
                <Box component={"div"}>
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{
                      marginTop: "5px",
                      fontSize: "13px",
                      fontWeight: "700",
                      marginLeft: "10px",
                    }}
                  >
                    {user?.fullName || user?.username}
                  </Typography>
                </Box>
              </Box>
            ) : (
              ""
            )}
          </ListItem>
        </List>
      </Container>
    </header>
  );
};
