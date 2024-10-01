import { Backdrop, Tooltip } from '@mui/material';
import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Link } from 'react-router-dom';
import { Search } from '@mui/icons-material';
import BackdropProduct from './components/BackdropProduct';
import convertMoney from '../../utils/convertMoney';


export default function Product({ product }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };
    return (
        <div className='p-2 border rounded-sm bg-white mb-4 flex flex-col justify-between'>
            <div className=' w-[200px] h-[200px] bg-slate-400 relative'>
                <img src={product.image} alt={product.name} className='hover:opacity-70 w-full h-full object-cover ' />
                <div className='absolute top-0 right-0 bg-white text-red-600 border-2 border-red-600 font-bold flex items-center justify-center w-[40px] h-[35px] rounded-full '>{product.percent}%</div>
                <Tooltip title="Add to cart">

                    <div onClick={handleOpen} className='cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:w-[60px] hover:h-[60px]  absolute bottom-1 right-1 bg-white  flex items-center justify-center w-[40px] h-[40px] rounded-full'><AddShoppingCartIcon /></div>
                </Tooltip>
                <Tooltip title="View detail product">

                    <Link to={"/product/" + product.id} className='cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:w-[60px] hover:h-[60px]  absolute bottom-1 left-1 bg-white  flex items-center justify-center w-[40px] h-[40px] rounded-full'><Search /></Link>
                </Tooltip>
            </div>
            <h1 className='font-bold text-[15px] max-w-[200px]'>{product.name.slice(0, 35) + "..."}</h1>
            <div className='py-2'>
                <div className='flex justify-between font-bold'>
                    <p className='line-through opacity-70'>{convertMoney(product.price)}</p>
                    <p className='text-red-600'>{convertMoney(product.price - product.price * product.percent / 100)}</p>
                </div>
                {/* <button className='border w-full border-black font-bold bg-white text-black py-2 hover:text-white hover:bg-black mb-2 transition-all'>Xem chi tiết</button>
                <button onClick={handleOpen} className='border w-full border-black font-bold bg-black text-white py-2 hover:text-black hover:bg-white transition-all'>Thêm giỏ</button> */}
            </div>
            {open ? <BackdropProduct open={open} handleClose={handleClose} product={product} /> : ""}
        </div>
    )
}
