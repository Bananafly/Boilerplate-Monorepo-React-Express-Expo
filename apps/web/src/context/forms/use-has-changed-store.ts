import { create } from 'zustand';

interface HasChangedState {
  hasChanged: boolean;
  setHasChanged: (value: boolean) => void;
  resetChanges: () => void;
}

const useHasChangedStore = create<HasChangedState>((set) => ({
  hasChanged: false,
  setHasChanged: (value: boolean) => set({ hasChanged: value }),
  resetChanges: () => set({ hasChanged: false }),
}));

export default useHasChangedStore;
