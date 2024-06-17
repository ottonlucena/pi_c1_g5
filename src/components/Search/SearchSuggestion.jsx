/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import {
  SearchBox,
  Dropdown,
  Option,
  makeStyles,
  Divider,
  Button,
  Dialog,
  DialogSurface,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  DialogBody,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import useSearchSuggestion from "./useSearchSuggestion";
import { TbEyeSearch } from "react-icons/tb";
import { MdOutlineAutoDelete } from "react-icons/md";
import { verificarDisponibilidad } from "../../data/juegos";

const localizedStrings = {
  days: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  shortDays: ["D", "L", "M", "M", "J", "V", "S"],
  months: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  shortMonths: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  goToToday: "Ir a hoy",
};

const onFormatDate = (date) => {
  return !date
    ? ""
    : `${
        localizedStrings.months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Montserrat", sans-serif;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
  padding-left: 16px;
`;

const Subtitle = styled.p`
  font-size: 0.8rem;
  color: #666;
  padding: 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

const SuggestionDropdown = styled(Dropdown)`
  margin-top: -20px;
`;

const ContainerButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  control: {
    maxWidth: "300px",
    marginTop: "-3px",
    padding: "4px",
  },
  clearButton: {
    marginBottom: "5px",
    marginTop: "2px",
  },
});

const formatDateToISO = (date) => {
  if (!date) return "";
  return date.toISOString().split("T")[0];
};

const SearchSuggestion = () => {
  const customStyles = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const { suggestions, isLoading } = useSearchSuggestion();
  const [selectedOption, setSelectedOption] = useState(false);
  const [initialValue, setInitialValue] = useState(null);
  const [finishValue, setFinishValue] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const initialDateRef = useRef(null);
  const finishDateRef = useRef(null);

  useEffect(() => {
    const dropdown = document.querySelector(".fui-Dropdown");
    if (dropdown) {
      dropdown.style.visibility = "collapse";
    }
  }, []);

  const filteredSuggestions = useMemo(() => {
    if (!searchTerm) return [];
    const searchTermLower = searchTerm.toLowerCase();
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(searchTermLower)
    );
  }, [searchTerm, suggestions]);

  const handleSearchChange = (event, newValue) => {
    if (newValue !== undefined && newValue !== null) {
      setSelectedOption(newValue.value.toString() !== "");
      setSearchTerm(newValue.value.toString());
    } else {
      setSearchTerm("");
    }
  };

  const handleOptionSelect = (event, data) => {
    setSearchTerm(data.optionValue.toString());
    setSelectedOption(
      data.optionValue.toString() !== ""
        ? false
        : filteredSuggestions.length > 0
    );
  };

  const handleClear = useCallback(() => {
    setInitialValue(null);
    setFinishValue(null);
    initialDateRef.current?.focus();
  }, []);

  const handleSearch = useCallback(async () => {
    const datosReserva = {
      nombreJuego: searchTerm,
      fechaInicio: formatDateToISO(initialValue),
      fechaFin: formatDateToISO(finishValue),
    };

    try {
      const disponibilidad = await verificarDisponibilidad(datosReserva);
      setSearchResult(disponibilidad);
      setOpenDialog(true); // Show the dialog when search result is set
      console.log("Disponibilidad:", disponibilidad);
    } catch (error) {
      console.error("Error al verificar la disponibilidad:", error);
    }
  }, [searchTerm, initialValue, finishValue]);

  return (
    <>
      <ContainerText>
        <Title>Buscar</Title>
        <Subtitle>
          Búsqueda rápida de productos, según coincidencia de palabra y/o rango
          de fechas.
        </Subtitle>
      </ContainerText>
      <Divider alignContent="center" appearance="center" />
      <Container>
        <SearchContainer>
          <SearchBox
            className={customStyles.root}
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e, newValue) => handleSearchChange(e, newValue)}
          />
          <SuggestionDropdown
            className={`${customStyles.root}`}
            size="small"
            appearance="underline"
            disabled={!searchTerm || isLoading}
            open={searchTerm !== "" && selectedOption}
            onOptionSelect={handleOptionSelect}
          >
            {filteredSuggestions.map((option) => (
              <Option key={option}>{option}</Option>
            ))}
          </SuggestionDropdown>
        </SearchContainer>
        <DatePicker
          ref={initialDateRef}
          onSelectDate={setInitialValue}
          value={initialValue}
          strings={localizedStrings}
          className={customStyles.control}
          formatDate={onFormatDate}
          placeholder="Selecciona una fecha..."
        />
        <DatePicker
          ref={finishDateRef}
          onSelectDate={setFinishValue}
          value={finishValue}
          strings={localizedStrings}
          className={customStyles.control}
          formatDate={onFormatDate}
          placeholder="Selecciona una fecha..."
        />
        <ContainerButtons>
          <Button
            onClick={handleClear}
            appearance="primary"
            className={customStyles.clearButton}
            icon={<MdOutlineAutoDelete />}
          >
            Limpiar
          </Button>
          <Button
            onClick={handleSearch}
            appearance="primary"
            className={customStyles.clearButton}
            icon={<TbEyeSearch />}
          >
            Buscar
          </Button>
        </ContainerButtons>
      </Container>
      {/* Dialog to display search result */}
      <Dialog
        open={openDialog}
        onOpenChange={(event, data) => {
          setOpenDialog(data.open);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>
              {searchResult && searchResult.length > 0
                ? searchResult[0].nombre
                : "Resultado de la búsqueda"}
            </DialogTitle>
            <DialogContent>
              {searchResult && searchResult.length > 0 ? (
                <>
                  <p>{searchResult[0].descripcion}</p>
                  <p>Altura: {searchResult[0].altura}</p>
                  <p>Ancho: {searchResult[0].ancho}</p>
                  <p>Cantidad: {searchResult[0].cantidad}</p>
                  <p>Capacidad: {searchResult[0].capacidad}</p>
                  <p>Valor de arriendo: {searchResult[0].valorArriendo}</p>
                  <img
                    src={searchResult[0].img_url}
                    alt={searchResult[0].nombre}
                  />
                  {searchResult[0].tipo && (
                    <div>
                      <p>Tipo: {searchResult[0].tipo.title}</p>
                      <p>{searchResult[0].tipo.description}</p>
                    </div>
                  )}
                  {searchResult[0].caracteristicas && (
                    <div>
                      <p>Características:</p>
                      <ul>
                        {searchResult[0].caracteristicas.map(
                          (caracteristica) => (
                            <li key={caracteristica.id}>
                              {caracteristica.nombre}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <p>No se encontraron resultados.</p>
              )}
            </DialogContent>

            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Cerrar</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
  );
};

export default SearchSuggestion;
