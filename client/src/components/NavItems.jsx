import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom";

export default function NavDropDown() {
    <>
    <MenuItem>
      <Typography textAlign="center">
        <Link to="/">Best Sunset Spots</Link>
      </Typography>
    </MenuItem>
    <MenuItem>
    <Typography textAlign="center">
      <Link to="/">Best Sunrise Spots</Link>
    </Typography>
    </MenuItem>
    <MenuItem>
    <Typography textAlign="center">
      <Link to="/">Best Views</Link>
    </Typography>
    </MenuItem>
    <MenuItem>
    <Typography textAlign="center">
      <Link to="/">Best Bars</Link>
    </Typography>
    </MenuItem>
    </>
}
