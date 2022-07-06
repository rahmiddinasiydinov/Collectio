import "./OneCollection.scss";
import { Typography, Container, Box, List, ListItem, Avatar } from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { ItemCard } from "../../Components/ItemCard";
import { Markdown } from "../../Components/Markdown";
export const OneCollection = () => {
  const [collection, setCollection] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios.get(`one_collection?id=${id}`).then((res) => {
      console.log(res.data.data);
      setCollection(res.data?.data);
    });
  }, [id]);
  return (
    <div className="oneCollection">
      <Container
        className="oneCollection__wrapper"
        maxWidth="xl"
        sx={{ display: "flex", flexWrap: "wrap", marginBottom: "30px" }}
      >
        <Box
          className="oneCollection__left"
          width={"60%"}
          maxWidth={"100%"}
          padding={"10px"}
          marginTop="30px"
        >
          <Typography
            variant="h6"
            color={"primary.dark"}
            marginBottom="20px"
            component={"span"}
            display="flex"
            alignItems={"center"}
          >
            <Avatar sx={{ marginRight: "10px" }} src={collection?.user?.img}>
              {collection?.user?.fullName?.slice(0, 1)}
            </Avatar>{" "}
            {collection?.user?.fullName ||
              collection?.user?.username ||
              "Deleted account"}
          </Typography>
          <img
            width={"100%"}
            style={{ borderRadius: "10px" }}
            src={collection?.img}
            alt="collection_image"
          />
          <Typography
            variant="h4"
            display={"flex"}
            justifyContent="space-between"
            component={"h2"}
            marginTop="20px"
          >
            {collection?.name}
            <Typography component="span" marginLeft={"10px"}>
              {dateFormat(collection?.createdAt, "mmmm d, yyyy, h:MM TT")}
            </Typography>
          </Typography>

          <Typography variant="h6" marginTop={"20px"}>
            {collection?.isMarkdown ? <Markdown text={collection?.desc} /> : collection?.desc}
          </Typography>
        </Box>
        <Box
          className="oneCollection__right"
          sx={{
            marginTop: "30px",
            width: "40%",
            maxWidth: "100%",
            padding: "10px",
          }}
        >
          {" "}
          <Typography
            sx={{ textAlign: "center", width: "100%", marginBottom: "20px" }}
            variant="h5"
            component={"h3"}
          >
            Items of Collection
          </Typography>
          <List
            className="oneCollection__list"
            sx={{
              flexGrow: "1",
              overflow: "auto",
              height: "550px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid rgba",
            }}
          >
            {collection?.items?.length > 0 ? (
              collection?.items?.map((e) => {
                return (
                  <ListItem
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: "0",
                      marginBottom: "20px",
                    }}
                  >
                    <ItemCard img={e?.img} title={e?.title} id={e?._id} />
                  </ListItem>
                );
              })
            ) : (
              <Typography color="primary.dark" variant="h5">
                There is not any items in this Collection
              </Typography>
            )}
          </List>
        </Box>
      </Container>
    </div>
  );
};
