import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getprofile } from '../utils/getprofile';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [reservations, setReservations] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserProfile = async () => {
            if (!token) {
                Swal.fire({
                    icon: 'warning',
                    title: 'No Autorizado',
                    text: 'Por favor, inicie sesión para acceder a su perfil.',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    navigate('/login');
                });
                return;
            }

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
    }, [token, navigate]);

    const removePetFromUser = async (userId, petId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/removePet/${userId}/${petId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || 'Failed to remove pet from user');
            }

            return data;

        } catch (error) {
            console.error('Error removing pet from user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message || 'Something went wrong!',
            });
            return null;
        }
    };

    const deletePet = async (petId) => {
        try {

            const removeResponse = await removePetFromUser(profile._id, petId);
            if (!removeResponse) return;

            const response = await fetch(`http://localhost:5000/api/pets/delete/${petId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.data);
            }

            Swal.fire({
                title: 'Mascota eliminada',
                text: `La mascota ${data.data.name} ha sido eliminada con éxito.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            setProfile({
                ...profile,
                pets: profile.pets.filter(pet => pet._id !== petId)
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo eliminar la mascota: ${error.message}`,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    if (!profile) {
        return <p>No se pudo cargar el perfil. Por favor, inténtalo de nuevo más tarde.</p>;
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h1>Perfil de {profile.name}</h1>
                        </div>
                        <div className="card-body">
                            <p><strong>Nombre:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>

                            <h2>Mascotas</h2>
                            <ul className="list-group mb-3">
                                {profile.pets.length > 0 ? (
                                    profile.pets.map((pet, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                            {pet.name}
                                            <button className="btn btn-danger btn-sm" onClick={() => deletePet(pet._id)}>Eliminar Mascota</button>
                                        </li>
                                    ))
                                ) : (
                                    <p>No tienes mascotas registradas.</p>
                                )}
                            </ul>

                            <button className="btn btn-primary mb-3" onClick={() => navigate('/add-pet')}>Añadir Mascota</button>

                            <h2>Reservas</h2>
                            <div>
                                {reservations.length > 0 ? (
                                    reservations.map((reservation, index) => (
                                        <div key={index} className="card mb-3">
                                            <div className="card-body">
                                                <p><strong>Actividad:</strong> {reservation.name}</p>
                                                <p><strong>Estado:</strong> {reservation.status}</p>
                                                <p><strong>Fecha de creación:</strong> {new Date(reservation.createdAt).toLocaleDateString()}</p>
                                                <p><strong>Fecha de última actualización:</strong> {new Date(reservation.updatedAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tienes reservas.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
