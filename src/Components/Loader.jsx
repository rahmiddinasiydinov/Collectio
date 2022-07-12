import { Box, CircularProgress, Paper, Typography } from "@mui/material";

export const Loader = ({ isLoading, text }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: "100",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        visibility: isLoading ? "visible" : "hidden",
        opacity: isLoading ? 1 : 0,
        backgroundColor: "rgba(0, 0, 0, .4)",
        transition: "1s",
      }}
    >
      <Paper
        sx={{
          position: "relative",
          height: "100px",
          top: isLoading ? "100px" : "50px",
          transition: ".5s",
          width: "400px",
          maxWidth: "100%",
          display: "flex",
          justifyContent: "center",
                  alignItems: "center",
          flexDirection:'column'
        }}
      >
        <CircularProgress size={"50px"} />
        <Typography variant="h5">{text}</Typography>
      </Paper>
    </Box>
  );
};
