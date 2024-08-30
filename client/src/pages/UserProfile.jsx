import React, { useEffect, useState } from 'react';
import { getprofile } from '../utils/getprofile';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const token = localStorage.getItem("token");
    useEffect(() => {

        const loadUserProfile = async () => {
            const result = await getprofile(token);
            if (result.success) {

                setProfile(result.data);

            } else {
                setProfile(null);
            }
        };

        loadUserProfile();
    }, []);

    if (!profile) {
        return <p>No se pudo cargar el perfil. Por favor, inténtalo de nuevo más tarde.</p>;
    }

    return (
        <div>
            <h1>Perfil de {profile.name}</h1>
            <p>Nombre: {profile.name}</p>
            <p>Email: {profile.email}</p>
            <h2>Mascotas</h2>
            <ul>
                {profile.pets.length > 0 ? (
                    profile.pets.map((pet, index) => (
                        <li key={index}>{pet.name}</li>
                    ))
                ) : (
                    <p>No tienes mascotas registradas.</p>
                )}
            </ul>
        </div>
    );
}

export default UserProfile;
