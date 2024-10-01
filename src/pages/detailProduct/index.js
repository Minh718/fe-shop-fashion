import React, { useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import convertMoney from "../../utils/convertMoney";
import { Divider, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import Breadcrumbsv from "../../common/breadcrumbsv/Breadcrumbsv";
import { getProductDetail } from "../../api/productSerivce";
import { addProductToCart } from "../../api/cartService";
import { notifyError, notifySuccess } from "../../common/toastNotify/toastNotify";
import { setStatusCart } from "../../features/user/userSlice";
const links = {
    'Home': '/',
    'Products': '/products/news',
    'Product Detail': '#'

}
const ProductDetailPage = () => {
    const [detailProduct, setDetailProduct] = React.useState(null)
    const [productSize, setProductSize] = React.useState(null)
    const [productSizeColors, setProductSizeColors] = React.useState(null)
    const [productSizeColor, setProductSizeColor] = React.useState(null)
    const [quantity, setQuantity] = React.useState(1);
    const { isAuthenticated } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleAddProductToCart = async () => {
        if (isAuthenticated === null) {
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
                    navigate('/cart')
                }
            } catch (error) {
                notifyError(error.response.data.message)
            }
        }
    }
    const handleChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };
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
    let { id } = useParams();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        (async () => {
            const res = await getProductDetail(id)
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
    }, [id])
    return (
        <div className="max-w-6xl min-h-[80vh] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbsv links={links} />
            <h1 className='font-bold text-[35px]'>Details product</h1>
            {detailProduct ? <div className="flex flex-col lg:flex-row">
                {/* Product Image Section */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                    <div className="relative">
                        <img
                            src={detailProduct.image}
                            alt={detailProduct.name}
                            className="w-full h-[65vh] object-cover rounded-lg shadow-lg"
                        />
                        <button
                            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md"
                            aria-label="Zoom product image"
                        >
                            <FavoriteIcon className="text-gray-600 text-xl" />
                        </button>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4">
                        {detailProduct?.detailProduct.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={img}
                                className="w-full h-32 object-cover rounded-lg shadow cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="lg:w-1/2 lg:pl-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{detailProduct.name}</h1>
                    <div className="flex items-center mb-4">
                        <span className="text-3xl font-bold text-gray-900">{convertMoney(detailProduct.price * (100 - detailProduct.percent) / 100)}</span>
                        <span className="ml-2 text-lg text-gray-500 line-through">{convertMoney(detailProduct.price)}</span>
                        <span className="ml-2 text-lg font-semibold text-green-600">
                            {detailProduct.percent}% OFF
                        </span>
                    </div>
                    <p className="text-gray-600 mb-3">{detailProduct.description}</p>
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold mb-2">Product Details:</h2>
                        <ul className="list-disc list-inside text-gray-600 flex gap-5">
                            <div>

                                <li>Material: {detailProduct.detailProduct.material}</li>
                                <li>Origin: {detailProduct.detailProduct.origin}</li>
                                <li>Warranty: {detailProduct.detailProduct.warranty}</li>
                            </div>
                            <div>

                                <li>Brand: {detailProduct.brand.name}</li>
                                <li>Model: {detailProduct.detailProduct.model}</li>
                                <li>Manufacturing Location: {detailProduct.detailProduct.madeIn}</li>
                            </div>
                        </ul>
                    </div>
                    {detailProduct?.productSizes?.length > 1 && <div className="mb-3">
                        <h2 className="text-lg font-semibold mb-2">Select Size:</h2>
                        <div className="flex flex-wrap gap-2">
                            {detailProduct?.productSizes?.map((item) => {

                                return item.quantity > 0 ? (<div key={item.id} onClick={() => handleChangeProductSize(item)}
                                    className={`cursor-pointer flex items-center justify-center mb-2 mr-2 min-w-[40px] px-1 h-[40px] rounded-md ${item.id === productSize?.id ? "border-red-500 border-4" : "border-black opacity-85 border-2"}`}>{item?.size.name}</div>)
                                    : (<Tooltip title="Sản phẩm đã hết">
                                        <div key={item.id}
                                            className={`cursor-not-allowed opacity-50 flex items-center justify-center mb-2 mr-2 px-1 min-w-[40px] h-[40px] rounded-md border-black border-2`}>{item?.size.name}</div>
                                    </Tooltip>)
                            })}
                        </div>
                    </div>}
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
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold mb-2">Select Color:</h2>
                        <div className="flex flex-wrap gap-2">
                            {
                                productSizeColors?.map((item) => {
                                    return item.quantity > 0 ? <div key={item.id} onClick={() => {
                                        setQuantity(1)
                                        setProductSizeColor(item)
                                    }} className={`${productSizeColor.id === item.id ? "border-2 bg-clip-content" : ""} shadow-inner p-[1px] w-[30px] h-[30px] rounded-full cursor-pointer  border-red-600`} style={{ backgroundColor: item.color.color }}></div> : <Tooltip title="Sản phẩm đã hết"><div key={item.id} className='w-[30px] cursor-not-allowed h-[30px] rounded-full opacity-50' style={{ backgroundColor: item.color.color }}></div></Tooltip>
                                })
                            }
                        </div>
                    </div>
                    <div className="mb-3">
                        <h2 className="text-lg font-semibold mb-2">Quantity:</h2>
                        <div>
                            {detailProduct === null ? " " : (productSize === null ? <h1 className='text-red-600 font-medium'>This product is out of stock. I sorry about that</h1> :
                                (<div className='flex'>
                                    <FormControl sx={{ width: "20%" }} >
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
                                </div>))
                            }
                        </div>
                    </div>
                    <button
                        className="w-full bg-gray-900 text-white py-3 px-6 rounded-md font-semibold hover:bg-gray-800 transition duration-300 flex items-center justify-center"
                        onClick={handleAddProductToCart}
                    >
                        <ShoppingCartIcon className="mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div> : <h1>Loading...</h1>}
        </div>
    );
};

export default ProductDetailPage;
