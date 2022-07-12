import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  List,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel, 
  FormGroup,
  Checkbox
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardCollection } from "./CardCollection";
import { useTranslation } from "react-i18next";
import { Markdown } from "./Markdown";
import upload from '../Assets/Images/Upload.png'
import { Loader } from "./Loader";
export const AddItem = () => {
  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState("");
  const [items, setItems] = useState(null);
  const [tags, setTags] = useState(null);
  const [collections, setCollections] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [isMarkdown, setIsMarkdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Please wait");
  const { t } = useTranslation();
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
    useEffect(() => {
      axios
        .get(`my_items?id=${user?._id}`)
        .then((res) => {
          console.log(res.data.data);
          setItems(res.data?.data);
        });
    }, [user]);

  useEffect(() => {
    axios.get("tags").then((res) => {
      console.log(res.data.data);
      setTags(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`my_collections?id=${user._id}`)
      .then((res) => {
        console.log(res?.data?.data);
        setCollections(res?.data?.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText("Creating new item");
    const { name, tag, desc, collection } = e.target.elements;
    console.log(name.value, tag.value, desc.value, collection.value);
    const formData = new FormData();
    formData.append("img", file);
    formData.append("title", name.value);
    formData.append("desc", desc.value);
    formData.append("userId", user?._id);
    formData.append("tag", tag.value);
    formData.append("collection", collection.value);
    formData.append("isMarkdown", isMarkdown);
    axios.post("item", formData, config).then((res) => {
      console.log(res);
      setItems([...res.data?.data?.items]);
      setLoadingText("Created successfully!");
      setTimeout(() => {
        setLoading(false);
      }, 1000)
    });
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDelete = (id) => {
    console.log(id);
      setLoading(true);
      setLoadingText("Deleting is in progress");
    axios.delete(`item?id=${id}`).then(res => {
      console.log(res.data, 123);
      if (res.data?.status === 200) {
        setItems(res?.data?.data);
        setLoadingText("Deleted successfully!");
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        
      }
    })
   } 
  return (
    <>
      <Loader isLoading={loading} text={ loadingText} />
      <Box width={"100%"} marginTop="20px">
        <Typography
          marginTop={"50px"}
          variant="h4"
          marginBottom={"20px"}
          color="primary"
        >
          {t("CreateItem")}
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
                label={t("TitleForItem")}
                InputProps={{ minLength: "2" }}
                type="text"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                required
                name="name"
                sx={{ width: "100%" }}
              />
              <FormControl sx={{ marginTop: "20px", width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  {t("ChooseCollection")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="collection"
                  autoWidth
                  required
                  label="Choose Collection"
                >
                  <MenuItem value="">
                    <em>{t("None")}</em>
                  </MenuItem>

                  {collections &&
                    collections?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?._id}>
                          {e?.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl sx={{ marginTop: "20px", width: "100%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  {t("ChooseTag")}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="tag"
                  label="Choose a tag"
                  required
                >
                  <MenuItem value="">
                    <em>{t("None")}</em>
                  </MenuItem>

                  {tags &&
                    tags?.map((e, i) => {
                      return (
                        <MenuItem key={i} value={e?._id}>
                          {e?.title}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
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
                  marginTop: "30px",
                  textAlign: "center",
                  width: "100%",
                }}
                component="label"
                className={`${file?.name?.length > 3 ? "add__uploaded" : ""}`}
                color="secondary"
              >
                {file?.name?.length > 3
                  ? t("UploadedSuccessfully")
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
                onChange={(e) => {
                  setMarkdown(e.target.value);
                }}
                sx={{ width: "100%", maxWidth: "100%" }}
                name="desc"
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
          {t("MyItems")}
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
          {items?.length > 0 ? (
            items.map((e, i) => {
              return (
                <CardCollection
                  key={i}
                  desc={e?.desc}
                  img={e?.img}
                  name={e?.title}
                  id={e?._id}
                  type="item"
                  isMarkdown={e?.isMarkdown}
                  handleDelete={handleDelete}
                />
              );
            })
          ) : (
            <Typography color={"secondary"} variant="h5">
              {t("YouDoNotHaveItem")}
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};
