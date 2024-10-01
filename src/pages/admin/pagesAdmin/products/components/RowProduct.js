import { Button, Dialog, DialogActions, DialogTitle, FormControlLabel, Menu, MenuItem, styled, Switch, TableCell, TableRow } from '@mui/material';
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from 'react-router-dom';
import { deleteProduct, draftProduct, publishProduct } from '../../../../../api/productSerivce';
import { notifyError, notifySuccess } from '../../../../../common/toastNotify/toastNotify';

export default function RowProduct({ product, products, setProducts }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };
    console.log(openDelete)
    const handleCloseDelete = () => {
        setOpenDelete(false);
    };
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCheckStatus = async (e) => {
        try {
            if (e.target.checked) {
                await publishProduct(product.id);
            }
            else await draftProduct(product.id);
        } catch (err) {
            notifyError(err.response.data.message)
        }
    }
    const handleDeleteProduct = async () => {
        try {
            const res = await deleteProduct(product.id);
            setProducts(products.filter(item => item.id !== product.id));
            notifySuccess(res.message);
        } catch (err) {
            notifyError(err.response.data.message)
        }
    }
    return (
        <TableRow
            key={product.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center" sx={{ padding: '2px' }}>
                {product.id}
            </TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>
                <div className='flex justify-center'>
                    <img className='h-[50px]' src={product.image} alt={product.name} />
                </div>
            </TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>
                {product.name}
            </TableCell>
            <TableCell align="center" sx={{ padding: '2px' }} >{product.price}</TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>      <FormControlLabel
                control={<IOSSwitch sx={{ m: 1 }} defaultChecked={product.status} onChange={handleCheckStatus} />}
            /></TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>{product.totalSales}</TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>{product.totalRevenue}</TableCell>
            <TableCell align="center" sx={{ padding: '2px' }}>
                <span className='cursor-pointer' onClick={handleClick}><MoreHorizIcon /></span>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem onClick={handleClose}> <EditIcon /><Link to={`/admin/product/${product.id}`}> <span className='pl-4'>Edit</span></Link></MenuItem>
                    <MenuItem onClick={handleClickOpenDelete}><DeleteIcon /><div > <span className='pl-4'>Delete</span> </div></MenuItem>
                    <MenuItem onClick={handleClose}><DescriptionIcon /><Link to={`/admin/product/${product.id}`}><span className='pl-4'>Detail</span></Link> </MenuItem>
                    <Dialog
                        open={openDelete}
                        onClose={handleCloseDelete}
                    >
                        <DialogTitle >
                            Do you want to delete this product?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleCloseDelete}>Disagree</Button>
                            <Button onClick={() => {
                                handleCloseDelete();
                                handleDeleteProduct();
                                handleClose();
                            }} autoFocus>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Menu>
                {/* <div className='font-bold flex gap-3 justify-center text-white'> */}
                {/* <button className='bg-red-600 p-2 rounded-md'>Delete</button> */}
                {/* <Link to={`/admin/product/${product.id}`} className='text-blue-600 p-2 rounded-md'>Detail</Link></div> */}
            </TableCell>
        </TableRow>
    )
}

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#65C466',
                opacity: 1,
                border: 0,
                ...theme.applyStyles('dark', {
                    backgroundColor: '#2ECA45',
                }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
                color: theme.palette.grey[600],
            }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
                opacity: 0.3,
            }),
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
        ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
        }),
    },
}));