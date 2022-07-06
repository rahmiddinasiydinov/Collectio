import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import "./Collections.scss";
import { CollectionList } from "../../Components/CollectionList";
import { useTranslation } from "react-i18next";
import axios from "axios";
import FileDownload from 'js-file-download';
export const Collections = () => {
  const { t } = useTranslation();
  const handleDownload = () => {
    axios.get("collection_csv").then(res => {
      FileDownload(res?.data, 'collections.scv')
    });
  };
  return (
    <>
      <Container maxWidth="xl">
        <Box marginBottom={"50px"} display="flex" alignItems={"center"}>
          <Typography
            component={"h2"}
            variant="h4"
            color={"primary.dark"}
            marginRight="20px"
          >
            {t("Collection")}
          </Typography>
          <Button onClick={handleDownload} variant='contained'>Download all collections</Button>
        </Box>

        <CollectionList />
      </Container>
    </>
  );
};
