import React, { useState } from 'react';
import '../styles/contact.css';





export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setStatus("Tu mensaje ha sido enviado con éxito.");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className='wrapContact'>
            <div className="d-flex align-items-center justify-content-center min-vh-100">
                <div className="contact p-4  rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
                    <div className="contact">
                        <h1 className="text-center mb-4">Contacto</h1>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group mb-3">
                                <label htmlFor="name" className="form-label">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="email" className="form-label">Correo electrónico:</label>
                                <input
                                    type="email"
                                    className="form-control form-control-lg"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="message" className="form-label">Mensaje:</label>
                                <textarea
                                    name="message"
                                    className="form-control form-control-lg"
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-custom">
                                    Enviar
                                </button>
                            </div>
                        </form>
                        {status && <p className="text-center mt-3">{status}</p>}
                    </div>
                </div>
            </div>
        </div>

    );
}



