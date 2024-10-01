import { Box, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import { getOrders } from '../../api/orderService';
import Breadcrumbsv from '../../common/breadcrumbsv/Breadcrumbsv';
import { OrderStatus, ShippingStatus } from '../../enums/enum';
import Loading from '../../common/loading/Loading';
import { notifyError } from '../../common/toastNotify/toastNotify';
const links = {
    'Home': '/',
    'Cart': '/order'

}
export default function Order() {
    const [page, setPage] = React.useState(0);
    const [orders, setOrders] = React.useState(null)
    const [metadata, setMetadata] = React.useState(null);

    const handleChangePage = async (value) => {
        if (page !== value) {
            try {

                const res = await getOrders(value - 1);
                setOrders(res.result);
                setMetadata(res.metadata);
                setPage(value);
            } catch (e) {
                notifyError("Error when get orders")
            }
        }
    }
    React.useEffect(() => {
        handleChangePage(1);
        window.scrollTo(0, 0);
    }, []);
    if (orders === null) return <Loading />

    return (
        <div className="flex justify-center">

            <Box sx={{ flexGrow: 1 }} className="w-[90%] max-w-[1200px] h-[85vh] overflow-hidden">
                <Breadcrumbsv links={links} />
                <h1 className='font-bold text-[22px] py-2'>Đơn hàng</h1>
                <TableContainer component={Paper} className='mb-2'>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">FullName</TableCell>
                                <TableCell align="left">Phone</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Order status</TableCell>
                                <TableCell align="left">Shipping status</TableCell>
                                <TableCell align="left">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.fullName}
                                    </TableCell>
                                    <TableCell align="left">{order.phone}</TableCell>
                                    <TableCell align="left">{new Date(order.createdAt).toDateString()}</TableCell>
                                    <TableCell align="left"><span className={order.orderStatus === OrderStatus.PENDING ? "text-orange-400 font-bold"
                                        : order.orderStatus === OrderStatus.CANCELED ? "text-red-600 font-bold" : "text-green-500 font-bold"}>{order.orderStatus}</span></TableCell>
                                    <TableCell align="left"><span className={order.shippingStatus === ShippingStatus.NOT_SHIPPED ? "text-orange-400 font-bold"
                                        : order.shippingStatus === ShippingStatus.RETURNED ? "text-red-600 font-bold" : "text-green-500 font-bold"}>{order.shippingStatus}</span></TableCell>
                                    <TableCell align="left" className='flex'>
                                        <button onClick={() => {
                                            if (order.orderStatus === OrderStatus.PENDING) {
                                                console.log(order.urlPayment)
                                                window.location.href = order.urlPayment
                                            }
                                        }} className={`bg-red-600 font-bold text-white border-2 border-red-600 px-3 py-2 rounded-md transition-all
                                        ${order.orderStatus === OrderStatus.PENDING ? "hover:text-red-600 hover:bg-white" : "cursor-not-allowed opacity-50"}`}>Make payment</button>
                                        <Link to={`/order/${order.id}`}>
                                            <button className='bg-blue-500 text-white px-3 py-2 rounded-md ml-2'>Detail</button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2}>
                    <Pagination onChange={(e, value) => handleChangePage(value)} page={page} count={metadata.totalPages} variant="outlined" shape="rounded" />
                </Stack>
            </Box>
        </div>
    )
}
