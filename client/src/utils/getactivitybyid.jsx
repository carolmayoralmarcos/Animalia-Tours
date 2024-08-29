export const fetchActivityById = async (id) => {
    try {
        const response = await fetch(`http://localhost:5000/api/activities/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response || !data.success) {
            return { success: false, error: data.data || 'Error fetching activity' };
        }

        return { success: true, data: data.data };
    } catch (error) {
        return { success: false, error: error.message };
    }
};