import React from 'react';
import { useNavigate } from 'react-router-dom';

const useChkLogin = () => {
    const navigate = useNavigate();

    const chkLogin = () => {
        const isLoggedIn = true;
        console.log(isLoggedIn);
        if (isLoggedIn){
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    return chkLogin;
};

export default useChkLogin;