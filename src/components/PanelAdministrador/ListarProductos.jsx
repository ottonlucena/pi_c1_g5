import { useState, useEffect } from "react";
import RegistrarProducto from "./RegistrarProducto";
import AdminListProd from "../AdminListProd/AdminListProd";
import RegistrarCategoria from "./RegistrarCategoria";
import AdminListCategorias from "../AdminListCategorias/AdminListCategorias";
import AdminListUser from "../AdminListUser/AdminListUser";
import AdminListCaracteristicas from "../AdminListCarac/AdminListCaracteristicas";
import { makeStyles, Tab, TabList } from "@fluentui/react-components";
import styles from "./ListarProductos.module.css";

const useFluentStyles = makeStyles({
  root: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    padding: "50px 20px",
    rowGap: "20px",
  },
  tab: {
    marginBottom: "20px", // Añade espacio entre los tabs
  },
});

const ListarProductos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("panel");

  const fluentStyles = useFluentStyles();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleComponentChange = (componentName) => {
    setSelectedComponent(componentName);
  };

  const handlePanelClick = () => {
    // Lógica para manejar el click en el panel
  };

  return (
    <div className={styles.contMain}>
      {isMobile && (
        <div className={styles.mobileOverlay}>
          <p className={styles.msj}>
            Esta función no está disponible en dispositivos móviles.
          </p>
        </div>
      )}
      <div className={styles.container}>
        <div className={styles.contBtn}>
          <img
            src="/iconoftransparent.svg"
            alt="Logo de tu empresa"
            className={styles.logo}
          />
          {!isMobile && (
            <div className={fluentStyles.root}>
              <TabList
                defaultSelectedValue="panel"
                vertical
                onTabSelect={(e, { value }) => handleComponentChange(value)}
              >
                <Tab value="panel" className={fluentStyles.tab}>Panel</Tab>
                <Tab value="RegistrarProducto" className={fluentStyles.tab}>Agregar Producto</Tab>
                <Tab value="AdminListProd" className={fluentStyles.tab}>Listar productos</Tab>
                <Tab value="RegistrarCategoria" className={fluentStyles.tab}>Agregar Categoria</Tab>
                <Tab value="AdminListCategorias" className={fluentStyles.tab}>Listar Categorías</Tab>
                <Tab value="AdminListUser" className={fluentStyles.tab}>Listar Usuarios</Tab>
                <Tab value="AdminListCaracteristicas" className={fluentStyles.tab}>Listar Caracteristicas</Tab>
              </TabList>
            </div>
          )}
        </div>
      </div>
      <div className={styles.content2}>
        {!isMobile && (
          <>
            {selectedComponent === "panel" && (
              <div className={styles.panelContainer} onClick={handlePanelClick}>
                {/* Panel content here */}
              </div>
            )}
            <div className={styles.componentContainer}>
              {selectedComponent === "RegistrarProducto" && (
                <RegistrarProducto />
              )}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "AdminListProd" && <AdminListProd />}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "RegistrarCategoria" && (
                <RegistrarCategoria />
              )}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "AdminListCategorias" && (
                <AdminListCategorias />
              )}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "AdminListUser" && <AdminListUser />}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "AdminListCaracteristicas" && (
                <AdminListCaracteristicas />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListarProductos;



