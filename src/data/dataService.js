// dataService.js
import initialCategorias from './categorias.json';

export const leerCategorias = () => {
  const categorias = localStorage.getItem('categorias');
  return categorias ? JSON.parse(categorias) : [];
};

export const inicializarCategorias = () => {
  if (!localStorage.getItem('categorias')) {
    localStorage.setItem('categorias', JSON.stringify(initialCategorias));
  }
};

export const agregarCategoria = (nuevaCategoria) => {
  const categorias = leerCategorias();
  categorias.push(nuevaCategoria);
  localStorage.setItem('categorias', JSON.stringify(categorias));
};


// simulacion usando localStorage. Esto simulará el comportamiento de lectura y escritura en un archivo JSON.
