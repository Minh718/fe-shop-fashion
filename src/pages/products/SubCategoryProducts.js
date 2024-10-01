import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { getPublicProductsBySubCategory } from '../../api/productSerivce';
import DisplayProducts from './components/DisplayProducts';
const links = {
    'Home': '/',
    "Products": '#',
    'SubCategory': '#'
}
export default function SubCategoryProducts() {
    let { thump } = useParams();
    const { metadata, result } = useLoaderData();
    const [products, setProducts] = useState(result);
    const [page, setPage] = React.useState(metadata.currentPage + 1);
    const [sortBy, setSortBy] = React.useState('createdDate');
    const [order, setOrder] = React.useState('desc');
    const handleChangePage = async (event, value) => {
        if (page !== value) {
            const res = await getPublicProductsBySubCategory({ thump, sortBy: sortBy, order: order, page: value - 1 });
            setProducts(res.result);
            setPage(value);
        }
    }
    const handleSortProducts = async (sort) => {
        if (sortBy === sort.sortBy && order === sort.order) return;
        setSortBy(sort.sortBy);
        setOrder(sort.order);
        setPage(1);
        const res = await getPublicProductsBySubCategory({ thump, sortBy: sort.sortBy, order: sort.order });
        console.log(res.result)
        setProducts(res.result);
    }
    useEffect(() => {
        setProducts(result)
        setPage(metadata.currentPage + 1)
        setOrder('desc')
        setSortBy('createdDate')
    }, [result])
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="flex justify-center">
            {products.length === 0 ? <h1 className='text-3xl font-bold h-[70vh] flex items-center justify-center'>No products</h1> :
                <DisplayProducts page={page} handleSortProducts={handleSortProducts} products={products} metadata={metadata} name={thump + " products"} handleChangePage={handleChangePage} links={links} />}
        </div>
    )
}
