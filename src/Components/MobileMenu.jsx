import { Box, List, ListItem, Paper, Avatar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { NavLink } from "react-router-dom";
import './Component.scss';
import { MenuActions } from "../Redux/mobileMenuSlice";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
export const MobileMenu = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const wrapper = useRef();
  const menu = useRef();
  const { t } = useTranslation();
  const isOpen = useSelector(state => state?.menu?.isOpen);
  const handleMenu = () => {
    dispatch(MenuActions.toggleMenu(false))
  }
  const handleClick =(e) => {
    const id = e.target?.dataset?.id;
    if (id === 'wrapper') {
      dispatch(MenuActions.toggleMenu(false));
  }
  }
  useEffect(() => {
    if (isOpen) {
      wrapper.current?.classList.add('mobile__active');
      setTimeout(() => {
        wrapper.current?.classList.add('mobile__wrapper--active');
        menu.current?.classList.add('mobile__menu--active');
      }, 10)
    } else {
      wrapper.current?.classList.remove("mobile__wrapper--active");
      menu.current?.classList.remove("mobile__menu--active");
      setTimeout(() => {
         wrapper.current?.classList.remove("mobile__active");
       }, 500);
    }
  }, [isOpen])
  return (
    <Box
      className="mobile__wrapper"
      onClick={handleClick}
      ref={wrapper}
      data-id="wrapper"
      sx={{
        transition: ".5s",
        position: "fixed",
        width: "100vw",
        height: "100%",
        top: "0",
        zIndex: "100",
        display: "none",
      }}
    >
      <Box
        ref={menu}
        className="mobile__menu"
        sx={{
          position: "absolute",
          width: "50%",
          top: "0",
          left: "0",
          height: "100%",
          zIndex: "101",
        }}
      >
        <Paper
          sx={{
            height: "100%",
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            paddingTop: "5x",
          }}
        >
          <Button
            onClick={handleMenu}
            sx={{
              position: "absolute",
              top: "10px",
              right: "0px",
              zIndex: "102",
            }}
          >
            <CloseIcon />
          </Button>
          <List className="mobile__list">
            <ListItem>
              <Typography
                sx={{
                  fontFamily: '"Dancing Script", cursive;',
                  fontSize: "30px",
                  marginRight: "20px",
                }}
                className="header__logo mobile__logo"
              >
                Collectio
              </Typography>
            </ListItem>
            {!user && (
              <ListItem>
                <NavLink to="/login" className="mobile__link">
                  <LoginRoundedIcon color="inherit" fontSize="medium" />
                  <Typography component={"span"} variant="h6" marginLeft="5px">
                    {t("Login")}
                  </Typography>
                </NavLink>
              </ListItem>
            )}
            {user && (
              <ListItem>
                <Avatar src={user?.img} sx={{ bgcolor: deepOrange[500] }}>
                  {user?.username.slice(0, 1)}
                </Avatar>
                <Typography marginLeft={"14px"} variant="h6">
                  {user?.username}
                </Typography>
              </ListItem>
            )}
            <ListItem>
              <NavLink to="/" className="mobile__link">
                <HomeRoundedIcon color="inherit" fontSize="medium" />
                <Typography component={"span"} variant="h6" marginLeft="5px">
                  {t("Home")}
                </Typography>
              </NavLink>
            </ListItem>
            <ListItem>
              <NavLink to="collection" className="mobile__link">
                <CollectionsIcon color="inherit" fontSize="medium" />
                <Typography component={"span"} variant="h6" marginLeft="5px">
                  {t("Collection")}
                </Typography>
              </NavLink>
            </ListItem>
            {user && (
              <ListItem>
                <NavLink to="add" className="mobile__link">
                  <AddBoxIcon color="inherit" fontSize="medium" />
                  <Typography component={"span"} variant="h6" marginLeft="5px">
                    {t("Create")}
                  </Typography>
                </NavLink>
              </ListItem>
            )}
            {user?.isAdmin && (
              <ListItem>
                <NavLink to="admin" className="mobile__link">
                  <AdminPanelSettingsIcon color="inherit" fontSize="medium" />
                  <Typography component={"span"} variant="h6" marginLeft="5px">
                    Admin
                  </Typography>
                </NavLink>
              </ListItem>
            )}
            <ListItem>
              <NavLink to="settings" className="mobile__link">
                <SettingsIcon color="inherit" fontSize="medium" />
                <Typography component={"span"} variant="h6" marginLeft="5px">
                  {t("Settings")}
                </Typography>
              </NavLink>
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Box>
  );
};
