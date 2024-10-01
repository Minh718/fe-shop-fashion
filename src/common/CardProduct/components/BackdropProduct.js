import { Backdrop, Button, CircularProgress, Divider, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material'
import React, { useEffect } from 'react'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SlideImages from './SlideImages'
import { getProductDetail } from '../../../api/productSerivce'
import convertMoney from '../../../utils/convertMoney'
import { addProductToCart } from '../../../api/cartService'
import { notifyError, notifySuccess } from '../../toastNotify/toastNotify'
import { setStatusCart } from '../../../features/user/userSlice'

export default function BackdropProduct({ open, handleClose, product }) {
    const [detailProduct, setDetailProduct] = React.useState(null)
    const [productSize, setProductSize] = React.useState(null)
    const [productSizeColors, setProductSizeColors] = React.useState(null)
    const [productSizeColor, setProductSizeColor] = React.useState(null)
    const [quantity, setQuantity] = React.useState(1);
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAddProductToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login')
        }
        else {
            try {
                if (productSizeColor && quantity > 0) {
                    const data = {
                        productSizeColorId: productSizeColor.id,
                        quantity: quantity
                    }
                    await addProductToCart(data)
                    notifySuccess("Add product to cart successfully")
                    dispatch(setStatusCart(true));
                    handleClose()
                }
            } catch (error) {
                console.log(error)
                notifyError(error.response.data.message)
            }
        }
    }
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };
    useEffect(() => {
        (async () => {
            const res = await getProductDetail(product.id)
            for (let i = 0; i < res.productSizes.length; i++) {
                if (res.productSizes[i].quantity > 0) {
                    setProductSize({ id: res.productSizes[i].id, size: res.productSizes[i].size })
                    setProductSizeColors(res.productSizes[i].productSizeColors)
                    for (let j = 0; j < res.productSizes[i].productSizeColors.length; j++) {
                        if (res.productSizes[i].productSizeColors[j].quantity > 0) {
                            setProductSizeColor(res.productSizes[i].productSizeColors[j])
                            break;
                        }
                    }
                    break;
                }
            }
            setDetailProduct(res)
        })()
    }, [])
    const handleChangeProductSize = (item) => {
        if (item.id !== productSize?.id) {
            setProductSize({ id: item.id, size: item.size })
            setProductSizeColors(item.productSizeColors)
            setQuantity(1)
            for (let i = 0; i < item.productSizeColors.length; i++) {
                if (item.productSizeColors[i].quantity > 0) {
                    setProductSizeColor(item.productSizeColors[i])
                    break;
                }
            }
        }

    }
    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <div onClick={(e) => {
                    e.stopPropagation();
                }} className='p-4 w-[90%] max-w-[800px] bg-white '>

                    <div
                        className=' w-full h-[380px] overflow-hidden flex justify-around items-center '>
                        <div className='w-[50%] bg-black'>
                            {/* <img src={product.image} alt={product.name} className='w-full h-full object-cover' /> */}
                            {detailProduct ? <SlideImages images={detailProduct.detailProduct.images} /> : ""}
                        </div>
                        <div className='text-black pl-[20px] flex flex-col justify-between h-full w-[50%]'>
                            <h1 className='font-bold text-[20px]'>{product.name}</h1>
                            <div className='flex justify-between items-center'>

                                <div className='flex flex-col text-[15px]'>
                                    <div><span className='font-medium opacity-80    '>Category:</span> <span className='font-normal italic'>
                                        {detailProduct?.subCategory?.name}
                                    </span>
                                    </div>
                                    <div><span className='font-medium opacity-80    '>Color:</span> <span className='font-normal italic'>
                                        {detailProduct?.detailProduct?.color}
                                    </span>
                                    </div>
                                    <div><span className='font-medium opacity-80    '>Warranty:</span> <span className='font-normal italic'>
                                        {detailProduct?.detailProduct?.warranty}
                                    </span>
                                    </div>
                                    <div><span className='font-medium opacity-80    '>Brand:</span> <span className='font-normal italic'>
                                        {detailProduct?.detailProduct?.brand}
                                    </span>
                                    </div>
                                </div>
                                <div className=' text-red-600 border-2 border-red-600 font-bold flex flex-col items-center justify-center w-[70px] h-[70px] rounded-full'>
                                    <div>Sales</div>
                                    {product.percent}%
                                </div>

                            </div>
                            <div className='flex gap-2 flex-wrap'>
                                {
                                    productSizeColors?.map((item) => {
                                        return item.quantity > 0 ? <div key={item.id} onClick={() => {
                                            setQuantity(1)
                                            setProductSizeColor(item)
                                        }} className={`${productSizeColor.id === item.id ? "border-2 bg-clip-content" : ""} shadow-inner p-[1px] w-[30px] h-[30px] rounded-full cursor-pointer  border-red-600`} style={{ backgroundColor: item.color.color }}></div> : <Tooltip title="Sản phẩm đã hết"><div key={item.id} className='w-[30px] cursor-not-allowed h-[30px] rounded-full opacity-50' style={{ backgroundColor: item.color.color }}></div></Tooltip>
                                    })
                                } </div>
                            <div>
                                <div className='flex justify-between font-bold'>
                                    <p className='line-through opacity-70'>{convertMoney(product.price)}</p>
                                    <p className='text-red-600'>{convertMoney(product.price - product.price * product.percent / 100)}</p>
                                </div>
                                <Divider />
                                {productSize === null ? "" : <><div><span className='mr-5'>
                                    <span className='font-medium opacity-80    '>Size:</span> <span className='font-normal italic'>
                                        {productSize?.size?.name}
                                    </span>
                                </span>
                                    <span className='font-medium opacity-80    '>Color:</span> <span className='font-normal italic'>
                                        {productSizeColor?.color?.name}
                                    </span>
                                </div>
                                    <div><span className='font-medium opacity-80    '>Số lượng còn lại:</span> <span className='font-normal italic'>
                                        {productSizeColor?.quantity}
                                    </span>
                                    </div></>}
                                <div className='flex flex-wrap'>
                                    {detailProduct?.productSizes?.length > 1 ?
                                        detailProduct?.productSizes?.map((item) => {

                                            return item.quantity > 0 ? (<div key={item.id} onClick={() => handleChangeProductSize(item)}
                                                className={`cursor-pointer flex items-center justify-center px-1 mb-2 mr-2 min-w-[40px] h-[40px] rounded-md ${item.id === productSize?.id ? "border-red-500 border-4" : "border-black opacity-85 border-2"}`}>{item?.size.name}</div>)
                                                : (<Tooltip title="Sản phẩm đã hết">
                                                    <div key={item.id}
                                                        className={`cursor-not-allowed opacity-50 flex items-center justify-center mb-2 mr-2 min-w-[40px] h-[40px] rounded-md border-black border-2`}>{item?.size.name}</div>
                                                </Tooltip>)
                                        }) : ""
                                    }
                                </div>
                            </div>
                            <div>
                                {detailProduct === null ? " " : (productSize === null ? <h1 className='text-red-600 font-medium'>This product is out of stock. I sorry about that</h1> :
                                    (<div className='flex'>
                                        <FormControl sx={{ width: "50%" }} >
                                            <InputLabel id="demo-simple-select-label">Quantity</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="select-quantity-detailproduct"
                                                value={quantity}
                                                label="Quantity"
                                                onChange={handleChangeQuantity}
                                            >
                                                {
                                                    Array.from({ length: productSizeColor?.quantity }, (_, index) => index + 1).map((item) => (

                                                        <MenuItem value={item}>{item}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                        <button onClick={handleAddProductToCart} className=' w-full ml-2 bg-black text-white font-bold transition-all hover:opacity-70'>Add to cart </button>
                                    </div>))
                                }
                            </div>
                        </div>
                    </div >
                </div>
            </Backdrop >
        </div >
    )
}
