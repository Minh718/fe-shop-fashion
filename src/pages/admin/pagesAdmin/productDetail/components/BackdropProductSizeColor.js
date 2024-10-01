import { Backdrop, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect } from 'react'
import NewColorProduct from './NewColorProduct';
import RowTablePsc from './RowTablePsc';
import { notifyError, notifySuccess } from '../../../../../common/toastNotify/toastNotify';
import { getAllColorsOfProduct } from '../../../../../api/productSerivce';

export default function BackdropProductSizeColor({ open, setOpen, size, price = 333 }) {
    const [newColor, setNewColor] = React.useState(false);
    const [pscs, setPscs] = React.useState(null);
    const handleClose = () => {
        setOpen(false);
        setNewColor(false);
    };
    const handleUpdateQuantity = (id, quantity) => {
        setPscs(pscs.map(psc => psc.id === id ? { ...psc, totalQuantity: quantity } : psc))
        notifySuccess('Update quantity success')

    }
    const handleAddnewColor = async (color, quantity) => {
        try {

            setPscs([...pscs, {
                id: pscs.length + 1,
                name: color.name,
                color: color.color,
                totalQuantity: quantity,
                totalSales: 0
            }])
            notifySuccess('Add new color success')
            setNewColor(false);

        }
        catch (err) {
            notifyError('Error occured')
        }
    }
    useEffect(() => {
        if (size?.id) {
            (async () => {
                try {
                    const res = await getAllColorsOfProduct(size.id);
                    setPscs(res.result);
                } catch (error) {
                    notifyError(error.response.data.message)
                }
            })();
        }
    }, [size?.id])
    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={open}
            onClick={handleClose}
        ><div onClick={(e) => e.stopPropagation()} className='bg-white p-5'>
                {newColor ? <NewColorProduct size={size} handleAddnewColor={handleAddnewColor} setNewColor={setNewColor} /> :
                    <div>
                        <div className='flex text-black justify-between'>

                            <h1 className=' font-bold text-[22px]' >Colors of size {size?.name}</h1>
                            <button onClick={() => setNewColor(true)} className='font-bold border-2 px-2 border-black hover:bg-black transition hover:text-white'>Add color</button>
                        </div>
                        <TableContainer component={Paper} className='mb-3 shadow-md rounded-md'>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align='center' sx={{ padding: "4px" }} >Name</TableCell>
                                        <TableCell align='center' sx={{ padding: "4px" }} >color</TableCell>
                                        <TableCell align='center' sx={{ padding: "4px" }} >Total quantity</TableCell>
                                        <TableCell align='center' sx={{ padding: "4px" }} >Total sales</TableCell>
                                        <TableCell align='center' sx={{ padding: "4px" }} >Total revenue</TableCell>
                                        <TableCell align='center' sx={{ padding: "4px" }} >Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                {pscs ? pscs.length === 0 ? <div className='text-center'>No colors for product</div> : <TableBody>
                                    {
                                        pscs.map((psc) => (
                                            <RowTablePsc key={psc.id} psc={psc} price={price} handleUpdateQuantity={handleUpdateQuantity} />
                                        ))
                                    }
                                </TableBody> : <div className='h-[200px]'>
                                    <CircularProgress />
                                </div>}
                            </Table>
                        </TableContainer>
                    </div>
                }
            </div>
        </Backdrop>
    )
}
