export const getprofile = async (token) => {
    const response = await fetch('http://localhost:5000/api/users/get/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`

        }
    });

    if (!response) {
        return { success: false, error: 'Failed to fetch user profile' };
    }

    const data = await response.json();

    if (!data) {
        return { success: false, error: 'Unknown error' };
    }

    return { success: true, data: data.data };
};

