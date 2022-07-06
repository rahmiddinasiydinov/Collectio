import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import { CardMedia } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const CollectionList = () => {
  const [columns, setColumn] = useState(
    window.innerWidth > 1000
      ? 4
      : window.innerWidth > 700
      ? 3
      : window.innerWidth > 550
      ? 2
      : 1
  );
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    axios.get("collection_all").then((res) => {
      setCollections(res.data?.data);
    });
  }, []);

  window.addEventListener("resize", () => {
    setColumn(
      window.innerWidth > 1000
        ?4
        :3
    );
  });
  return (
    <ImageList sx={{ width: "100%" }}>
      {collections?.map((item) => (
        <ImageListItem key={item?._id}>
          <CardMedia
            component="img"
            alt="green iguana"
            // height="140"
            image={item?.img}
            // srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            loading="lazy"
            // width={`${100 / columns - 1}%`}
          />
          {/* <img
            src={`${item?.img}?w=248&fit=crop&auto=format`}
            alt={item?.name}
            security={false}
          /> */}
          <ImageListItemBar
            title={item?.name}
            subtitle={item?.user?.fullName}
            actionIcon={
              <IconButton
                sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                aria-label={`info about ${item?.name}`}
              >
                <Link to={`${item?._id}`}>
                  <InfoIcon />
                </Link>
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
