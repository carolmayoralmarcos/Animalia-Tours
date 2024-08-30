async function deleteElement(id, collection) {

    try {
        const res = await fetch(`http://localhost:5000/api/${collection}/delete/${id}`, {
            method: 'DELETE',
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

export default deleteElement;