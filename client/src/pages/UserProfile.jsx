import React, { useEffect, useState } from 'react';
import { getprofile } from '../utils/getprofile';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const loadUserProfile = async () => {
            const result = await getprofile("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Y2Y0MGFkNTU3MTNkOWI3YTIzMzZhMCIsImVtYWlsIjoiaXZhbkBtYWlsLmNvbSIsImlhdCI6MTcyNDk2MTQ3OSwiZXhwIjoxNzI0OTY1MDc5fQ.ry8xDB83hbNhE6xXpUAxaYlQFzBzJADo1ySvh6Oa9Xs");
            if (result.success) {

                setProfile(result.data);

            } else {
                setProfile(null);
            }
        };

        loadUserProfile();
    }, []);

    if (!profile) {
        return <p>Failed to load profile. Please try again later.</p>;
    }

    return (
        <div>
            <h1>{profile.name}Profile</h1>
            <p>Name:{profile.name}</p>
            <p>Email: {profile.email}</p>
            <h2>Pets</h2>
            <ul>
                {profile.pets.length > 0 ? (
                    profile.pets.map((pet, index) => (
                        <li key={index}>{pet.name}</li>
                    ))
                ) : (
                    <p>You have no registered pets.</p>
                )}
            </ul>
        </div>
    );
};

export default UserProfile;
