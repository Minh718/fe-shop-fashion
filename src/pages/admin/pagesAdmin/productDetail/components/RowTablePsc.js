import { TableCell, TableRow } from '@mui/material'
import React from 'react'
import convertMoney from '../../../../../utils/convertMoney';

export default function RowTablePsc({ psc, price, handleUpdateQuantity }) {
    const [curQuantity, setCurQuantity] = React.useState(psc.totalQuantity);
    console.log(curQuantity === psc.totalQuantity)
    return (
        <TableRow >
            <TableCell align='center' sx={{ padding: "4px" }} >{psc.name}</TableCell>
            <TableCell align='center' sx={{ padding: "4px" }} ><div className='w-5 h-5' style={{ backgroundColor: psc.color }}></div></TableCell>
            <TableCell align='center' sx={{ padding: "4px" }} ><input className='p-2 border-2' type='number' value={curQuantity} onChange={(e) => setCurQuantity(e.target.value)} /></TableCell>
            <TableCell align='center' sx={{ padding: "4px" }} >{psc.totalSales}</TableCell>
            <TableCell align='center' sx={{ padding: "4px" }} >{convertMoney(psc.totalSales * price)}</TableCell>
            <TableCell align='center' sx={{ padding: "4px" }} >
                {curQuantity !== psc.totalQuantity ? <button onClick={() => handleUpdateQuantity(psc.id, curQuantity)} className='bg-blue-500 text-white px-2 py-1 rounded-md'>update</button>
                    : <button className='bg-slate-500 cursor-not-allowed text-white px-2 py-1 rounded-md '>update</button>}
                <button className='text-red-500 font-bold px-2 py-1 rounded-md hover:text-white ml-2 hover:bg-red-500'>Delete</button>
            </TableCell>
        </TableRow>
    )
}
