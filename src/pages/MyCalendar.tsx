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
    <div className="demo-app">


      <div className="main-wrapper">
        <div className="filters-bar">
          <select className="filter-selects">
            <option value="" hidden>Doctores y dentistas</option>
            <option value="gomez">Dr. Gómez</option>
            <option value="perez">Dra. Pérez</option>
          </select>

          <select className="filter-selects">
            <option value="" hidden>Servicios</option>
            <option value="general">Consulta general</option>
            <option value="ortodoncia">Ortodoncia</option>
            <option value="limpieza">Limpieza</option>
            <option value="extraccion">Extracción</option>
          </select>

          <input type="text" placeholder="Buscar paciente" className="filter-input" />
          <button className="filter-button">Filtrar</button>
        </div>

        <div className="calendar-container">
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
      </div>
    </div>
  );
};

export default MyCalendar;
