'use client'
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  description: string;
  image_url: string;
  date: Date;
}
export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/event/get", {method: 'GET'});
        if (response.ok) {
          const data: Event[] = await response.json();
          setEvents(data);
          console.log(data);
        } else {
          console.error("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="mb-32 grid gap-8 justify-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3">
        {events.length === 0 ?
          (<p>No Events Coming up</p>)
          : (events.map((event) => (
            <div
              key={event.id}
              className="group rounded-lg overflow-hidden border border-gray-300 hover:border-gray-500 shadow-md transition-transform transform hover:scale-105"
            >
              <Image
                src={event.image_url}
                alt={event.name}
                width={400}
                height={200}
                objectFit="cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                <p className="text-sm opacity-70">{event.description}</p>
                <p className="text-sm font-semibold mt-2">{event.date.toString()}</p>
              </div>
            </div>
          )))}
      </div>
    </main>
  );
}
