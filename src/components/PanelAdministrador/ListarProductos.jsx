import { useState, useEffect } from "react";
import RegistrarProducto from "./RegistrarProducto";
import AdminListPropd from "../AdminListProd/AdminListProd";
import RegistrarCategoria from "./RegistrarCategoria";
import styles from "./ListarProductos.module.css";

const ListarProductos = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
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
            <>
              <button
                className={`${styles.btnAgregar} ${
                  selectedComponent === null && styles.selected
                }`}
                onClick={() => handleComponentChange(null)}
              >
                Panel
              </button>
              <button
                className={`${styles.btnAgregar} ${
                  selectedComponent === "RegistrarProducto" && styles.selected
                }`}
                onClick={() => handleComponentChange("RegistrarProducto")}
              >
                Agregar Producto
              </button>
              <button
                className={`${styles.btnAgregar} ${
                  selectedComponent === "AdminListProd" && styles.selected
                }`}
                onClick={() => handleComponentChange("AdminListProd")}
              >
                Listar productos
              </button>
              <button
                className={`${styles.btnAgregar} ${
                  selectedComponent === "RegistrarCategoria" && styles.selected
                }`}
                onClick={() => handleComponentChange("RegistrarCategoria")}
              >
                Agregar Categoria
              </button>
            </>
          )}
        </div>
      </div>
      <div className={styles.content2}>
        {!isMobile && (
          <>
            {selectedComponent === null && ( // Renderizar el panel si no se ha seleccionado ningún componente
              <div className={styles.panelContainer} onClick={handlePanelClick}>
             {/*    <div className={styles.panel}>
                  <div className={styles.cuadrante}>Cuadrante 1</div>
                  <div className={styles.cuadrante}>Cuadrante 2</div>
                </div> */}
               {/*  <div className={styles.panel}>
                  <div className={styles.cuadrante}>Cuadrante 3</div>
                  <div className={styles.cuadrante}>Cuadrante 4</div>
                </div> */}
              </div>
            )}
            <div className={styles.componentContainer}>
              {selectedComponent === "RegistrarProducto" && (
                <RegistrarProducto />
              )}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "AdminListProd" && <AdminListPropd />}
            </div>
            <div className={styles.componentContainer}>
              {selectedComponent === "RegistrarCategoria" && (
                <RegistrarCategoria />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListarProductos;
