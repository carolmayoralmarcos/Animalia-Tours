import React, { useEffect, useState } from 'react';
import { getprofile } from '../utils/getprofile';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const loadUserProfile = async () => {
            const result = await getprofile(token);
            if (result.success) {
                setProfile(result.data);

                const reservationsResponse = await fetch(`http://localhost:5000/api/reservations/user/${result.data._id}`);
                const reservationsData = await reservationsResponse.json();

                if (reservationsData.success) {
                    setReservations(reservationsData.data);
                }
            } else {
                setProfile(null);
            }
        };

        loadUserProfile();
    }, [token]);

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

            <h2>Reservas</h2>
            <div>
                {reservations.length > 0 ? (
                    reservations.map((reservation, index) => (
                        <div key={index}>
                            <p>Actividad: {reservation.name}</p>
                            <p>Estado: {reservation.status}</p>
                            <p>Fecha de creación: {new Date(reservation.createdAt).toLocaleDateString()}</p>
                            <p>Fecha de última actualización: {new Date(reservation.updatedAt).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No tienes reservas.</p>
                )}
            </div>
        </div>
    );
}

export default UserProfile;
