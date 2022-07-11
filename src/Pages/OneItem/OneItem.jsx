import "./OneItem.scss";
import {
  Typography,
  Container,
  Box,
  List,
  ListItem,
  Avatar,
  Button,
  Paper,
  TextField,
} from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dateFormat from "dateformat";
import { ItemCard } from "../../Components/ItemCard";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useSelector } from "react-redux";
import { socketContext } from "../../Contexts/SocketIo";
import { useContext } from "react";
import { deepOrange } from "@mui/material/colors";
import { Markdown } from "../../Components/Markdown";

export const OneItem = () => {
  const socket = useContext(socketContext);
  const user = useSelector((state) => state?.user?.user);
  const [item, setItem] = useState({});
  const [recentItems, setRecentItems] = useState([]);
  const [commentValue, setCommentValue] = useState('');
  const [show, setShow] = useState(false);
  const comment = useRef();
  const { id } = useParams();
  const smiles = ["😂", "😁", "😘", "😉", "😌", "😢", "😔", "😭"];
  useEffect(() => {
    axios
      .get(`one_item?id=${id}&&userId=${user?._id}`)
      .then((res) => {
        console.log(res.data.data);
        setItem(res.data?.data);
      });
  }, [id, user]);
  useEffect(() => {
    axios.get("item").then((res) => {
      setRecentItems(res.data?.data);
    });
  }, []);

  useEffect(() => {
    socket.on("server-like", (data) => {
      if (data?.likes) {
        setItem(data);
      }
    });
    socket.on("server-dislike", (data) => {
      if (data?.dislikes) {
        setItem(data);
      }
    });
    socket.on("server-comment", (data) => {
      console.log(data);
      setItem(data);
    });
  }, [socket]);

  const handleComment = (e) => {
    e.preventDefault()
    console.log({
      userId: user?._id,
      itemId: item?._id,
      comment: commentValue,
    });
    socket.emit("new-comment",{
      userId: user?._id,
      itemId: item?._id,
      comment: commentValue,
    });
    setCommentValue('');
  };
  function topFunction() {
    document.body.scrollTop = 10; // For Safari
    document.documentElement.scrollTop = 10; // For Chrome, Firefox, IE and Opera
  }

  const handleLike = (userId, itemId) => {
    console.log(userId, itemId);
    socket.emit("new-like", { userId, itemId });
  };
  const handleDislike = (userId, itemId) => {
    socket.emit("new-dislike", { userId, itemId });
  };
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <div className="oneCollection">
      <Container
        className="oneCollection__wrapper"
        maxWidth="xl"
        sx={{ display: "flex", flexWrap: "wrap", marginBottom: "30px" }}
      >
        <Box
          className="oneCollection__left"
          width={"60%"}
          maxWidth={"100%"}
          padding={"10px"}
          marginTop="30px"
          id="top"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            {" "}
            <Typography
              variant="h6"
              color={"primary.dark"}
              component={"span"}
              display="flex"
              alignItems={"center"}
              marginRight="15px"
            >
              <Avatar sx={{ marginRight: "10px" }} src={item?.user?.img}>
                {item?.user?.fullName?.slice(0, 1)}
              </Avatar>{" "}
              {item?.user?.fullName ||
                item?.user?.username ||
                "Deleted account"}
            </Typography>
            <Typography variant="h6">
              <strong>Collection</strong>: {item?.collectionName?.name}
            </Typography>
          </Box>
          <img
            width={"100%"}
            style={{ borderRadius: "10px" }}
            src={item?.img}
            alt="collection_image"
          />

          {user && (
            <Box display={"flex"} alignItems="center" marginTop={"10px"}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                {`${item?.views?.length} `}{" "}
                <Button>
                  <RemoveRedEyeIcon />
                </Button>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: "10px",
                  paddingLeft: "20px",
                }}
              >
                {`${item?.likes?.length} `}{" "}
                <Button onClick={() => handleLike(user?._id, item?._id)}>
                  {item?.likes?.includes(user?._id) ? (
                    <ThumbUpAltIcon color="primary" />
                  ) : (
                    <ThumbUpOffAltIcon color="primary" />
                  )}
                </Button>
              </Paper>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                }}
              >
                {`${item?.dislikes?.length}`}{" "}
                <Button onClick={() => handleDislike(user?._id, item?._id)}>
                  {item?.dislikes?.includes(user?._id) ? (
                    <ThumbDownAltIcon color="primary" />
                  ) : (
                    <ThumbDownOffAltIcon color="primary" />
                  )}
                </Button>
              </Paper>
            </Box>
          )}
          <Typography
            variant="h4"
            display={"flex"}
            justifyContent="space-between"
            component={"h2"}
            marginTop="20px"
          >
            {item?.title}
            <Typography component="span" marginLeft={"10px"}>
              {dateFormat(item?.createdAt, "mmmm d, yyyy, h:MM TT")}
            </Typography>
          </Typography>

          <Typography variant="h6" marginTop={"20px"}>
            {item?.isMarkdown ? <Markdown text={item?.desc} /> : item?.desc}
          </Typography>
          {user && (
            <Box>
              <Box
                component="form"
                onSubmit={handleComment}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "30px",
                }}
              >
                <TextField
                  required
                  InputProps={{ minLength: 2 }}
                  inputRef={comment}
                  multiline
                  value={commentValue}
                  inputProps={{ minLength: 1 }}
                  onChange={(e) => {
                    setCommentValue(e.target.value);
                  }}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                    width: "400px",
                    maxWidth: "100%",
                    marginRight: "10px",
                  }}
                />
                <Button variant="contained" color="primary" type="submit">
                  Comment
                </Button>
              </Box>
              <Box marginTop={'10px'}>
                {smiles.map(e=>{
                  return <Typography  sx={{fontSize:'20px', padding:'3px', width:"10px", marginRight:'10px', cursor:"pointer"}} component='span' onClick={() => {
                    setCommentValue(commentValue+e)
                  }}>{e}</Typography>
                }) }
              </Box>
            </Box>
          )}
          <Typography
            component={"h4"}
            variant="h6"
            color="primary.dark"
            sx={{ marginTop: "30px" }}
          >
            Comments{" "}
            <Button onClick={handleShow} sx={{ marginLeft: "10px" }}>
              Show more
            </Button>
          </Typography>
          <Box
            className={!show ? "oneItem__comment--hide" : ""}
            sx={{
              overflow: "auto",
              marginTop: "10px",
              transition: "2s",
              width: "100%",
              padding: "0 10px",
              boxSizing: "content-box",
            }}
          >
            {item?.comments?.length ? (
              item?.comments?.map((e) => {
                return (
                  <Box marginBottom={"20px"}>
                    <Typography
                      variant="h6"
                      color={"primary.dark"}
                      component={"span"}
                      display="flex"
                      alignItems={"center"}
                      sx={{
                        color: e?.user?._id === user?._id ? "red" : "",
                        fontSize: e?.user?._id === user?._id ? "16px" : "14px",
                        fontWeight: e?.user?._id === user?._id ? "700" : "500",
                      }}
                    >
                      <Avatar
                        sx={{
                          marginRight: "10px",
                          bgcolor: deepOrange[500],
                          height: 25,
                          width: 25,
                        }}
                        src={e?.user?.img}
                      >
                        {e?.user?.fullName?.slice(0, 1)}
                      </Avatar>{" "}
                      {e?.user?._id === user?._id
                        ? "You"
                        : e?.user?.fullName ||
                          e?.user?.username ||
                          "Deleted account"}
                    </Typography>
                    <Typography variant="h6" component={"p"}>
                      {e?.body}
                    </Typography>
                    <Typography
                      sx={{ opacity: 0.6 }}
                      variant="body2"
                      component={"span"}
                    >
                      {dateFormat(e?.createdAt, "mmmm d, h:MM TT")}
                    </Typography>
                  </Box>
                );
              })
            ) : (
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                There is no comments
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          className="oneCollection__right"
          sx={{
            marginTop: "30px",
            width: "40%",
            maxWidth: "100%",
            padding: "10px",
          }}
        >
          {" "}
          <Typography
            sx={{ textAlign: "center", width: "100%", marginBottom: "20px" }}
            variant="h5"
            component={"h3"}
          >
            The newest items
          </Typography>
          <List
            className="oneCollection__list"
            sx={{
              flexGrow: "1",
              overflow: "auto",
              height: "550px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid rgba",
            }}
          >
            {recentItems ? (
              recentItems?.map((e) => {
                return e._id !== item?._id ? (
                  <ListItem
                    key={e?._id}
                    onClick={topFunction}
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      padding: "0",
                      marginBottom: "20px",
                    }}
                  >
                    <ItemCard img={e?.img} title={e?.title} id={e?._id} />
                  </ListItem>
                ) : (
                  ""
                );
              })
            ) : (
              <Typography color="primary.dark" variant="h5">
                There is not any items in this Collection
              </Typography>
            )}
          </List>
        </Box>
      </Container>
    </div>
  );
};
