async function handleFetch(id, collection) {

    try {
        const res = await fetch(`https://philo-server.onrender.com/api/${collection}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await res.json();  // Convert to text
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return ('Error fetching data');  // Show error message in case of error
    }

};

export default handleFetch;