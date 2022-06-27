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
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardCollection } from "./CardCollection";

export const AddItem = () => {
  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState("");
  const [items, setItems] = useState(null);
  const [tags, setTags] = useState(null);
  const [collections, setCollections] = useState(null);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
    useEffect(() => {
      axios
        .get(`http://localhost:7007/my_items?id=${user?._id}`)
        .then((res) => {
          setItems(res.data?.data);
        });
    }, [user]);

  useEffect(() => {
    axios.get("http://localhost:7007/tags").then((res) => {
      console.log(res.data.data);
      setTags(res.data.data);
    });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:7007/my_collections?id=${user._id}`)
      .then((res) => {
        console.log(res?.data?.data);
        setCollections(res?.data?.data);
      });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, tag, desc, collection } = e.target.elements;
    console.log(name.value, tag.value, desc.value, collection.value);
    const formData = new FormData();
    formData.append("img", file);
    formData.append("title", name.value);
    formData.append("desc", desc.value);
    formData.append("userId", user?._id);
    formData.append("tag", tag.value);
    formData.append("collection", collection.value);
    axios.post("http://localhost:7007/item", formData, config).then((res) => {
      setItems([...res.data?.data?.items]);
    });
  };
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  return (
    <>
      <Box width={"100%"} marginTop="20px">
        <Typography
          marginTop={"50px"}
          variant="h4"
          marginBottom={"20px"}
          color="primary"
        >
          Create new Item
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
            <Box sx={{ width: "400px", maxWidth: "100%" }}>
              {" "}
              <TextField
                className="add__input"
                id="standard-text-input"
                label="Name of Item"
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
                  Choose Collection
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
                    <em>None</em>
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
                  Choose a tag
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  name="tag"
                  label="Choose a tag"
                  required
                >
                  <MenuItem value="">
                    <em>None</em>
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
                  ? "Uploaded successfully"
                  : "Upload only one image *"}
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
              <TextField
                id="outlined-multiline-flexible"
                required
                label="Description"
                multiline
                rows={4}
                sx={{ width: "100%", maxWidth: "100%" }}
                name="desc"
              />
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
                Submit
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
          My Items
        </Typography>
        <List
          component={"ul"}
          sx={{
            display: "flex",
            marginTop: "20px",
            flexWrap: "wrap",
            justifyContent: window.innerWidth> 500 ? `flex-start` : "center",
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
                />
              );
            })
          ) : (
            <Typography color={"secondary"} variant="h5">
              You do not have any items yet
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};
