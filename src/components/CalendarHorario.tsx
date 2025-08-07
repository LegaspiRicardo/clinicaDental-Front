import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import type { DateSelectArg, EventClickArg, EventContentArg, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { createEventId } from '../event-utils'; // Asegúrate de tener este archivo o función

import { useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';


const CalendarHorario = () => {
    const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dentistas, setDentistas] = useState([]);
    const [dentistaId, setDentistaId] = useState('');

    useEffect(() => {
        const obtenerDentistas = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/dentistas');
                setDentistas(res.data.filter((d: any) => d.status === 'Activo'));
            } catch (error) {
                console.error('Error al obtener dentistas:', error);
            }
        };
        obtenerDentistas();
    }, []);

    const handleDateSelect = (selectInfo: DateSelectArg) => {
        const title = prompt('abrir dialog para crear un horario');
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
        if (confirm(`¿Seguro que quieres eliminar el horario '${clickInfo.event.title}'?`)) {
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
                    <Select
                        value={dentistaId}
                        onChange={(e) => setDentistaId(e.target.value)}
                        displayEmpty
                        sx={{ minWidth: 250, backgroundColor: 'white' }}
                    >
                        <MenuItem value="" disabled>Doctores y dentistas</MenuItem>
                        {dentistas.map((d: any) => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.username} - {d.especialidad}
                            </MenuItem>
                        ))}
                    </Select>



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

export default CalendarHorario;
