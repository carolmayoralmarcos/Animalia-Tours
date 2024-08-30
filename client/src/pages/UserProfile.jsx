import React, { useEffect, useState } from 'react';
import { getprofile } from '../utils/getprofile';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [petName, setPetName] = useState('');
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


    const addPet = async () => {
        const response = await fetch('http://localhost:5000/api/pets/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: petName })
        });

        const data = await response.json();
        if (data.success) {
            alert(`Mascota añadida: ${data.data.name}`);
            setProfile({ ...profile, pets: [...profile.pets, data.data] });
        } else {
            alert(`Error: ${data.data}`);
        }
    };


    const deletePet = async (petId) => {
        const response = await fetch(`http://localhost:5000/api/pets/delete/${petId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        if (data.success) {
            alert(`Mascota eliminada: ${data.data.name}`);
            setProfile({
                ...profile,
                pets: profile.pets.filter(pet => pet._id !== petId)
            });
        } else {
            alert(`Error: ${data.data}`);
        }
    };

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
                        <li key={index}>
                            {pet.name}
                            <button onClick={() => deletePet(pet._id)}>Eliminar Mascota</button>
                        </li>
                    ))
                ) : (
                    <p>No tienes mascotas registradas.</p>
                )}
            </ul>

            <input
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Nombre de la nueva mascota"
            />
            <button onClick={addPet}>Añadir Mascota</button>
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
