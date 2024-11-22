import React, { useState, useEffect } from 'react';
import Hero from '../components/layout/Hero';
import SearchBar from '../components/event/SearchBar';
import EventCard from '../components/event/EventCard';
import EventModal from '../components/event/EventModal';
import { eventService } from '../services/api';

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const response = await eventService.getEvents();
      setEvents(response.data.events);
    } catch (err) {
      setError('Error al cargar los eventos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="container mx-auto px-4">
        <SearchBar />
        
        {/* Sección de eventos destacados */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-8">Eventos Destacados</h2>
          
          {loading ? (
            <p className="text-center py-8">Cargando eventos...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-600">{error}</p>
          ) : events.length === 0 ? (
            <p className="text-center py-8">No hay eventos disponibles</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onOpenModal={setSelectedEvent}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Modal de evento */}
      {selectedEvent && (
        <EventModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
    </div>
  );
};

export default HomePage;