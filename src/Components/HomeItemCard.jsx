import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import { Paper, Box } from "@mui/material";
import dateFormat from "dateformat";
import { Markdown } from "./Markdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));


export default function HomeItemCard({
  username,
  img,
  date,
  avatar,
  desc,
  topic,
  id,
  title,
  collection,
  isMarkdown,
}) {

  const theme = useSelector(state=>state?.theme?.currentTheme)
  return (
    <Card sx={{ width: "400px", maxWidth: "100%", borderRadius: "10px" }}>
      <Paper sx={{ padding: "10px", position: "relative" }}>
        <Box
          className="card__topic"
          sx={{
            position: "absolute",
            top: "30px",
            right: "0",
            backgroundColor: "#73777B",
            color: "#FFFFFF",
            padding: " 2px 5px",
          }}
          component={"span"}
        >
          {topic}
        </Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {avatar ? (
                <img width={"180%"} src={avatar} alt="img" />
              ) : (
                username?.slice(0, 1)
              )}
            </Avatar>
          }
          title={username || "Deleted account"}
          subheader={
            date
              ? dateFormat(date, " mmmm d, yyyy")
              : "Created date is not visible"
          }
        />
        <CardMedia
          component="img"
          height="250px"
          image={img}
          alt="Paella dish"
          sx={{ borderRadius: "10px" }}
        />
        <CardContent>
          <Typography
            variant="h6"
            color={"primary"}
            sx={{
              fontWeight: "700",
            }}
          >
            {title}
            <Typography component={"span"} display="block" fontSize="14px">
              {"belongs to " + collection}
            </Typography>
          </Typography>
          <Typography
            variant="p"
            display={"block"}
            marginTop={"10px"}
            height="150px"
            sx={{
              background:`linear-gradient(to bottom, ${theme==='light'?"#222":"#fff"}  1%, transparent)`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            color="text.secondary"
          >
            {isMarkdown ? <Markdown text={desc} /> : desc}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={`item/${id}`}>
            <Typography
              color={"primary"}
              component="span"
              sx={{ ":hover": { color: "primary.light" } }}
            >
              View more
            </Typography>
          </Link>

          <IconButton sx={{ marginLeft: "20px" }} aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Paper>
    </Card>
  );
}
