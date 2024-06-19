import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Input,
  Label,
  makeStyles,
} from '@fluentui/react-components';
import { DatePicker } from '@fluentui/react-datepicker-compat';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '10px',
  },
});

const DialogEvent = ({
  eventToEdit,
  setIsDialogOpen,
  handleDialogSubmit,
  isNewEvent,
  currentUser,
  events,
}) => {
  const styles = useStyles();
  const [title, setTitle] = React.useState(eventToEdit?.title || '');
  const [start, setStart] = React.useState(eventToEdit?.start || null);
  const [end, setEnd] = React.useState(eventToEdit?.end || null);
  const Today = new Date();
  const minDate = new Date(
    Today.getFullYear(),
    Today.getMonth(),
    Today.getDate()
  );

  const isDateDisabled = (date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  React.useEffect(() => {
    setTitle(eventToEdit?.title || '');
    setStart(eventToEdit?.start || null);
    setEnd(eventToEdit?.end || null);
  }, [eventToEdit]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const eventData = { title, start, end };
    const newEvent = isNewEvent
      ? { ...eventData, id: Date.now() }
      : { ...eventToEdit, ...eventData };

    const updatedEvents = isNewEvent
      ? [...events, newEvent]
      : events.map((event) => (event.id === eventToEdit.id ? newEvent : event));
    const userEvents = {
      userId: currentUser.userId,
      name: currentUser.name,
      email: currentUser.email,
      events: updatedEvents.map((event) => ({
        eventId: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
      })),
    };

    console.log('User Events:', userEvents);

    handleDialogSubmit(newEvent);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={true} onDismiss={handleClose} modalType='non-modal'>
      <DialogSurface aria-describedby={undefined}>
        <form>
          <DialogBody>
            <DialogTitle>Solicitud de Arriendo</DialogTitle>
            <DialogContent className={styles.content}>
              <Label required htmlFor='title-input'>
                Título
              </Label>
              <Input
                required
                type='text'
                id='title-input'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Label required htmlFor='start-input'>
                Fecha de Inicio
              </Label>
              <DatePicker
                onSelectDate={(date) => setStart(date)}
                value={start}
                ariaLabel='Seleccione una fecha de inicio'
                isDateDisabled={isDateDisabled}
                minDate={minDate}
              />
              <Label required htmlFor='end-input'>
                Fecha de Fin
              </Label>
              <DatePicker
                onSelectDate={(date) => setEnd(date)}
                value={end}
                ariaLabel='Seleccione una fecha de fin'
                isDateDisabled={isDateDisabled}
                minDate={minDate}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} appearance='secondary'>
                Cerrar
              </Button>
              <Button onClick={handleSubmit} appearance='primary'>
                {isNewEvent ? 'Agregar' : 'Actualizar'}
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default DialogEvent;
