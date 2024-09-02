import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const LogoutIcon = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token de acceso del localStorage
        localStorage.removeItem('accessToken');

        // Redirige al usuario a la página de inicio
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                padding: '0'
            }}
        >
            <FaSignOutAlt
                size={18}
                style={{ color: '#96BEBC' }} // Gris claro
            />
        </button>
    );
};

export default LogoutIcon;
