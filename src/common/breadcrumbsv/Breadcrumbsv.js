import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

function handleClick(event) {
    event.preventDefault();
}

export default function Breadcrumbsv({ links }) {
    return (
        <div role="presentation" className='pt-2' onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                {Object.keys(links).map((key, index) => (
                    <Link underline="hover" color="inherit" to={links[key]} key={index}>
                        {key}
                    </Link>
                ))}
            </Breadcrumbs>
        </div>
    );
}
