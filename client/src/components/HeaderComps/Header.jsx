//react imports
import { Link, useNavigate } from "react-router-dom";
import * as React from "react";
import { useState } from "react";
import { useQuery} from "@apollo/client";
// local imports
import { QUERY_SELF_PROFILE } from "../../utils/queries";
import {useHeaderContext} from '../../utils/HeaderContext'
import { switchClasses, useTheme } from "@mui/material";
import logo from "../../assets/logo.png";
// MUI imports
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import LoginModal from "./LoginModal";
import Auth from "../../utils/auth";
// cloudinary imports
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";

//accordian drop down
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  //useTheme
  const theme = useTheme();
  //useState
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [imageId, setImageId] = useState("");
  const [profileUsername, setProfileUsername] = useState("");
 //userContext
  const contextObj = useHeaderContext();
  //useQuery
  const { error, loading, data, refetch } = useQuery(QUERY_SELF_PROFILE, {
    onCompleted: (data) => {
      setImageId(data.me.profilePicURL);
      setProfileUsername(data.me.username);
      contextObj.setHeaderProfileUsername(data.me.username)
      contextObj.setHeaderProfilePic(data.me.profilePicURL)
    },
  });
  //useNavigate
  const navigate = useNavigate();

  // Create a Cloudinary instance and set your cloud name.
  const cld = new Cloudinary({
    cloud: {
      cloudName: "dkxtk2v4z",
    },
  });
  // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
  const myImage = cld.image(imageId);

  //open Navigate menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  //open User menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  //close Navigate menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  //close User Menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //Logout User and show sweet alerts
  const handleLogout = () => {
    swal
      .fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, logout!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: "Logged Out!",
            text: "See you next time!",
            timer: 1500,
            icon: "success",
            showConfirmButton: false,
          });
          Auth.logout();
          refetch();
          navigate("/");
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swal.fire({
            title: "Cancelled",
            icon: "error",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      });
  };

  return (
    <AppBar
      position="relative"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Avatar
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            src={logo}
          ></Avatar>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className="headNavLinks" to="/">
              FoCo Fun
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem key="home" onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Link className="headNavLinks" to="/sunset">
                    Sunsets
                  </Link>
                </Typography>
              </MenuItem>

              <MenuItem key="hikes" onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Link className="headNavLinks" to="/hikes">
                    Hikes
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem key="bars" onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Link className="headNavLinks" to="/bars">
                    Bars
                  </Link>
                </Typography>
              </MenuItem>
              <MenuItem key="restaurants" onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ display: "flex", width: "100%" }}
                >
                  <Link className="headNavLinks" to="/restaurants">
                    Restaurants
                  </Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Avatar
            src={logo}
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              ml: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link className="headNavLinks" to="/">
              FoCo Fun
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="sunsets"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link className="headNavLinks" to="/sunset">
                Sunsets
              </Link>
            </Button>
            <Button
              key="hikes"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link className="headNavLinks" to="/hikes">
                Hikes
              </Link>
            </Button>
            <Button
              key="bars"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link className="headNavLinks" to="/bars">
                Bars
              </Link>
            </Button>
            <Button
              key="restaurants"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link className="headNavLinks" to="/restaurants">
                Restaurants
              </Link>
            </Button>
          </Box>
          {Auth.loggedIn() ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      color: "white",
                    }}
                  >{`Hey ${contextObj.headerProfileUsername} `}</Typography>
                  <Avatar src={contextObj.headerProfilePic} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="profile" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <Link className="headNavLinks" to="/profile">
                      Profile
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="saved" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <Link className="headNavLinks" to="/saved">
                      Saved Locations
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="community" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <Link className="headNavLinks" to="/community">
                      Community
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="chat" onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    sx={{ display: "flex", width: "100%" }}
                  >
                    <Link className="headNavLinks" to="/chat">
                      Chat
                    </Link>
                  </Typography>
                </MenuItem>
                <MenuItem key="signup" onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={handleLogout}
                    textAlign="center"
                    sx={{ display: "flex", width: "100%" }}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="login" onClick={handleCloseUserMenu}>
                  <LoginModal refetchHeader={refetch}></LoginModal>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
