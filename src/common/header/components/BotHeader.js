import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../../api/categoryService';


function BotHeader() {
  const [categories, setCategories] = React.useState([])
  React.useEffect(() => {
    (async () => {
      const data = await getAllCategories()
      setCategories(data);
    })();
  }, [])
  return (
    <div className=' p-1  flex justify-center items-center bg-white shadow-md'>
      <ul className='max-w-4xl flex justify-center items-center'>
        <li
          key={"news"}
          className='underline-hover group relative px-4 py-2 cursor-pointer transition-opacity'
        >
          <Link to={"/products/news"} className='z-30 group-hover:text-red-600 font-bold uppercase'>News</Link>
        </li>
        {categories?.map((categorory) => (
          <li
            key={categorory.id}
            className='underline-hover group relative px-4 py-2 cursor-pointer transition-opacity'
          >
            <div className='z-30 group-hover:text-red-600 font-bold uppercase'>
              {categorory.name} <ExpandMoreIcon className='ml-1' />
            </div>
            <div
              className={`shadow-md absolute left-4 top-full hidden w-[140px] group-hover:block font-medium text-[13px] bg-white transition-all`}
            >
              {categorory.subCategories?.map((subCategory) => (
                <div
                  key={subCategory.id}
                  className={`px-2 py-2 hover:bg-gray-100 transition-all`}
                >
                  <Link to={"/products/" + subCategory.thump} className={`uppercase hover:text-red-600 flex justify-betwee`}>
                    {subCategory.name}
                  </Link>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BotHeader;
