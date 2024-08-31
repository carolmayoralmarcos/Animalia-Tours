async function getActivitiesbyCity(id) {

    try {
        const res = await fetch(`http://localhost:5000/api/activities/city/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return ('Error fetching data');
    }

};

export default getActivitiesbyCity;