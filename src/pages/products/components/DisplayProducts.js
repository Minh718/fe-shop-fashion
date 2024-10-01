import React from 'react'
import { Box, Divider, Menu, MenuItem, Pagination, Stack } from '@mui/material'
import SortIcon from '@mui/icons-material/Sort';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Breadcrumbsv from '../../../common/breadcrumbsv/Breadcrumbsv';
import Product from '../../../common/CardProduct/Product';
const sortsDefault = [{
    name: "Newest",
    sortBy: "createdDate",
    order: "desc"
},
{
    name: 'Oldest',
    sortBy: "createdDate",
    order: "asc"
},
{
    name: "A - Z",
    sortBy: "name",
    order: "asc"
},
{
    name: "Z - A",
    sortBy: "name",
    order: "desc"
},
{
    name: (<>Price  <KeyboardDoubleArrowDownIcon className='ml-2' /> </>),
    sortBy: "price",
    order: "desc"
},
{
    name: (<>Price  <KeyboardDoubleArrowUpIcon className='ml-2' /> </>),
    sortBy: "price",
    order: "asc"
}
]
export default function DisplayProducts({ sorts = sortsDefault, page, handleSortProducts, products, name, links, metadata, handleChangePage }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // React.useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [page])
    return (
        <Box sx={{ flexGrow: 1 }} className="w-[90%] max-w-[1280px] min-h-[70vh]">
            <Breadcrumbsv links={links} />
            <div className='flex justify-between'>
                <h1 className='font-bold text-[30px]'>{name}</h1>
                <div onClick={handleClick} className='cursor-pointer '><SortIcon fontSize='large' /></div>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {sorts.map((sort, index) => (<MenuItem onClick={() => {
                        handleClose();
                        handleSortProducts(sort)
                    }} key={index} >{sort.name}</MenuItem>))}
                </Menu>
            </div>
            <Divider />
            {/* <h1 className='text-center font-bold text-[26px] pb-5 uppercase'>{name}</h1> */}
            <div className='flex items-center justify-center'>
                <div className='flex w-[90%] max-w-[1100px] justify-between flex-wrap'>
                    {products.map((product, index) => (
                        <Product product={product} key={index} />
                    ))
                    }
                </div>
            </div>
            <div className='flex justify-end mb-3  mt-[-5px]'>
                <Stack spacing={2}>
                    <Pagination page={page} onChange={handleChangePage} count={metadata.totalPages} variant="outlined" shape="rounded" />
                </Stack>
            </div>
        </Box>
    )
}
