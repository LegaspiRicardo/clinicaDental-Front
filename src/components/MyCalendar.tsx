import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { createEventId } from '../event-utils'; // Asegúrate de tener este archivo o función



const MyCalendar = () => {
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const renderSidebarEvent = (event: EventApi) => (
    <li key={event.id}>
      <b>{event.start?.toLocaleDateString()}</b> <i>{event.title}</i>
    </li>
  );

  return (
    <div className="demo-app">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>

      <div className={`demo-app-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="demo-app-sidebar-section">
          <h2>DENTAL - ART</h2>
          <ul>
            <li><a href="" className="linkSideBar">Dentistas</a></li>
            <li><a href="" className="linkSideBar">Pacientes</a></li>
            <li><a href="" className="linkSideBar">Horarios</a></li>
            <li><a href="" className="linkSideBar">Finanzas</a></li>
          </ul>
        </div>
        <div className="demo-app-sidebar-section">
          <h2>Próximas citas ({currentEvents.length})</h2>
          <ul>{currentEvents.map(renderSidebarEvent)}</ul>
        </div>
      </div>

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
