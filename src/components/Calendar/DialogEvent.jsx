import * as React from 'react';
import {
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogBody,
  DialogActions,
  Button,
  Label,
  makeStyles,
} from '@fluentui/react-components';
import ComboGames from './ComboGames';
import { DatePicker } from '@fluentui/react-datepicker-compat';
import { useAtom } from 'jotai';
import { calendarEventsAtom } from '../../data/Store/eventStore';
import { userGamesAtom } from '../../data/Store/gamesStore';

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
}) => {
  const styles = useStyles();
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
  
  const [userGames] = useAtom(userGamesAtom);

  React.useEffect(() => {
    setStart(eventToEdit?.start || null);
    setEnd(eventToEdit?.end || null);
  }, [eventToEdit]);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const [ , setCalendarEvents] = useAtom(calendarEventsAtom);

  const saveToJotai = (userEvents) => {
    setCalendarEvents(userEvents);
    console.log('Guardado en Jotai', JSON.stringify(userEvents, null, 2));
  };

  const generateEventsFromUserGames = () => {
    const events = [];

    userGames.forEach((game) => {
      const eventid = isNewEvent ? Date.now() : eventToEdit.id;
      const newEvent = isNewEvent
        ? {
            title: game.optionValue,
            start,
            end,
            gameid: game.optionText,
            eventid: eventid,
          }
        : {
            ...eventToEdit,
            title: game.optionValue,
            start,
            end,
            gameid: game.optionText,
          };

      events.push(newEvent);
    });

    return events;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const updatedEvents = [];

    userGames.forEach((game) => {
      const eventid = isNewEvent ? Date.now() : eventToEdit.id;
      const event = {
        eventid: eventid,
        title: game.optionValue,
        start: start,
        end: end,
        gameid: game.optionText,
      };
      updatedEvents.push(event);
    });

    const userEvents = {
      userId: currentUser.userId,
      name: currentUser.name,
      email: currentUser.email,
      quantity: userGames.length,
      events: updatedEvents.map((event) => ({
        eventid: event.eventid,
        title: event.title,
        start: event.start,
        end: event.end,
        gameid: event.gameid,
      })),
    };

    saveToJotai(userEvents);

    const newEvents = generateEventsFromUserGames();
    handleDialogSubmit(newEvents);

    setIsDialogOpen(false);
  };

  return (
    <Dialog open={true} onClose={() => handleClose()}>
      <DialogSurface aria-describedby={undefined}>
        <form>
          <DialogBody>
            <DialogTitle>Solicitud de Arriendo</DialogTitle>
            <DialogContent className={styles.content}>
              <ComboGames />
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
