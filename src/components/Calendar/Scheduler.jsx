import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DialogEvent from './DialogEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './Scheduler.module.css';
import 'moment/locale/es';

moment.locale('es');
const localizer = momentLocalizer(moment);

const initialEvents = [
  // Agrega eventos iniciales aquí si es necesario
];

const isPastDate = (date) => {
  const today = moment().startOf('day');
  const dateToCheck = moment(date);
  return dateToCheck.diff(today) < 0;
};

const Scheduler = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const currentUser = isAuthenticated
    ? { userId: 1, name: 'John Doe', email: 'john.doe@example.com' }
    : null;

  const handleSelectSlot = ({ start, end }) => {
    const isDisabled = isPastDate(start);
    setSelectedDate(start);
    if (!isDisabled && isAuthenticated) {
      setIsDialogOpen(true);
      setSelectedEvent(null);
    }
  };

  const handleDialogSubmit = (data) => {
    if (selectedEvent) {
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? { ...event, ...data } : event
      );
      setEvents(updatedEvents);
    } else {
      setEvents([...events, { ...data, id: Date.now() }]);
    }
    setIsDialogOpen(false);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const getEventStyle = (event, index) => {
    const colors = ['#FF66B2', '#66CCFF', '#66FF66', '#CC66FF', '#ffccff'];
    const colorIndex = index % colors.length;
    return {
      className: `event-color-${colorIndex}`,
      style: {
        backgroundColor: colors[colorIndex],
        color: '#000',
      },
    };
  };

  const dayPropGetter = (date) => {
    const momentDate = moment(date);
    const isPast = isPastDate(momentDate);
    const today = moment().startOf('day');
    const isToday = momentDate.isSame(today, 'day');
    const isSelected = selectedDate && momentDate.isSame(selectedDate, 'day');

    return {
      disabled: isPast,
      className: isToday
        ? styles.today
        : isSelected
        ? styles.selected
        : isPast
        ? styles.disabled
        : styles.enabled,
    };
  };

  return (
    <div className={styles.schedulerContainer}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        className={styles.calendar}
        eventPropGetter={(event, start, end, isSelected) =>
          getEventStyle(event, events.indexOf(event))
        }
        messages={{
          date: 'Fecha',
          time: 'Hora',
          event: 'Evento',
          allDay: 'Todo el día',
          week: 'Semana',
          work_week: 'Semana laboral',
          day: 'Día',
          month: 'Mes',
          previous: 'Anterior',
          next: 'Siguiente',
          yesterday: 'Ayer',
          tomorrow: 'Mañana',
          today: 'Hoy',
          agenda: 'Agenda',
          noEventsInRange: 'No hay eventos en este rango',
        }}
        dayPropGetter={dayPropGetter}
        currentUser={currentUser}
      />
      {isDialogOpen && (
        <DialogEvent
          eventToEdit={selectedEvent}
          setIsDialogOpen={setIsDialogOpen}
          handleDialogSubmit={handleDialogSubmit}
          isNewEvent={!selectedEvent}
          currentUser={currentUser}
          events={events}
        />
      )}
    </div>
  );
};

export default Scheduler;
