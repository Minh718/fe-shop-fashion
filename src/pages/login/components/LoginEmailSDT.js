import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { userLoginByEmail } from '../../../api/authenthicateApi';
import { setUserInfo } from '../../../features/user/userSlice';
import Cookies from 'js-cookie';
import { notifyError } from '../../../common/toastNotify/toastNotify';
import { useNavigate } from 'react-router-dom';
export default function LoginEmailSDT({ open, handleClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = React.useState('admin@gmail.com');
    const [password, setPassword] = React.useState('0934991797Aa');
    const handleLogin = async () => {
        try {
            const result = await userLoginByEmail({ username, password });
            dispatch(setUserInfo(result))
            Cookies.set('accessToken', result.accessToken);
            Cookies.set('refreshToken', result.refreshToken);
            Cookies.set('x-user-id', result.id);
            navigate("/");
        } catch (err) {
            notifyError('Đăng nhập thất bại')
            navigate("/login");
        }
    }
    return (
        <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
        >
            <div className='flex flex-col items-center justify-center bg-white p-5' onClick={(e) => {
                e.stopPropagation();
            }}>
                <h1 className='text-3xl text-center font-bold uppercase pb-4 text-black'>ĐĂNG NHẬP TÀI KHOẢN</h1>
                <h3>Đăng nhập bằng email hoặc số điện thoại đã đăng ký</h3>
                <input type='text' placeholder='Email hoặc số điện thoại' onChange={(e) => setUsername(e.target.value)} value={username} className='w-full p-2 my-2 border border-gray-300 rounded-md' />
                <input type='password' placeholder='Mật khẩu' onChange={(e) => setPassword(e.target.value)} value={password} className='w-full p-2 my-2 border border-gray-300 rounded-md' />
                <button className='w-full p-2 my-2 bg-black text-white font-bold' onClick={handleLogin}>Login</button>
                <Link to="/register" className='cursor-pointer text-black'>Đi tới Đăng ký</Link>
                <Link to="/register" className='cursor-pointer text-black'>Quên mật khẩu</Link>
            </div>
        </Backdrop>
    )
}
