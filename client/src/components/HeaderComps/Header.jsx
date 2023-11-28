import { Link } from "react-router-dom";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SELF_PROFILE } from "../../utils/queries";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, orange } from '@mui/material/colors';
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
import Auth from "../../utils/auth"
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [imageId, setImageId] = useState("");
  const [profileUsername, setProfileUsername] = useState("")

  const {error, loading, data, refetch} = useQuery(QUERY_SELF_PROFILE, {
    onCompleted: (data) => {
      console.log("self query")
      setImageId(data.me.profilePicURL)
      setProfileUsername(data.me.username)
    },
    // pollInterval: 500
  })

  const outerTheme = createTheme({
    palette: {
      primary: {
        main: "#280137",
      },
    },
  });
  // Create a Cloudinary instance and set your cloud name.
	const cld = new Cloudinary({
		cloud: {
			cloudName: "dkxtk2v4z",
		},
	});

	// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
	const myImage = cld.image(imageId);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Logged Out!",
          text: "See you next time!",
          timer: 1500,
          icon: "success",
          showConfirmButton: false
        });
        Auth.logout();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
          showConfirmButton: false,
          timer: 1000
        });
      }
    });
  }


  return (
    <ThemeProvider theme={outerTheme}>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">Foco Fun</Link>
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
                <Typography textAlign="center">
                  <Link to="/sunset">Best Sunset Spots</Link>
                </Typography>
              </MenuItem>
  
              <MenuItem key="views" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/views">Best Views</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="bars" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/bars">Best Bars</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="restaurants" onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link to="/restaurants">Best Restaurants</Link>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link to="/">Foco Fun</Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              key="sunsets"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              to= "/sunset"
            >
              <Link to="/sunset">Sunsets</Link>
            </Button>
            <Button
              key="views"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/views">Views</Link>
            </Button>
            <Button
              key="bars"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/bars">Bars</Link>
            </Button>
            <Button
              key="restaurants"
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link to="/restaurants">Restaurants</Link>
            </Button>
          </Box>
            {Auth.loggedIn()?<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Typography sx = {{mr: 2, display: { xs: "none", md: "flex" } }}>{`Hey ${profileUsername} `}</Typography>
                <Avatar src= {imageId} />
                
                {/* <AdvancedImage
						cldImg={myImage}
					/> */}
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
                <Typography textAlign="center">
                  <Link to="/profile">Profile</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="saved" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/saved">Saved Locations</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="community" onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <Link to="/community">Community</Link>
                </Typography>
              </MenuItem>
              <MenuItem key="signup" onClick={handleCloseUserMenu}>
                {/* <Typography textAlign="center">Login</Typography> */}
                <Typography onClick = {handleLogout} textAlign="center">
                  Logout
                </Typography>
                
              </MenuItem>
            </Menu>
          </Box>:<Box sx={{ flexGrow: 0 }}>
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
                {/* <Typography textAlign="center">Login</Typography> */}
                <LoginModal refetchHeader = {refetch}></LoginModal>
                
              </MenuItem>
            </Menu>
          </Box> }
            
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
}
export default Header;
