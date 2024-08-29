// useRedirection.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirection = (path, delay) => {
    const navigate = useNavigate();
    const [isRedirecting, setRedirecting] = useState(false);

    const redirect = () => {
        setRedirecting(true);
        setTimeout(() => {
            navigate(path);
        }, delay);
    };

    useEffect(() => {
        if (isRedirecting) {

            const timeoutId = setTimeout(() => {
                navigate(path);
            }, delay);

            return () => clearTimeout(timeoutId);
        }
    }, [isRedirecting, path, delay, navigate]);

    return { redirect, isRedirecting };
};

export default useRedirection;