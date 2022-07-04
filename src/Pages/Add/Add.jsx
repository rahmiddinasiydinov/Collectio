import { Container, Typography, Box, } from "@mui/material"
import { useState } from "react";
import './Add.scss';
import { AddItem } from "../../Components/AddItem";
import { AddCollection } from "../../Components/AddCollection";
import { useTranslation } from "react-i18next";
export const Add = () => {
  const [page, setPage] = useState(0);
  const {t} = useTranslation()
    return (
      <>
        <Container maxWidth="xl">
          <Box component={"div"}>
            <Typography
              component="span"
              color={"primary"}
              sx={{
                marginRight: "20px",
                fontSize: "20px",
                cursor: "pointer",
                transition: ".5s",
                ":hover": { color: "red" },
              }}
              onClick={() => setPage(0)}
              className={`add__menu ${!page ? "add__active" : ""}`}
            >
              {t("Collection")}
            </Typography>
            <Typography
              component="span"
              color={"primary"}
              sx={{
                fontSize: "20px",
                cursor: "pointer",
                ":hover": "primary.light",
                transition: ".5s",
                ":hover": { color: "red" },
              }}
              onClick={() => setPage(1)}
              className={`add__menu ${page ? "add__active" : ""}`}
            >
              {t("Item")}
            </Typography>
          </Box>
          {
            page?<AddItem/>:<AddCollection/>
          }
        </Container>
      </>
    );
}