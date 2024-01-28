'use client'
import React, { useState } from 'react';

const AddEventPage: React.FC = () => {
    const [eventName, setEventName] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventImageUrl, setEventImageUrl] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleEventNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventName(e.target.value);
    };

    const handleEventDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEventDescription(e.target.value);
    };

    const handleEventImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventImageUrl(e.target.value);
    };

    const handleEventDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEventDate(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Event submitted:', eventName, eventDescription, eventImageUrl, eventDate);
        try {
            const response = await fetch('/api/event/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventName,
                    eventDescription,
                    eventImageUrl,
                    eventDate
                })
            });

            const data = await response.json();
            console.log('Event submitted:', data);
        } catch (error) {
            console.error('Error submitting event:', error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-center text-3xl font-bold mb-8">Add Event</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="eventName" className="block mb-2 font-bold">Event Name:</label>
                    <input type="text" id="eventName" value={eventName} onChange={handleEventNameChange} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDescription" className="block mb-2 font-bold">Event Description:</label>
                    <textarea id="eventDescription" value={eventDescription} onChange={handleEventDescriptionChange} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventImageUrl" className="block mb-2 font-bold">Event Image URL:</label>
                    <input type="text" id="eventImageUrl" value={eventImageUrl} onChange={handleEventImageUrlChange} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
                </div>

                <div className="mb-4">
                    <label htmlFor="eventDate" className="block mb-2 font-bold">Event Date:</label>
                    <input type="text" id="eventDate" value={eventDate} onChange={handleEventDateChange} className="w-full px-4 py-2 border border-gray-300 rounded text-black" />
                </div>

                <div className="text-center">
                    <button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Post Event</button>
                </div>
            </form>
        </div>
    );
};

export default AddEventPage;
