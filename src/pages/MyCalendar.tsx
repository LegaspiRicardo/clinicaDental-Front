// src/pages/MyCalendar.tsx
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import type { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core';
import { createEventId } from '../utils/event-utils';
import { useOutletContext } from 'react-router-dom';

const MyCalendar = () => {
const { setCurrentEvents } = useOutletContext<{ setCurrentEvents: React.Dispatch<React.SetStateAction<EventApi[]>> }>();

  const handleDateSelect = (selectInfo: DateSelectArg) => {
    const title = prompt('Escribe el título de la cita');
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`¿Seguro que quieres eliminar la cita '${clickInfo.event.title}'?`)) {
      clickInfo.event.remove();
    }
  };

  const handleEvents = (events: EventApi[]) => {
    setCurrentEvents(events);
  };

  const renderEventContent = (eventContent: EventContentArg) => (
    <>
      <b>{eventContent.timeText}</b> <i>{eventContent.event.title}</i>
    </>
  );

  return (




    
    <div className="demo-app container mx-auto p-8 rounded-md bg-cyan-800">




      <div className="main-wrapper ">



<div className="flex flex-wrap gap-4 mb-6 items-center">
  <select className="border border-gray-300 rounded px-4 py-2 text-sm text-gray-700">
    <option hidden>Doctores y dentistas</option>
    <option value="gomez">Dr. Gómez</option>
    <option value="perez">Dra. Pérez</option>
  </select>

  <select className="border border-gray-300 rounded px-4 py-2 text-sm text-gray-700">
    <option hidden>Servicios</option>
    <option value="general">Consulta general</option>
    <option value="ortodoncia">Ortodoncia</option>
    <option value="limpieza">Limpieza</option>
    <option value="extraccion">Extracción</option>
  </select>

  <input
    type="text"
    placeholder="Buscar paciente"
    className="border rounded px-4 py-2 text-sm text-gray-700"
  />

  <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
    Filtrar
  </button>
</div>




        <div className="calendar-container bg-white p-8 rounded-lg">
          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
          />
        </div>


        <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl mt-5">
          <div className="md:flex">
            <div className="md:shrink-0">

            </div>
            <div className="p-8">
              <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">Company retreats</div>
              <a href="#" className="mt-1 block text-lg leading-tight font-medium text-black hover:underline">
                Incredible accommodation for your team
              </a>
              <p className="mt-2 text-gray-500">
                Looking to take your team away on a retreat to enjoy awesome food and take in some sunshine? We have a list of
                places to do just that.
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};



export default MyCalendar;
