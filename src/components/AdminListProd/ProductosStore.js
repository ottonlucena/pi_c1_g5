import { create } from 'zustand';
import data from '../../data/productos.json';

const useProductosStore = create((set) => ({
  productos: data,
  setProductos: (productos) => set({ productos }),
  sortProductos: (campo, orden) => {
    set((state) => ({
      productos: [...state.productos].sort((a, b) => {
        if (orden === 'asc') {
          return a[campo].localeCompare(b[campo]);
        } else {
          return b[campo].localeCompare(a[campo]);
        }
      }),
    }));
  },
  eliminarProducto: (id) => {
    set((state) => ({
      productos: state.productos.filter((producto) => producto.id !== id),
    }));
    alert(`Product with ID: ${id} has been deleted`);
  },
}));

export default useProductosStore;
