import React, { useEffect, useState } from "react";
import '../styles/styles.css';
import useRedirection from '../hooks/useRedirection';
import Button from 'react-bootstrap/Button';

export const ActionButton = ({ text, path, delay, type }) => {
    const { redirect, isRedirecting } = useRedirection(path, delay);
    const [buttonClass, setButtonClass] = useState('');

    const handleClick = () => {
        if (!isRedirecting) {
            // Realizar acciones adicionales si es necesario antes de la redirección
            redirect();
        }
    };

    useEffect(() => {
        switch (type) {
            case 'primary':
                setButtonClass('btn btn-primary');
                break;
            case 'secondary':
                setButtonClass('btn btn-warning');
                break;
            case 'danger':
                setButtonClass('btn btn-danger');
                break;
            case 'success':
                setButtonClass('btn btn-success');
                break;
            default: setButtonClass('btn btn-primary');
        }
    }, [type]);


    return (
        <Button className={buttonClass} onClick={handleClick} disabled={isRedirecting}>{text}</Button>
    );
};