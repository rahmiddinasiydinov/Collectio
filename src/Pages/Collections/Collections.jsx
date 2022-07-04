import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./Collections.scss";
import { CollectionList } from "../../Components/CollectionList";
import { useTranslation } from "react-i18next";
export const Collections = () => {
  const {t} = useTranslation()
  return (
    <>
      <Container maxWidth="xl">
        <Typography component={"h2"} variant="h4" marginBottom={'50px'} color={"primary.dark"}>
          {t("Collection")}
        </Typography>
        <CollectionList/>
      </Container>
    </>
  );
};
