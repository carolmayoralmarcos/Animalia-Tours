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
    const cancelReservation = async (reservationId) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto una vez confirmado.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, cancelar!',
                cancelButtonText: 'No, mantenerla!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5000/api/reservations/cancel/${reservationId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (!data.success) {
                    throw new Error(data.data || 'Failed to cancel reservation');
                }

                Swal.fire({
                    title: 'Reserva cancelada',
                    text: `La reserva ha sido cancelada con éxito.`,
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                });

                setReservations(reservations.filter(reservation => reservation._id !== reservationId));
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'Tu reserva está a salvo :)',
                    icon: 'info',
                    confirmButtonText: 'Aceptar'
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo cancelar la reserva: ${error.message}`,
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const handleModifyPet = (petId, currentName, currentType) => {
        Swal.fire({
            title: 'Modificar Mascota',
            html: `
                <input type="text" id="petName" class="swal2-input" placeholder="Nombre" value="${currentName}">
                <input type="text" id="petType" class="swal2-input" placeholder="Tipo" value="${currentType}">
            `,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
                const name = Swal.getPopup().querySelector('#petName').value;
                const type = Swal.getPopup().querySelector('#petType').value;
                if (!name || !type) {
                    Swal.showValidationMessage('Por favor, ingresa ambos valores');
                }
                return { name, type };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updatePet(petId, result.value.name, result.value.type);
            }
        });
    };

    const updatePet = async (petId, name, type) => {
        try {
            const updatedData = { name, type };

            const response = await fetch(`http://localhost:5000/api/pets/update/${petId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedData),
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.data || 'Failed to update pet');
            }

            Swal.fire({
                title: 'Mascota actualizada',
                text: `La mascota ${data.data.name} ha sido actualizada con éxito.`,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            setProfile({
                ...profile,
                pets: profile.pets.map(pet => pet._id === petId ? data.data : pet)
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `No se pudo actualizar la mascota: ${error.message}`,
                confirmButtonText: 'Aceptar'
            });
        }
    };

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
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esto una vez confirmado.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminarla!',
                cancelButtonText: 'No, cancelar!',
                reverseButtons: true
            });

            if (result.isConfirmed) {
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
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'La mascota está a salvo :)',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }

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
        <div className="d-flex align-items-left justify-content-center min-vh-100">
            <div className="UserProfile p-4 rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                <div className="Profile">
                    <div className="card-header">
                        <h1 className="text-left mb-4">Perfil de {profile.name}</h1>
                    </div>
                    <div className="card-body">
                        <p><strong>Nombre:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>

                        <h2>Mascotas</h2>
                        <ul className="text-left mb-3">
                            {profile.pets.length > 0 ? (
                                profile.pets.map((pet, index) => (
                                    <li key={index} className="list-group-item d-flex flex-column align-items-start">
                                        <span><strong>Nombre:</strong> {pet.name}</span>
                                        <span><strong>Tipo:</strong> {pet.type}</span>
                                        <div className="mt-2">
                                            <button
                                                className="btn btn-custom mb-3 mx-2"
                                                onClick={() => handleModifyPet(pet._id, pet.name, pet.type)}
                                            >
                                                Modificar Mascota
                                            </button>
                                            <button
                                                className="btn btn-custom mb-3"
                                                onClick={() => deletePet(pet._id)}
                                            >
                                                Eliminar Mascota
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No tienes mascotas registradas.</p>
                            )}
                        </ul>

                        <button className="btn btn-custom mb-3" onClick={() => navigate('/add-pet')}>Añadir Mascota</button>

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
                                            <button
                                                className="btn btn-danger mt-2"
                                                onClick={() => cancelReservation(reservation._id)}
                                            >
                                                Cancelar Reserva
                                            </button>
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
    );
}

export default UserProfile;
