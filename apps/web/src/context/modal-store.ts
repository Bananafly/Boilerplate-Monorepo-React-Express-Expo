import { create } from 'zustand';

import { ModalStore } from '../types/modal';

const useModalStore = create<ModalStore>((set) => ({
  modals: {
    editDocumentation: {
      isOpen: false,
      data: { formInstanceId: '', projectId: '', formName: '' },
    },
    shareProject: {
      isOpen: false,
      data: { projectId: '' },
    },
    // Example for creating a new modal
    createSomethingExample: { isOpen: false, data: null },
  },
  openModal: (modalType, data) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { isOpen: true, data },
      },
    })),
  closeModal: (modalType) =>
    set((state) => ({
      modals: {
        ...state.modals,
        [modalType]: { ...state.modals[modalType], isOpen: false },
      },
    })),
}));

export default useModalStore;
