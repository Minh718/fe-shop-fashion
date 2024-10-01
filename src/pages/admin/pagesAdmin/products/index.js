import React, { useEffect } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Button, ButtonGroup, FormControl, FormControlLabel, InputLabel, Menu, MenuItem, Pagination, Paper, Select, Stack, styled, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import Breadcrumbsv from '../../../../common/breadcrumbsv/Breadcrumbsv';
import RowProduct from './components/RowProduct';
import { baseURL } from '../../../../constants/baseURL';
import { notifyError } from '../../../../common/toastNotify/toastNotify';
import { getAllCategories } from '../../../../api/categoryService';
import { getProductsForAdminTable, getProductsForAdminTableByCategory, getProductsForAdminTableBySubCategory } from '../../../../api/productSerivce';
const products1 = [
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },
    {
        id: 1,
        name: "Product 1",
        price: 100,
        image: "https://picsum.photos/200/300",
        status: true,
        totalSales: 100,
        totalRevenue: 10000,
    },

]
const categories2 = [
    {
        id: 1,
        name: "ao",
        subCategories: [{
            id: 1,
            name: "ao thun"

        },
        {
            id: 2,
            name: "ao am"

        }]
    },
    {
        id: 2,
        name: "ao",
        subCategories: [{
            id: 3,
            name: "ao thun"

        }]
    }
]
const links = {
    'Home': '/admin/dashboard',
    'Products': '/admin/products'

}
export default function ProductsAdmin() {
    const [page, setPage] = React.useState(1);
    const [size, setSize] = React.useState(10);
    const [sortBy, setSortBy] = React.useState("createdDate");
    const [order, setOrder] = React.useState("desc");
    const [idCategory, setIdCategory] = React.useState("all");
    const [idSubCategory, setIdSubCategory] = React.useState("all");
    const [metadata, setMetadata] = React.useState(null);
    const [products, setProducts] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [subCategories, setSubCategories] = React.useState([]);
    useEffect(() => {
        (async () => {
            try {
                const res = await getAllCategories();
                setCategories(res);
            }
            catch (err) {
                notifyError(err.response.data.message)
            }
        }
        )();
    }, [])

    useEffect(() => {
        (async () => {
            try {
                let res;
                if (idCategory !== "all") {
                    // fetch subcategories
                    if (idSubCategory !== "all") {
                        res = await getProductsForAdminTableBySubCategory({ page: page - 1, size, sortBy, order }, idSubCategory);
                    }
                    else res = await getProductsForAdminTableByCategory({ page: page - 1, size, sortBy, order }, idCategory);
                } else {
                    res = await getProductsForAdminTable({ page: page - 1, size, sortBy, order });
                }
                setProducts(res.result);
                setMetadata(res.metadata);
            }
            catch (err) {
                notifyError(err.response.data.message)
            }
        }
        )();
    }, [size, page, sortBy, order, idCategory, idSubCategory])
    const handleChangeCategory = (e) => {
        setIdCategory(e.target.value);
        setIdSubCategory("all");
        setPage(1)
        const category = categories.find((category) => category.id === e.target.value);
        setSubCategories(category?.subCategories);
    }

    const handleChangeSubCategory = (e) => {
        setIdSubCategory(e.target.value);
        setPage(1);
    }
    const handleChangePage = async (event, value) => {
        if (page !== value) {
            setPage(value);
        }
    }
    return (
        <div >
            <div className='flex justify-between'>
                <Breadcrumbsv links={links} />
                <Link to={"/admin/product/add"} className='border-2 p-2 text-white font-bold bg-blue-500'>Add new product</Link>
            </div>
            <div className='flex justify-between mb-2'>
                <div className='flex items-center'>
                    <span className='font-bold pr-2'>Filter: </span>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="Categories-lable">Categories</InputLabel>
                        <Select
                            value={idCategory}
                            onChange={handleChangeCategory}
                            label="Categories"
                        >
                            <MenuItem value="all">
                                All
                            </MenuItem>
                            {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {idCategory !== "all" ? <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="SubCategories-lable">SubCategories</InputLabel>
                        <Select
                            value={idSubCategory}
                            onChange={handleChangeSubCategory}
                            label="SubCategories"
                            className='capitalize'
                        >
                            <MenuItem value="all">
                                All
                            </MenuItem>
                            {subCategories.map((SubCategory) => <MenuItem className='capitalize' key={SubCategory.id} value={SubCategory.id}>{SubCategory.name}</MenuItem>)}
                        </Select>
                    </FormControl> : ""}

                    {/* <select onChange={handleChangeCategory} className='min-w-[100px]'>
                <option value={null}  >All</option>
                {categories.map((category) => <option value={category.id}>{category.name}</option>)}
            </select> */}
                </div>
                <div className='flex items-center'>
                    <span className='font-bold pr-2'>Sizes: </span>
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
                        {/* <InputLabel id="Pages-lable">Page</InputLabel> */}
                        <Select
                            value={size}
                            onChange={(e) => {
                                setSize(e.target.value)
                                setPage(1)
                            }}
                            label="Sizes"
                        >
                            <MenuItem value={10}>
                                10
                            </MenuItem>
                            <MenuItem value={15}>
                                15
                            </MenuItem>
                            <MenuItem value={20}>
                                20
                            </MenuItem>
                            <MenuItem value={25}>
                                25
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <TableContainer component={Paper} className='mb-2'>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align='center' sx={{ padding: "4px" }} >Id</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Image</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Name</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Price</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Status</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Total sales</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Total revenue</TableCell>
                            <TableCell align='center' sx={{ padding: "4px" }} >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <RowProduct product={product} products={products} setProducts={setProducts} key={product.id} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {metadata ? <div className='flex justify-end'>
                <Stack spacing={2}>
                    <Pagination onChange={handleChangePage} page={page} count={metadata.totalPages} variant="outlined" shape="rounded" />
                </Stack>
            </div>
                : ""}
        </div>
    )
}

