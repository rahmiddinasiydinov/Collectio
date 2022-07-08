import { Card, CardMedia, CardContent,Typography, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { Markdown } from "./Markdown";
export const CardCollection = ({img, name, id,desc, type, isMarkdown, handleDelete}) => {
    return (
      <Card
        sx={{
          width: "300px",
          maxWidth: "100%",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          height="140"
          image={img}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isMarkdown ? <Markdown text={desc} /> : desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            {" "}
            <Link to={type === "item" ? `/item/${id}` : `/collection/${id}`}>
              Learn more
            </Link>
          </Button>
            <Button onClick={() => {
              handleDelete(id)
            }} marginLeft="10px" size="small">
                Delete 
            </Button>
        </CardActions>
      </Card>
    );
}