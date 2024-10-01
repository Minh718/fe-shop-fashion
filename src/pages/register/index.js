import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import NofiRegister from './components/NofiRegister';


const typeRegisters = Object.freeze({
    EMAIL: Symbol('email'),
    SDT: Symbol('sdt'),
});
export default function Register() {
    const [typeRegister, setTypeRegister] = useState(typeRegisters.SDT);
    const [open, setOpen] = React.useState(false);
    return (
        <div className='h-[70vh] flex items-center justify-center bg-slate-300'>
            <div className='w-[35%] min-w-[400px] h-[52vh] bg-white rounded-md py-5'>
                <h1 className='text-3xl text-center font-bold uppercase pb-3'>Đăng ký tài khoản</h1>
                <div className='p-2 text-center'>
                    <i onClick={() => setTypeRegister(typeRegisters.SDT)} className={typeRegister === typeRegisters.EMAIL ? "opacity-40" : ""}><i className='cursor-pointer font-bold'>Đăng ký SĐT</i></i> /
                    <i onClick={() => setTypeRegister(typeRegisters.EMAIL)} className={typeRegister === typeRegisters.SDT ? "opacity-40" : ""}><i className='cursor-pointer font-bold'> Đăng ký Email</i></i></div>
                <div className='flex flex-col items-center justify-center'>
                    {typeRegister === typeRegisters.EMAIL ? <input type='text' placeholder='Email' className='w-[80%] p-2 my-1 border border-gray-300 rounded-md' />
                        : <input type='text' placeholder='Số điện thoại' className='w-[80%] p-2 my-1 border border-gray-300 rounded-md' />}
                    <input type='password' placeholder='Mật khẩu' className='w-[80%] p-2 my-1 border border-gray-300 rounded-md' />
                    <input type='password' placeholder='Nhập lại mật khẩu' className='w-[80%] p-2 my-1 border border-gray-300 rounded-md' />
                    {typeRegister === typeRegisters.SDT ? <div className='w-[80%]'>
                        <input type='text' placeholder='Mã xác nhận' className='p-2 my-1 border border-gray-300 rounded-md' />
                        <button className='border border-black font-bold bg-black text-white p-2 ml-2 hover:text-black hover:bg-white transition-all'>Get OTP</button>
                    </div > : ""}
                    <button className='w-[80%] p-2 my-1 bg-black text-white font-bold' onClick={() => {
                        typeRegister === typeRegisters.EMAIL ? setOpen(true) : setOpen(true)
                    }} >Đăng ký</button>
                    <Link to="/login" className='cursor-pointer'>Đi tới Đăng nhập</Link>
                </div>

            </div>
            <NofiRegister open={open} setOpen={setOpen} isEmail={typeRegister === typeRegisters.EMAIL} />
        </div>
    )
}
