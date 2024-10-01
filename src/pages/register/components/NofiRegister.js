import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function NofiRegister({ open, setOpen, isEmail }) {

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Thông báo đăng ký</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {isEmail === true ? 'Thông tin xác thực đã gửi về email. Vui lòng kiểm tra email để hoàn tất đăng ký' : 'Đã hoàn tất đăng ký với số điện thoại. Chuyển hướng đến trang đăng nhập.'}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {isEmail === false ? <Link to={"/login"} onClick={handleClose} className='p-1 border border-black'>Đi tới đăng nhập</Link> : ''}
            </DialogActions>
        </Dialog>
    );
}
