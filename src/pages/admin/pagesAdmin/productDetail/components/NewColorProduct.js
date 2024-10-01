import React, { useEffect } from 'react'
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { notifyError } from '../../../../../common/toastNotify/toastNotify';
import { findAllColorNotInProductSize } from '../../../../../api/colorService';

export default function NewColorProduct({ size, handleAddnewColor, setNewColor }) {
    const [colors, setColors] = React.useState([]);
    const [color, setColor] = React.useState(null);
    const [quantity, setQuantity] = React.useState(null);
    const handleChangeColor = (e) => {
        setColor(colors.find(color => color.id === e.target.value))
    }
    useEffect(() => {
        if (size?.id) {
            (async () => {
                try {
                    const data = await findAllColorNotInProductSize(size.id);
                    setColors(data.result);
                } catch (err) {
                    notifyError("Error occured")
                }
            })()
        }
    }, [])
    return (
        <div className='min-w-[300px] flex flex-col gap-2'>
            <h1 className='text-center text-[22px] text-black italic'>Add new color</h1>

            <FormControl fullWidth>
                <InputLabel >Color</InputLabel>
                <Select
                    value={color?.idColor}
                    label="Color"
                    onChange={handleChangeColor}
                >
                    {colors.map(color1 => <MenuItem key={color1.id} value={color1.id} className='flex gap-4'><span>{color1.name}</span>
                        <span className='w-5 h-5' style={{ backgroundColor: color1.color }}></span>
                    </MenuItem>)}
                </Select>
            </FormControl>
            <TextField value={quantity} onChange={(e) => setQuantity(e.target.value)} fullWidth type='number' label="Quantity" variant="outlined" />
            <div className='flex justify-end'>
                <button onClick={() => handleAddnewColor(color, quantity)} className='bg-blue-500 text-white px-5 py-1'>Add</button>
                <button onClick={() => setNewColor(false)} className='bg-red-500 text-white px-2 py-1 ml-2'>Cancel</button>
            </div>

        </div>
    )
}
