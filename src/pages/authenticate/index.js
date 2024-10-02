import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { setUserInfo } from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { userLoginByGoogle } from "../../api/authenthicateApi";

export default function Authenticate() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(state => state.user);
    const [queryParameters] = useSearchParams()
    useEffect(() => {
        // console.log(window.location.href);

        // const authCodeRegex = /code=([^&]+)/;
        // const isMatch = window.location.href.match(authCodeRegex);

        if (queryParameters.get("code")) {
            const authCode = queryParameters.get("code");
            (async () => {
                try {
                    const result = await userLoginByGoogle(authCode);
                    dispatch(setUserInfo(result))
                    Cookies.set('accessToken', result.accessToken);
                    Cookies.set('refreshToken', result.refreshToken);
                    Cookies.set('x-user-id', result.id);
                } catch (err) {
                    navigate("/login")
                }
            })();
        }
    }, []);
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home");
        }
    }, [isAuthenticated, navigate]);
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <CircularProgress></CircularProgress>
                <Typography>Authenticating...</Typography>
            </Box>
        </>
    );
}