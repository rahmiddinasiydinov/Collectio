import { Link } from "react-router-dom";
import "./Component.scss";
import { Container, Typography, Box, List, ListItem } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import CollectionsIcon from "@mui/icons-material/Collections";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import SettingsIcon from "@mui/icons-material/Settings";
export const Header = () => {
  const [height, setHeight] = useState(0);
  const user = useSelector((state) => state.user.user);
  window.addEventListener("scroll", () => {
    setHeight(window.scrollY);
  });
  return (
    <header className={`header ${height > 2 ? "header__scroll" : ""}`}>
      <Container
        maxWidth="xl"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <span className="header__logo">Collectio</span>
        <List sx={{ display: "flex", alignItems: "center" }}>
          <ListItem>
            <Link to="/home">
              <HomeRoundedIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          <ListItem>
            <Link to="collection">
              <CollectionsIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          {user && (
            <ListItem>
              <Link to="add">
                <AddBoxIcon color="primary" fontSize="large" />
              </Link>
            </ListItem>
          )}
          <ListItem>
            <Link to="settings">
              <SettingsIcon color="primary" fontSize="large" />
            </Link>
          </ListItem>
          {!user ? (
            <ListItem>
              <Link to="/login">
                <LoginRoundedIcon color="primary" fontSize="large" />
              </Link>
            </ListItem>
          ) : (
            ""
          )}
          <ListItem>
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
                <Typography
                  className="header__img--wrapper"
                  sx={{ border: "2px solid" }}
                  component={"h2"}
                  color="primary.dark"
                >
                  {user?.img ? (
                    <img src={user?.img} alt="user" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="header__img--icon"
                    />
                  )}
                </Typography>
                <Box component={"div"}>
                  <Typography
                    variant="h6"
                    color="primary.dark"
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
