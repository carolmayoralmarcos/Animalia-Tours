export const createactivity = async (activityData) => {
    const response = await fetch('http://localhost:5000/api/activities/new', {
        method: 'POST',
        body: activityData
    });

    if (!response) {
        return { success: false, error: 'Failed to create the activity' };
    }

    const data = await response.json();

    if (!data.success) {
        return { success: false, error: data.data };
    }

    return { success: true, data: data.data };
};
