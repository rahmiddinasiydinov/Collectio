import { Container, Typography, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomeSlide } from "../../Components/HomeSlide";

export const Home = () => {
  const [collection, setCollection] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7007/collection").then(res => {
      console.log(res.data?.data);
      setCollection(res.data?.data)
    });
    axios.get("http://localhost:7007/item").then(res => {
      console.log(res.data?.data);
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
              Recent collections
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
              Recent items
            </Typography>
            <HomeSlide array={items}  type='item'/>
          </Box>
        </Box>
      </Container>
    </>
  );
};
