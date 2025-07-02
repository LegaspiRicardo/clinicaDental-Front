import React from 'react'
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import esLocale from '@fullcalendar/core/locales/es';


interface DemoAppState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
  isSidebarOpen: boolean
}

export default class DemoApp extends React.Component<{}, DemoAppState> {

  state: DemoAppState = {
    weekendsVisible: true,
    currentEvents: [],
    isSidebarOpen: false
  }

  render() {


    return (
      <div className='demo-app'>
            <button
  className="hamburger-btn"
  onClick={() => this.setState({ isSidebarOpen: !this.state.isSidebarOpen })}
>
  ☰
</button>
        {this.renderSidebar()}

        <div className='main-wrapper'>
        <div className='demo-app-main'>

        {this.renderFilters()}  

          <FullCalendar
            locale={esLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next,today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
</div>
      </div>
    )
  }



  
  renderSidebar() {
    return (
    <div className={`demo-app-sidebar ${this.state.isSidebarOpen ? 'open' : ''}`}>

        <div className='demo-app-sidebar-section'>
          <h2>DENTAL - ART</h2>
          <ul>
            <a href="" className='linkSideBar'> <li> Dentistas</li></a>
            <a href="" className='linkSideBar' > <li>  Pacientes</li></a>
            <a href="" className='linkSideBar'> <li>  Horarios</li></a>
            <a href="" className='linkSideBar'> <li>  Finanzas</li></a>
          </ul>
        </div>

        <div className='demo-app-sidebar-section'>
          <h2>Proximas citas ({this.state.currentEvents.length})</h2>
          <ul>
            {this.state.currentEvents.map(renderSidebarEvent)}
            
          </ul>
        </div>


      </div>
    )
  }


renderFilters() {
  return (
    <div className="filters-bar" >
      <select name="dentist" className="filter-selects" >
        <option value="" hidden className='filter-select-title'>Doctores y dentistas</option>
        <option value="gomez">Dr. Gómez</option>
        <option value="perez">Dra. Pérez</option>
      </select>

      <select name="servicio" className="filter-selects" >
        <option value="" hidden>Servicios</option>
        <option value="general">Consulta general</option>
        <option value="ortodoncia">Ortodoncia</option>
        <option value="limpieza">Limpieza</option>
        <option value="extraccion">Extracción</option>
      </select>

      <input type="text" placeholder="Buscar paciente" className="filter-input" />



      <button className="filter-button" style={{backgroundColor:'#2c3e50', color:'white', padding:'0.4rem 1rem', borderRadius:'0.4rem', border:'none', cursor:'pointer'}}>Filtrar</button>
    </div>
  );
}





  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo: DateSelectArg) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo: EventClickArg) => {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEvents = (events: EventApi[]) => {
    this.setState({
      currentEvents: events
    })
  }

}

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      <i>{eventContent.event.title}</i>
    </>
  )
}

function renderSidebarEvent(event: EventApi) {
  return (
    <li key={event.id}>
      <b>{formatDate(event.start!, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
      <i>{event.title}</i>
    </li>
  )
}
