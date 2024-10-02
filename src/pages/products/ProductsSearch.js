import React, { useState } from 'react'
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom';
import DisplayProducts from './components/DisplayProducts';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { searchProducts } from '../../api/productSerivce';
const links = {
  'Home': '/',
  "Products": '#',
  'Search': '#'

}
const sorts = [{
  name: "Newest",
  sortBy: "createdDate",
  order: "desc"
},
{
  name: 'Oldest',
  sortBy: "createdDate",
  order: "asc"
},
{
  name: (<>Price  <KeyboardDoubleArrowDownIcon className='ml-2' /> </>),
  sortBy: "price",
  order: "desc"
},
{
  name: (<>Price  <KeyboardDoubleArrowUpIcon className='ml-2' /> </>),
  sortBy: "price",
  order: "asc"
}
]
export default function ProductsSearch() {
  const { metadata, result } = useLoaderData();
  const [products, setProducts] = useState(result);
  const [page, setPage] = React.useState(metadata.currentPage + 1);
  const [sortBy, setSortBy] = React.useState('createdDate');
  const [order, setOrder] = React.useState('desc');
  const [queryParameters] = useSearchParams()
  const query = queryParameters.get('query')
  const handleChangePage = async (event, value) => {
    if (page !== value) {
      const res = await searchProducts({ query, sortBy: sortBy, order: order, page: value - 1 });
      setProducts(res.result);
      setPage(value);
    }
  }
  const handleSortProducts = async (sort) => {
    if (sort.order === 'asc') {
      if (sort.sortBy === "price") {
        products.sort((a, b) => a.price - b.price);
      } else if (sort.sortBy === "name") {
        products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort.sortBy === "createdDate") {
        products.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));
      }
    } else {
      if (sort.sortBy === "price") {
        products.sort((a, b) => b.price - a.price);
      } else if (sort.sortBy === "name") {
        products.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sort.sortBy === "createdDate") {
        products.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
      }
    }
    setProducts([...products]);
  };

  return (
    <div className="flex justify-center">

      <DisplayProducts page={page} handleSortProducts={handleSortProducts} products={products} metadata={metadata} name={"Answer of search: " + query} handleChangePage={handleChangePage} links={links} />
    </div>
  )
}
