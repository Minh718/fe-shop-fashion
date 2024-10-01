import React, { useEffect, useState } from 'react'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@mui/material';
import LoginEmailSDT from './components/LoginEmailSDT';
import { oAuthConfig } from '../../configurations/oAuthConfig';
export default function Login() {
  const [open, setOpen] = React.useState(false);
  const [userDetails, setUserDetails] = useState({});

  const handleLoginByGoogle = () => {
    const callbackUrl = oAuthConfig.redirectUri;
    const authUrl = oAuthConfig.authUri;
    const googleClientId = oAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
      callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;
    window.location.href = targetUrl;
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='h-[70vh] flex items-center justify-center bg-slate-300'>
      <div className='w-[35%] min-w-[400px] h-[50vh] bg-white rounded-md py-7'>
        <h1 className='text-3xl text-center font-bold uppercase pb-4'>Đăng nhập</h1>
        <div className='flex flex-col items-center justify-center'>
          {/* <input type='text' placeholder='Email hoặc số điện thoại' className='w-[80%] p-2 my-2 border border-gray-300 rounded-md' />
          <input type='password' placeholder='Mật khẩu' className='w-[80%] p-2 my-2 border border-gray-300 rounded-md' /> */}
          {/* <button className='w-[80%] p-2 my-2 bg-black text-white font-bold'>Login</button>
          <button className='w-[80%] p-2 my-1 bg-white text-black border border-black  font-bold'>Đăng ký</button> */}
          <button onClick={handleLoginByGoogle} className='w-[80%] p-2 my-2 bg-black text-white font-bold'>Đăng nhập với Google  <GoogleIcon /></button>
          <button className='cursor-not-allowed w-[80%] p-2 my-1 bg-white text-black border border-black font-bold opacity-70'>Đăng nhập với Facebook <FacebookIcon /> </button>
          <button className='cursor-not-allowed w-[80%] p-2 my-2 bg-black text-white font-bold opacity-70'>Đăng nhập với Github <GitHubIcon /></button>
          <button className=' w-[80%] p-2 my-1 bg-white text-black border border-black  font-bold' onClick={handleOpen}>Đăng nhập với Email/Số điện thoại</button>
          <LoginEmailSDT open={open} handleClose={handleClose} />
          <Link to="/register" className='cursor-pointer'>Đi tới Đăng ký</Link>
          <i>Quên mật khẩu</i>
        </div>
      </div>
    </div>
  )
}
