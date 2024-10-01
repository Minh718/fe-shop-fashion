import ReplyIcon from '@mui/icons-material/Reply';
import { Divider, Pagination, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductOfCart, removeProductFromCart } from '../../api/cartService';
import { saveOrder } from '../../api/orderService';
import { notifyError } from '../../common/toastNotify/toastNotify';
import { checkoutProducts } from '../../api/checkoutService';
import Breadcrumbsv from '../../common/breadcrumbsv/Breadcrumbsv';
import InfoOrder from './components/InfoOrder';
import ProductCart from './components/ProductCart';
import { useDispatch, useSelector } from 'react-redux';

import { paymentMethodEnum } from '../../enums/enum';
import InputVoucher from './components/InputVoucher';
import DisplayVouchers from './components/DisplayVouchers';
import convertMoney from '../../utils/convertMoney';
import Loading from '../../common/loading/Loading';
import { setStatusCart } from '../../features/user/userSlice';
const links = {
    'Home': '/',
    'Cart': '/cart'

}

export default function Cart() {
    const [isContinuted, setIsContinuted] = React.useState(false);
    const [currentCode, setCurrentCode] = React.useState(null);
    const [page, setPage] = React.useState(0);
    const [cartProductSizeColors, setCartProductSizeColors] = React.useState(null);
    const [choosedCpss, setChoosedCpss] = React.useState([]);
    const [metadata, setMetadata] = React.useState(null);
    const dispatch = useDispatch()
    const [checkout, setCheckout] = React.useState({
        totalPrice: 0,
        paymentFee: 0,
        discount: 0,
    });
    const navigate = useNavigate()
    const handleAddChoosedCps = (data) => {
        const newChoosedCpss = [...choosedCpss, data];

        setChoosedCpss(newChoosedCpss)
    }
    const handleChangePage = async (value) => {
        if (page !== value) {
            const res = await getAllProductOfCart(value - 1);
            setCartProductSizeColors(res.result);
            setMetadata(res.metadata);
            setPage(value);
        }
    }
    const handleRemoveChoosedCps = (id) => {
        setChoosedCpss(choosedCpss.filter(cps => cps.id !== id));
    }
    const handleProccessingOrder = async (data) => {
        try {
            const res = await saveOrder({ ...data, checkoutRes: checkout, checkoutReq: { code: currentCode, items: choosedCpss } });
            if (res.payment.paymentMethod === paymentMethodEnum.VNPAY) {
                window.location.href = res.urlPayment;
            }
            else {
                console.log(res)
                navigate("/order-success", { state: { order: res } });
            }
        } catch (error) {
            notifyError(error.response.data.message);
        }

    }
    const handleCheckout = async () => {
        try {
            const res = await checkoutProducts({ code: currentCode, items: choosedCpss });
            setCheckout(res);
        } catch (error) {
            setCurrentCode(null);
            notifyError(error.response.data.message);
        }
    }
    const handleRemoveProduct = async (cpsId) => {
        try {
            await removeProductFromCart(cpsId);
            if (choosedCpss.some(cps => cps.id === cpsId)) {
                setChoosedCpss(choosedCpss.filter(cps => cps.id !== cpsId));
            }
            setCartProductSizeColors(cartProductSizeColors.filter(cps => cps.id !== cpsId));
        } catch (err) {
            notifyError(err.response.data.message);
        }
    }
    React.useEffect(() => {
        handleChangePage(1);
        dispatch(setStatusCart(false));
        window.scrollTo(0, 0);
    }, []);

    React.useEffect(() => {
        if (choosedCpss.length === 0) {
            setCheckout({
                totalPrice: 0,
                paymentFee: 0,
                discount: 0,
            })
        } else handleCheckout();
    }, [choosedCpss, currentCode, handleCheckout]);
    if (cartProductSizeColors === null) return <Loading />
    return (
        <div className="flex justify-center">

            <Box sx={{ flexGrow: 1 }} className="w-[90%] max-w-[1200px] h-[85vh] overflow-hidden">
                <Breadcrumbsv links={links} />
                {isContinuted ? <InfoOrder checkout={checkout} setIsContinuted={setIsContinuted} handleProccessingOrder={handleProccessingOrder} /> :
                    <Grid container spacing={3} className="p-2">
                        <Grid xs={5.7} md={7.5} className="border-2 mr-4">
                            <div className='flex justify-between items-start'>
                                <h1 className='font-bold text-[22px]'>Giỏ hàng</h1>
                                <i>Tổng: {choosedCpss.length}</i>
                            </div>
                            <Divider />
                            <div className='py-3 h-[60vh] overflow-y-scroll'>
                                {
                                    cartProductSizeColors.map((cartProductSizeColor) => (
                                        <ProductCart handleRemoveProduct={handleRemoveProduct} setChoosedCpss={setChoosedCpss} key={cartProductSizeColor.id} choosedCpss={choosedCpss} {...cartProductSizeColor} handleRemoveChoosedCps={handleRemoveChoosedCps} handleAddChoosedCps={handleAddChoosedCps} />
                                    ))
                                }
                                {cartProductSizeColors.length === 0 && <h1 className='text-center'>There are no products in the cart. Shopping <Link to={"/products/news"} className='underline italic'>here</Link></h1>}
                            </div>
                            <Stack spacing={2}>
                                <Pagination onChange={(e, value) => handleChangePage(value)} page={page} count={metadata.totalPages} variant="outlined" shape="rounded" />
                            </Stack>
                        </Grid>
                        <Grid xs={6} md={4} className="border-2">
                            <h1 className='font-bold text-[22px]'>Thông tin đơn hàng</h1>
                            <Divider />
                            <div className='mb-10'>
                                <div className='flex justify-between items-center mt-2'>
                                    <h1 >Tạm tính:</h1>
                                    <span className='font-bold  '>{convertMoney(checkout.totalPrice)}</span>
                                </div>
                                <div className='flex justify-between items-center mt-2'>
                                    <h1 >Giảm giá:</h1>
                                    <span className='font-bold  '>{convertMoney(checkout.discount)}</span>
                                </div>
                                <div className='flex justify-between items-center my-2'>
                                    <h1 >Phí vận chuyển:</h1>
                                    <span className='font-bold  '>$0</span>
                                </div>
                                <Divider />
                                <div className='flex justify-between items-center'>
                                    <h1 >Tổng tiền:</h1>
                                    <span className='font-bold  '>{convertMoney(checkout.paymentFee)}</span>
                                </div>
                                <div className='flex items-center flex-col'>
                                    <button onClick={() => {
                                        if (choosedCpss.length === 0) return;
                                        setIsContinuted(true)
                                    }} className={`${choosedCpss.length === 0 ? " cursor-not-allowed opacity-80" : ""} w-full my-5 border px-6 py-2 bg-black text-white font-bold`}>Tiếp tục</button>
                                    <Link > <ReplyIcon /> Tiếp tục mua hàng</Link>
                                </div>

                            </div>
                            <Divider />
                            <div className='py-2'>
                                <InputVoucher setCurrentCode={setCurrentCode} handleCheckout={handleCheckout} />
                                <DisplayVouchers setCurrentCode={setCurrentCode} />
                            </div>
                        </Grid>
                    </Grid>
                }
            </Box>
        </div>
    )
}
