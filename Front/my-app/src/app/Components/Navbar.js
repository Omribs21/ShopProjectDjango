import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { selectLogged } from '../Slicers/orderSlice';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import SwipeableTemporaryDrawer from './Menu';
import NotSignedInAcc from './NotSignedInMenu';
import AccountMenu from './AccountMenu';
import { Link } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react'
import { GetProdFromWishlistAsync, selectallprods } from '../Slicers/GetProdFromWishlistSlice';
import { selectToken } from '../Slicers/loginSlice';
import { selectprod } from '../Slicers/GetProdByIdSlice'; // all the prods from the wishlist
import { GetWishlistAsync, selectproductswishlist, selectlength } from '../Slicers/getWishlistSlice'
import 'animate.css';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const token = useSelector(selectToken);
  const [TokenValue, setTokenValue] = useState(false)
  const dispatch = useDispatch()
  const Products = useSelector(selectproductswishlist)
  const WishlistLength = useSelector(selectlength)



  useEffect(() => {
    if (token != "") {
      setTokenValue(true);
    }
    else { setTokenValue(false) }

  }, [token])

  useEffect(() => {
    dispatch(GetWishlistAsync({ "Token": token }))
  }, [])





  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">

          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );





  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <SwipeableTemporaryDrawer />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            marginLeft="38%"
            fontSize="40px"
            textAlign="center"

          >
            <Link class="animate__animated animate__pulse" to="/products"><p style={{ color: "white", fontSize: "40px", fontFamily: "monospace" }} class="animate__animated animate__wobble">Sofa Sportim</p></Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              {TokenValue === false ?
                <Badge badgeContent={0} color="error">
                  {/* <FavoriteBorderIcon style={{ color: "white", width: "40px", height: "40px" }}></FavoriteBorderIcon> */}

                  <lord-icon
                    src="https://cdn.lordicon.com/pnhskdva.json"
                    trigger="hover"
                    colors="primary:#ffffff">
                  </lord-icon>

                </Badge> :
                <Badge badgeContent={WishlistLength} style={{ fontSize: "20px" }} color="error">
                  <Link to="/wishlist"><lord-icon
                    src="https://cdn.lordicon.com/pnhskdva.json"
                    trigger="hover"
                    colors="primary:#ffffff">
                  </lord-icon></Link>
                </Badge>}

            </IconButton>
            <IconButton
              size="50px"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {TokenValue === false ? <Badge badgeContent={0} color="error">
                <Link to="/shopingcart" ><script src="https://cdn.lordicon.com/qjzruarw.js"></script>
                  <lord-icon
                    src="https://cdn.lordicon.com/medpcfcy.json"
                    trigger="hover"
                    colors="primary:#ffffff">
                  </lord-icon></Link>
              </Badge> : <Badge badgeContent={5} color="error">
                <Link to="/shopingcart" ><lord-icon
                  src="https://cdn.lordicon.com/medpcfcy.json"
                  trigger="hover"
                  colors="primary:#ffffff">
                </lord-icon></Link>
              </Badge>}
            </IconButton>

            <IconButton
              size="50px"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              {token === "" ? <NotSignedInAcc style={{ width: "40px", height: "40px" }}></NotSignedInAcc> : <AccountMenu />}


            </IconButton>

          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
