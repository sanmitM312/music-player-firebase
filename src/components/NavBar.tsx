import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)({
  background: "#600909",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
});

const StyledButton = styled(Button)({
  fontWeight: "bold",
  fontSize: "1rem",
  color: "#fff",
  textTransform: "uppercase",
  transition: "0.3s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "scale(1.1)",
  },
});

const Navbar = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ flex: 1 }} />
        {/* <span><img width="50" height="50" src="https://img.icons8.com/ios/50/aipods-pro-max.png" alt="aipods-pro-max"/></span> */}
        <Typography variant="h4" sx={{ color: "wheat", fontWeight: "bold" }}>
        <span><img width="50" height="50" src="https://img.icons8.com/ios/50/aipods-pro-max.png" alt="aipods-pro-max"/>GROOVY</span>
        {/* GROOVY */}
        </Typography>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <Link href="/" passHref>
            <StyledButton>Home</StyledButton>
          </Link>
          <Link href="/upload" passHref>
            <StyledButton>Upload</StyledButton>
          </Link>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
