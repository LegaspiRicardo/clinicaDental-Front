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
        <h2 className="text-white text-4xl mb-8">Citas DENTAL - ART</h2>

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


        {/* Tabla pacientes agendados. orden descendente de las ultimas citas agendadas y a quien */}
        <h2 className="mt-24  text-3xl text-white ">Agregadas recientemente</h2>
        <div className=" container  w-3/6  rounded-lg shadow-md mt-5 ">
          <div className="h-96 overflow-auto scrollbar-hide rounded-lg">
            <table className="w-full ">

              <thead className="bg-slate-300 sticky top-0 z-10 text-xl">
                <tr >
                  <th className="border-2 px-5 text-left">Paciente</th>
                  <th className="border-2  px-5 text-left">Fecha y hora</th>
                </tr>
              </thead>

              <tbody className="text-white ">
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Monica Coronado Bajado</td>
                  <td className="pt-4  ">28/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">31/07/2025</td>
                </tr>
                <tr className="hover:bg-gray-100 hover:text-black">
                  <td className="pt-4  ">Erick Mariano Madera Cataño</td>
                  <td className="pt-4  ">02/08/2025</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>


      </div>
    </div>
  );
};



export default MyCalendar;
