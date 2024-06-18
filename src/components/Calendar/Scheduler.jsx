import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import DialogEvent from './DialogEvent'; // Importamos el componente DialogEvent
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
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Estado para controlar la apertura del Dialog

  const handleSelectSlot = ({ start, end }) => {
    const isDisabled = isPastDate(start);

    setSelectedDate(start);

    if (!isDisabled) {
      // Abrir el Dialog cuando se selecciona un slot
      setIsDialogOpen(true);
    }
  };

  const handleDialogSubmit = (data) => {
    // Agregar el nuevo evento al array de eventos
    setEvents([...events, data]);
    // Cerrar el Dialog después de agregar el evento
    setIsDialogOpen(false);
  };

  const getEventStyle = (event, index) => {
    const colors = ['#ffcccc', '#ccffcc', '#ccccff', '#ffffcc', '#ffccff'];
    const colorIndex = index % colors.length; // Ciclo entre los colores disponibles
    return {
      className: `event-color-${colorIndex}`,
      style: {
        backgroundColor: colors[colorIndex],
        color: '#000', // Color de fuente predeterminado
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
      />
      {isDialogOpen && (
        <DialogEvent
          dialogData={{ start: selectedDate, end: selectedDate, title: '' }} // Pasa los datos al DialogEvent
          setIsDialogOpen={setIsDialogOpen}
          handleDialogSubmit={handleDialogSubmit}
        />
      )}
    </div>
  );
};

export default Scheduler;
