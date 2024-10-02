import { Checkbox, FormControl, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { addProductToCart } from '../../../api/cartService';
import { notifyError } from '../../../common/toastNotify/toastNotify';
import convertMoney from '../../../utils/convertMoney';
export default function ProductCart({ handleRemoveProduct, setChoosedCpss, choosedCpss, productSizeColor, quantity, id, updateAt, handleAddChoosedCps, handleRemoveChoosedCps }) {

    const { color, productSize } = productSizeColor;
    const { size, product } = productSize;
    const [currentQuantity, setCurrentQuantity] = React.useState(quantity);
    const handleChangeQuantity = async (event) => {

        const oldQuantity = currentQuantity;
        try {
            if (currentQuantity !== event.target.value) {
                setCurrentQuantity(event.target.value);
                await addProductToCart({ productSizeColorId: productSizeColor.id, quantity: event.target.value })
                if (choosedCpss.some(cps => cps.id === id)) {
                    setChoosedCpss(choosedCpss.map(cps => cps.id === id ? { id, quantity: event.target.value } : cps))
                }
            }
        } catch (error) {
            setCurrentQuantity(oldQuantity);
            notifyError(error.response.data.message, +", please reload page!")
        }
    }
    const handleCheckboxProduct = (event) => {
        if (event.target.checked) {
            handleAddChoosedCps({ id, quantity: currentQuantity })
        } else {
            handleRemoveChoosedCps(id)
        }
    }

    return (
        <div className='h-[120px] p-2 flex'>
            <div className='flex items-center'><Checkbox checked={choosedCpss.some(cps => cps.id === id)} onClick={handleCheckboxProduct} /></div>
            <div className='w-[140px] h-full'>
                <img src={product.image} alt="" className='w-full h-full object-cover object-center' />
            </div>
            <div className='pl-4 w-full flex flex-col justify-between'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='italic text-[18px]'>{product.name}</h1>
                        <h1 className='text-[14px]'>Size: {size.name}</h1>
                    </div>
                    <button className='hover:opacity-60' onClick={() => handleRemoveProduct(id)}>
                        <ClearIcon />
                    </button>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 60 }}>

                            <InputLabel id="label-quantity-product-cart">Số lượng</InputLabel>
                            <Select
                                labelId="label-quantity-product-cart"
                                id="demo-simple-select"
                                value={currentQuantity}
                                label="Số lượng"
                                autoWidth={true}
                                onChange={handleChangeQuantity}
                            >
                                {Array.from({ length: productSizeColor.quantity }, (_, i) => i + 1).map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className='flex items-end flex-col'>
                        <p className='line-through opacity-70'>{convertMoney(product.price)}/p</p>
                        <p className='font-bold'>{convertMoney(product.price - product.price * product.percent / 100)}/p</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
