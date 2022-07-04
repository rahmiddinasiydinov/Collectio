import { Typography, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { userActions } from "../Redux/userSlice";
import { useTranslation } from "react-i18next";
export const ViewAs = () => {
  const user = useSelector((state) => state?.user?.user);
  const admin = useSelector((state) => state?.user?.admin);
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
  const handleView = () => {
    dispatch(userActions.setUser(admin));
    dispatch(userActions.setAdmin(null));
    navigate("/admin");
  };
  return (
    <Paper
      sx={{
        display: admin && user ? "flex" : "none",
        flexDirection: "column",
        position: "fixed",
        top: "100px",
        right: "10px",
        zIndex: 100,
      }}
    >
      <Typography variant="h6" marginBottom={"10px"} fontSize="14px">
       
        {t("ViewAs", { name: user?.fullName || user?.fullName })}
      </Typography>
      <Button onClick={handleView} color="error" variant="contained">
              <Typography sx={{ fontSize: "14px" }}>{ t("Exit")}</Typography>
      </Button>
    </Paper>
  );
};
