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
} from '@fluentui/react-components'; // Ajusta las importaciones según tu librería de componentes

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

  const handleSubmit = (ev) => {
    ev.preventDefault();
    handleDialogSubmit({ title, start, end });
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  // Actualiza los estados cuando se cambian los datos del evento
  React.useEffect(() => {
    setTitle(dialogData.title);
    setStart(dialogData.start);
    setEnd(dialogData.end);
  }, [dialogData]);

  return (
    <Dialog open={true} onDismiss={handleClose} modalType='non-modal'>
      <DialogSurface aria-describedby={undefined}>
        <form onSubmit={handleSubmit}>
          <DialogBody>
            <DialogTitle>Agregar Evento</DialogTitle>
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
              <Input
                required
                type='datetime-local'
                id='start-input'
                value={start ? start.toISOString().slice(0, 16) : ''}
                onChange={(e) => setStart(new Date(e.target.value))}
              />
              <Label required htmlFor='end-input'>
                Fecha de Fin
              </Label>
              <Input
                required
                type='datetime-local'
                id='end-input'
                value={end ? end.toISOString().slice(0, 16) : ''}
                onChange={(e) => setEnd(new Date(e.target.value))}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} appearance='secondary'>
                Cerrar
              </Button>
              <Button type='submit' appearance='primary'>
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
