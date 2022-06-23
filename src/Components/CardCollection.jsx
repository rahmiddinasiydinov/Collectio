import { Card, CardMedia, CardContent,Typography, Button, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

export const CardCollection = ({img, name, id,desc}) => {
    return (
      <Card sx={{ maxWidth: 345, marginLeft:'20px', marginTop:'20px' }}>
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
            {desc}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            {" "}
            <Link to={`/home/collection/${id}`}>Learn more</Link>
          </Button>
        </CardActions>
      </Card>
    );
}