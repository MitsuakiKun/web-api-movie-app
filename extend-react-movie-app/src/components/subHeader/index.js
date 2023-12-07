import React, { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { LanguageContext } from "../../contexts/languageContext";
import { getString }  from '../../strings.js';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig.js";

const Offset = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  marginBottom: '0px',
}));

const SubHeader = ({ history }) => {
  const [,setUser] = useState("");
  const [,setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const { language, changeLanguage } = useContext(LanguageContext);


  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    await signOut(auth);
    navigate("/login/");
  }


  return (
    <>
    <AppBar position="fixed" style={{ backgroundColor: '#af52bf', marginTop: '64px' }}>
        <Toolbar style={{ justifyContent: 'flex-end', flexGrow: 1 }}>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                </Menu>
              </>
            ) : (
              <>
                <Button color="inherit" onClick={() => changeLanguage("en-US")}>
                  English
                </Button>
                <Button color="inherit" onClick={() => changeLanguage("ja-JA")}>
                  日本語
                </Button>
                <Button color="inherit" onClick={() => logout()}>
                  {getString(language, "logout")}
                </Button>
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SubHeader;