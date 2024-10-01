import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom';
import { Box, Divider, Pagination, Stack } from '@mui/material';
import { getPublicProducts } from '../../api/productSerivce';
import DisplayProducts from './components/DisplayProducts';
const links = {
    'Home': '/',
    "Products": '#',
    'News': 'products/news'

}
export default function News() {
    const { metadata, result } = useLoaderData();
    const [products, setProducts] = useState(result);
    const [page, setPage] = React.useState(metadata.currentPage + 1);
    const [sortBy, setSortBy] = React.useState('createdDate');
    const [order, setOrder] = React.useState('desc');


    const handleChangePage = async (event, value) => {
        if (page !== value) {
            const res = await getPublicProducts({ sortBy: sortBy, order: order, page: value - 1 });
            setProducts(res.result);
            setPage(value);
        }
    }

    const handleSortProducts = async (sort) => {
        if (sortBy === sort.sortBy && order === sort.order) return;
        setSortBy(sort.sortBy);
        setOrder(sort.order);
        setPage(1);
        const res = await getPublicProducts({ sortBy: sort.sortBy, order: sort.order });
        setProducts(res.result);
    }
    return (
        <div className="flex justify-center">

            <DisplayProducts page={page} handleSortProducts={handleSortProducts} products={products} metadata={metadata} name="New Products." handleChangePage={handleChangePage} links={links} />
        </div>
    )
}
