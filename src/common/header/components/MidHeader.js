import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import PersonIcon from '@mui/icons-material/Person';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';

import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getNumberPaymentingOrder } from '../../../api/orderService';
import { clearUserInfo } from '../../../features/user/userSlice';
import FieldSearch from './FieldSearch';
import { CircularProgress } from '@mui/material';
import { checkIsAdmin } from '../../../utils/tokenUtils';
const pages = ['Products', 'Pricing', 'Blog'];

function MidHeader() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [totalOrderPending, setTotalOrderPending] = React.useState(0);
  const dispatch = useDispatch()
  const { userInfo, isAuthenticated, loading, statusCart } = useSelector(state => state.user)
  const navigate = useNavigate();


  React.useEffect(() => {
    if (isAuthenticated) {
      (async () => {
        const res = await getNumberPaymentingOrder();
        setTotalOrderPending(res)
      })()
    }
  }, [isAuthenticated])
  const handleLogout = () => {
    dispatch(clearUserInfo())
    navigate("/login")
  }
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
  return (
    <AppBar position="static" className='bg-black'>
      <Container maxWidth="xl">
        <Toolbar disableGutters className='flex justify-around'>
          <Link to={"/home"}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }} className='flex items-center' >
              <img src="/logo.png" alt="??" className='w-[80px]' />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: "Ga Maamli",
                  fontWeight: 400,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  pl: 2,
                }}
              >
                Shop thời trang
              </Typography>
            </Box>
          </Link>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <FieldSearch />
          <div className='flex items-center justify-center'>
            {isAuthenticated ? (
              <>
                <div className='flex flex-col items-center'>
                  <Link to={"#"} sx={{ p: 0 }}>
                    <NotificationsActiveIcon sx={{ color: "white" }} fontSize="large" />
                  </Link>
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, fontSize: "14px" }}>

                    Thông báo
                  </Box>
                </div>
                <div className='px-3 flex flex-col items-center relative' >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <PersonIcon sx={{ color: "white" }} fontSize="large" />
                    </IconButton>
                  </Tooltip>
                  {totalOrderPending !== 0 ? <div className='absolute top-0 rounded-full bg-red-600 w-5 h-5 flex justify-center items-center font-bold right-1/2'>{totalOrderPending}</div> : ""}

                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                  >
                    <MenuItem  >
                      <Typography textAlign="center">Info User</Typography>
                    </MenuItem>
                    <Link to={"/orders"}>
                      <MenuItem sx={{ width: "120px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography textAlign="center">Orders</Typography>
                        {totalOrderPending !== 0 ? <div className=' rounded-full bg-red-600 w-5 h-5 text-white flex justify-center items-center font-bold'>{totalOrderPending}</div> : ""}

                      </MenuItem>
                    </Link>
                    {checkIsAdmin() &&
                      <Link to={"/admin/dashboard"}>
                        <MenuItem >
                          <Typography textAlign="center">Dashboard</Typography>
                        </MenuItem>
                      </Link>
                    }
                    <MenuItem >
                      <Typography textAlign="center" onClick={handleLogout}>Logout</Typography>
                    </MenuItem>

                  </Menu>
                  <span className='lowercase'>
                    {userInfo.name ? userInfo.name.split(" ")[0] : "User"}
                  </span>
                </div>
                {/* <Notification /> */}
              </>
            ) : (

              <>

                <div className='flex flex-col items-center'>
                  <Link to={"login"} sx={{ p: 0 }}>
                    <ShareLocationIcon sx={{ color: "white" }} fontSize="large" />
                  </Link>
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, fontSize: "14px" }}>

                    Cửa hàng
                  </Box>
                </div>
                <Link to={"login"} className='px-3 flex flex-col items-center' >
                  <PersonIcon sx={{ color: "white" }} fontSize="large" />
                  <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, fontSize: "14px" }}>

                    {loading ? "" : "Đăng nhập"}
                  </Box>
                </Link>
              </>
            )}
            <Link to='/cart' sx={{ p: 0 }} className='flex flex-col items-center relative'>
              <ShoppingCartIcon sx={{ color: "white" }} fontSize="large" />
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' }, fontSize: "14px" }}>
                Giỏ hàng
              </Box>
              {statusCart ? <div className='absolute top-0 rounded-full bg-red-600 w-5 h-5 flex justify-center items-center font-bold right-1/2'></div> : ""}
            </Link>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MidHeader;