import React from 'react'
import HouseIcon from '@mui/icons-material/House';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DiscountIcon from '@mui/icons-material/Discount';
import { Link } from 'react-router-dom';
const navitems = [
    {
        id: 1,
        name: <>
            <HouseIcon />
            <span className='ml-3'>
                Dashboard
            </span>
        </>,
        link: '/admin/dashboard'
    },
    {

        id: 3,

        name: <>
            <InventoryIcon />
            <span className='ml-3'>
                Products
            </span>
        </>,
        link: '/admin/products'
    },
    {
        id: 2,
        name: <>
            <GroupIcon />
            <span className='ml-3'>
                Customers
            </span>
        </>,
        link: '/admin/users'
    },
    {
        id: 4,

        name: <>
            <PlaylistAddCheckIcon />
            <span className='ml-3'>
                Orders
            </span>
        </>,
        link: '/admin/orders'
    },
    {
        id: 6,

        name: <>
            <DiscountIcon />
            <span className='ml-3'>
                Vouchers
            </span>
        </>,
        link: '/admin/discounts'
    },
    {
        id: 5,
        name: <>
            <NotificationsIcon />
            <span className='ml-3'>
                Notifications
            </span>
        </>,
        link: '/admin/notifications'
    }
]

export default function SideBar() {
    const [open, setOpen] = React.useState(true);
    const [indexNav, setIndexNav] = React.useState(1);

    return (
        <div className={`${open ? "col-span-2 border-r-2" : "w-0"} h-[100vh] transition-all sticky top-0 bg-white `}>
            <div className='h-full py-5  flex flex-col justify-between overflow-hidden '>
                <div className='px-3'>
                    <div className='mb-10 flex justify-between'>
                        <div>
                            Logo
                        </div>
                        <div className="cursor-pointer hover:animate-spin" onClick={() => setOpen(false)}>
                            <CloseIcon fontSize="large" />
                        </div>
                    </div>
                    <div>
                        {navitems.map((item) => (
                            <Link to={item.link} key={item.id} onClick={() => setIndexNav(item.id)} className={`${indexNav === item.id ? "bg-[#9ab0e8] text-[#1264FF]" : ""} rounded font-medium flex items-center py-3 px-3 hover:bg-[#9ab0e8] cursor-pointer`}>
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
                <div>LogOut</div>
            </div>

            {open ? "" : <div className='absolute top-1/2 left-0 bg-black rounded-full text-white'>
                <ChevronRightIcon fontSize="large" className="cursor-pointer" onClick={() => setOpen(true)} />
            </div>
            }
        </div>
    )
}
