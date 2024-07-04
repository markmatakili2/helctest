// src/components/Register.js
import React, { useState } from 'react';
import { getActor } from '../agent';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        licenseNumber: '',
        dateOfBirth: '',
        gender: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const actor = await getActor();
        try {
            await actor.registerUser({
                ...formData,
                image: formData.image ? Array.from(new Uint8Array(await formData.image.arrayBuffer())) : [],
            });
            alert('Registration successful');
        } catch (error) {
            console.error('Registration failed', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type="text" name="username" placeholder="Username" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="text" name="licenseNumber" placeholder="License Number" onChange={handleChange} />
            <input type="date" name="dateOfBirth" placeholder="Date of Birth" onChange={handleChange} />
            <select name="gender" onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Rather Not Say">Rather Not Say</option>
            </select>
            <input type="file" name="image" onChange={handleFileChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
