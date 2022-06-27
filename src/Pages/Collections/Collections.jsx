import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./Collections.scss";
import { CollectionList } from "../../Components/CollectionList";
export const Collections = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Typography component={"h2"} variant="h4" marginBottom={'50px'} color={"primary.dark"}>
          Collections
        </Typography>
        <CollectionList/>
      </Container>
    </>
  );
};
