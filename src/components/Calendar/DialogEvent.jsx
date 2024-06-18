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

const DialogEvent = ({ dialogData, setIsDialogOpen, handleDialogSubmit }) => {
  const styles = useStyles();
  const [title, setTitle] = React.useState(dialogData.title);
  const [start, setStart] = React.useState(dialogData.start);
  const [end, setEnd] = React.useState(dialogData.end);
  const Today = new Date();
  const minDate = new Date(
    Today.getFullYear(),
    Today.getMonth(),
    Today.getDate()
  );

  // Función para deshabilitar fechas anteriores al día actual
  const isDateDisabled = (date) => {
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAdd = (ev) => {
    ev.preventDefault();
    handleDialogSubmit({ title, start, end });
  };

  React.useEffect(() => {
    setTitle(dialogData.title);
    setStart(dialogData.start);
    setEnd(dialogData.end);
  }, [dialogData]);

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
              {/* DatePicker para la fecha de inicio */}
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
              {/* DatePicker para la fecha de fin */}
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
              <Button onClick={handleAdd} appearance='primary'>
                Agregar
              </Button>
            </DialogActions>
          </DialogBody>
        </form>
      </DialogSurface>
    </Dialog>
  );
};

export default DialogEvent;
