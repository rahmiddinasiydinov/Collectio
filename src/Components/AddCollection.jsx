import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  List,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardCollection } from "./CardCollection";
import { useTranslation } from "react-i18next";
import { Markdown } from "./Markdown";
import upload from "../Assets/Images/Upload.png";
import { Loader } from "./Loader";
export const AddCollection = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState("");
  const [collections, setCollections] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Please wait");
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  useEffect(() => {
    axios.get(`my_collections?id=${user?._id}`).then((res) => {
      setCollections(res.data?.data);
    });
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText("Creating new collection");
    const { name, topic, desc } = e.target.elements;
    console.log(name.value, topic, desc);
    const formData = new FormData();
    formData.append("img", file);
    formData.append("name", name.value);
    formData.append("desc", desc.value);
    formData.append("userId", user?._id);
    formData.append("topic", topic.value);
    formData.append("isMarkdown", isMarkdown);
    axios.post("collection", formData, config).then((res) => {
      console.log(res.data.data?.collections);
      setCollections([...res.data?.data?.collections]);
      setLoadingText("Created successfully!");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDelete = (id) => {
    setLoading(true);
    setLoadingText("Deleting is in progress");
    axios.delete(`collection?id=${id}`).then((res) => {
      console.log(res.data);
      setCollections(res.data?.data);
      setLoadingText("Deleted successfully!");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  };
  return (
    <>
      <Loader isLoading={loading} text={loadingText} />
      <Box width={"100%"} marginTop="20px">
        <Typography
          marginTop={"50px"}
          variant="h4"
          marginBottom={"20px"}
          color="primary"
        >
          {t("CreateCollection")}
        </Typography>
        <FormControl
          component={"form"}
          fullWidth
          className="add__form"
          sx={{
            marginTop: "30px",
            paddingTop: "0",
            width: "100%",
            maxWidth: "100%",
          }}
          variant="filled"
          onSubmit={handleSubmit}
        >
          <Box
            sx={{
              width: "1000px",
              maxWidth: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ width: "500px", maxWidth: "100%" }}>
              {" "}
              <TextField
                className="add__input"
                id="standard-text-input"
                label={t("TitleForCollection")}
                InputProps={{ minLength: "2" }}
                type="text"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                required
                name="name"
                sx={{ width: "100%" }}
              />
              <TextField
                className="add__input"
                id="standard-text-input"
                label={t("Topic")}
                InputProps={{ minLength: "2" }}
                type="text"
                name="topic"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                required
                sx={{ width: "100%", marginTop: "20px" }}
              />
              <Box marginTop={"30px"}>
                <img
                  width={"100%"}
                  className="upload-img"
                  src={file ? URL.createObjectURL(file) : upload}
                  alt="upload img"
                />
              </Box>
              <Button
                variant="contained"
                sx={{
                  display: "block",
                  marginTop: "50px",
                  textAlign: "center",
                  width: "100%",
                }}
                component="label"
                className={`${file?.name?.length > 3 ? "add__uploaded" : ""}`}
                color="secondary"
              >
                {file?.name?.length > 3
                  ? t("Uploadedsuccessfully")
                  : t("OneImage")}
                <input
                  type="file"
                  name="img"
                  hidden
                  required
                  onChange={handleChange}
                />
              </Button>
            </Box>
            <Box
              className="add__right"
              sx={{
                width: "400px",
                maxWidth: "100%",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isMarkdown}
                      onChange={() => {
                        setIsMarkdown(!isMarkdown);
                      }}
                    />
                  }
                  label="Support Markdown"
                />
              </FormGroup>
              <TextField
                id="outlined-multiline-flexible"
                required
                label={t("Description")}
                multiline
                sx={{ width: "100%", maxWidth: "100%" }}
                name="desc"
                onChange={(e) => {
                  setMarkdown(e.target.value);
                }}
              />
              <Typography
                sx={{
                  display: isMarkdown ? "block" : "none",
                  marginTop: "10px",
                  padding: "10px",
                  border: "1px solid #999999",
                  borderRadius: "5px",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <Markdown text={markdown} />
              </Typography>
              <Button
                type="submit"
                sx={{
                  display: "block",
                  marginTop: "20px",
                  width: "100%",
                  maxWidth: "100%",
                }}
                color="primary"
                variant="contained"
              >
                {t("Create")}
              </Button>
            </Box>
          </Box>
        </FormControl>
        <Typography
          component={"h4"}
          variant="h4"
          color="primary"
          marginTop={"50px"}
        >
          {" "}
          {t("MyCollections")}
        </Typography>
        <List
          component={"ul"}
          sx={{
            display: "flex",
            marginTop: "20px",
            flexWrap: "wrap",
            justifyContent: window.innerWidth > 500 ? `flex-start` : "center",
          }}
        >
          {collections?.length > 0 ? (
            collections.map((e, i) => {
              return (
                <CardCollection
                  key={i}
                  desc={e?.desc}
                  img={e?.img}
                  name={e?.name}
                  id={e?._id}
                  isMarkdown={e?.isMarkdown}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : (
            <Typography color={"secondary"} variant="h5">
              {t("YouDoNotHaveCollection")}
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};
