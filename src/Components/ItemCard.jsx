import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ItemCard = ({ img, title, id}) => {
  return (
    <Link
      to={`/item/${id}`}
      style={{
        position: "relative",
        width: "400px",
        maxWidth: "100%",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <img width={"100%"} src={img} alt="" />
      <Typography
        component={"h4"}
        variant="h5"
        padding={"10px 15px"}
        sx={{
          backgroundColor: "rgba(0, 0, 0, .5)",
          position: "absolute",
          bottom: "0",
          width: "100%",
        }}
        color="white"
      >
        {title}
      </Typography>
    </Link>
  );
};
