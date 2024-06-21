import * as React from 'react';
import {
  Button,
  Combobox,
  makeStyles,
  Option,
  tokens,
  useId,
} from '@fluentui/react-components';
import { Dismiss12Regular } from '@fluentui/react-icons';
import { useAtom } from 'jotai';
import { suggestionsAtom, userGamesAtom } from '../../data/Store/gamesStore';

const useStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: 'repeat(1fr)',
    justifyItems: 'start',
    gap: '2px',
    width: '100%',
    maxWidth: '100%',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
  listbox: {
    maxHeight: '200px',
  },
});

const ComboGames = (props) => {
  const [suggestions] = useAtom(suggestionsAtom);
  const [, setUserGames] = useAtom(userGamesAtom);
  const comboId = useId('combo-multi');
  const selectedListId = `${comboId}-selection`;
  const selectedListRef = React.useRef(null);
  const comboboxInputRef = React.useRef(null);

  const options = suggestions;
  const styles = useStyles();

  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const onSelect = (event, data) => {
    setSelectedOptions(data.selectedOptions);

    const newSelection = {
      optionValue: data.optionValue,
      optionText: data.optionText,
    };

    setUserGames((prevUserGames) => {
      const exists = prevUserGames.some(
        (game) => game.optionValue === newSelection.optionValue
      );
      if (!exists) {
        return [...prevUserGames, newSelection];
      }
      return prevUserGames;
    });
  };

  const onTagClick = (option, index) => {
    setSelectedOptions(selectedOptions.filter((o) => o !== option));
    const indexToFocus = index === 0 ? 1 : index - 1;
    const optionToFocus = selectedListRef.current?.querySelector(
      `#${comboId}-remove-${indexToFocus}`
    );
    if (optionToFocus) {
      optionToFocus.focus();
    } else {
      comboboxInputRef.current?.focus();
    }
  };

  const labelledBy =
    selectedOptions.length > 0 ? `${comboId} ${selectedListId}` : comboId;

  return (
    <>
      <div className={styles.root}>
        <label id={comboId}>Título</label>
        {selectedOptions.length ? (
          <ul
            id={selectedListId}
            className={styles.tagsList}
            ref={selectedListRef}
          >
            <span id={`${comboId}-remove`} hidden>
              Borrar
            </span>
            {selectedOptions.map((option, i) => (
              <li key={option}>
                <Button
                  size='small'
                  shape='circular'
                  appearance='primary'
                  icon={<Dismiss12Regular />}
                  iconPosition='after'
                  onClick={() => onTagClick(option, i)}
                  id={`${comboId}-remove-${i}`}
                  aria-labelledby={`${comboId}-remove ${comboId}-remove-${i}`}
                >
                  {option}
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
        <Combobox
          aria-labelledby={labelledBy}
          multiselect={true}
          listbox={{ className: styles.listbox }}
          placeholder='Seleccione uno o mas Juegos'
          selectedOptions={selectedOptions}
          onOptionSelect={onSelect}
          ref={comboboxInputRef}
          {...props}
        >
          {options.map((option) => (
            <Option key={option.id} value={option.nombre} text={option.id}>
              {option.nombre}
            </Option>
          ))}
        </Combobox>
      </div>
    </>
  );
};

export default ComboGames;
