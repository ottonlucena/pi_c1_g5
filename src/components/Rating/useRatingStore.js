import {create} from 'zustand';

const useRatingStore = create((set) => ({
  juegoId: null,
  setJuegoId: (id) => set({ juegoId: id }),
}));

export default useRatingStore;