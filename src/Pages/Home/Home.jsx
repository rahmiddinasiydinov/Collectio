import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomeSlide } from "../../Components/HomeSlide";
import { useTranslation } from "react-i18next";
export const Home = () => {
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);
  const { t } = useTranslation();
  useEffect(() => {
    axios.get("collection").then(res => {
      setCollection(res.data?.data)
    });
    axios.get("item").then(res => {
      setItems(res.data?.data)
    });
  }, []);
  return (
    <>
      <Container component={"div"} maxWidth="xl">
        <Box
          component={"div"}
          width="100%"
        >
          <Box
            component="div"
            width={'100%'}
          >
            {" "}
            <Typography
              component={"h2"}
              variant="h4"
              color={"primary"}
              marginBottom={'50px'}
            >
              {t("RecentCollections")}
            </Typography>
            <HomeSlide array={collection} type='collection'/>
          </Box>
          <Box
            component="div"
            width={'100%'}
          >
            {" "}
            <Typography
              component={"h2"}
              variant="h4"
              sx={{margin:'50px 0'}}
              color={"primary"}
            >
          {t("RecentItems")}
            </Typography>
            <HomeSlide array={items}  type='item'/>
          </Box>
        </Box>
      </Container>
    </>
  );
};
