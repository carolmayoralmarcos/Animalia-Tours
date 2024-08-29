// import React, { useState } from 'react';
// import { sendMessage } from '../api/contactAPI';


// const Contact = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         message: ''
//     });
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState(false);


//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess(false);

//         try {

//             await sendMessage(formData);
//             setSuccess(true);
//             setFormData({ name: '', email: '', message: '' });
//         } catch (err) {
//             setError(err.response?.data?.message || 'Error al enviar el mensaje');
//         }
//     };

//     return (
//         <div className="contact-container">
//             <h1>Contáctanos</h1>
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">¡Mensaje enviado con éxito!</p>}
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="name">Nombre</label>
//                     <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">E-mail</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="message">Mensaje</label>
//                     <textarea
//                         id="message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn">Enviar Mensaje</button>
//             </form>
//         </div>
//     );
// };

// export default Contact;
