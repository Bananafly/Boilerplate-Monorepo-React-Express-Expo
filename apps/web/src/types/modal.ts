export type ModalType =
  | 'editDocumentation'
  | 'shareProject'
  | 'createSomethingExample';

interface EditDocumentationModalData {
  formInstanceId: string;
  projectId: string;
  formName: string;
}

interface ShareProjectModalData {
  projectId: string;
}

export interface ModalState {
  isOpen: boolean;
  data: EditDocumentationModalData | ShareProjectModalData | null; // You might want to make this more specific based on your needs
}

export interface ModalStore {
  modals: Record<ModalType, ModalState>;
  openModal: (modalType: ModalType, data?: any) => void;
  closeModal: (modalType: ModalType) => void;
}
