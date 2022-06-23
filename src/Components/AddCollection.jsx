import { Label } from "@mui/icons-material";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { color } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CardCollection } from "./CardCollection";

export const AddCollection = () => {
  const user = useSelector((state) => state.user.user);
  const [file, setFile] = useState("");
  const [collections, setCollections] = useState(null);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  useEffect(() => {
    axios
      .get(`http://localhost:7007/my_collections?id=${user?._id}`)
      .then((res) => {
        setCollections(res.data?.data);
      });
  }, [user]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, topic, desc } = e.target.elements;
    console.log(name.value, topic, desc);
    const formData = new FormData();
    formData.append("img", file);
    formData.append("name", name.value);
    formData.append("desc", desc.value);
    formData.append("userId", user?._id);
    formData.append("topic", topic.value);
    axios
      .post("http://localhost:7007/collection", formData, config)
      .then((res) => {
        console.log(res.data.data?.collections);
        setCollections([...res.data?.data?.collections]);
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
          Create new Collection
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
            <Box>
              {" "}
              <TextField
                className="add__input"
                id="standard-text-input"
                label="Title for Collection"
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
                label="Topic e.g books"
                InputProps={{ minLength: "2" }}
                type="text"
                name="topic"
                autoComplete="current-password"
                variant="outlined"
                color="primary"
                required
                sx={{ width: "100%", marginTop:'20px' }}
              />
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
          My Collections
        </Typography>
        <List component={"ul"} sx={{ display: "flex", marginTop:'20px' }}>
          {collections?.length > 0 ? (
            collections.map((e, i) => {
              return (
                  <CardCollection key={i} desc={e?.desc} img={e?.img} name={e?.name} id={ e?._id} />
              );
            })
          ) : (
            <Typography color={"secondary"} variant="h5">
              You do not have any collection yet
            </Typography>
          )}
        </List>
      </Box>
    </>
  );
};
