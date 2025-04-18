export interface IModal{
    id: string;
    title: string;
    content: string;
    type: 'info' | 'warning' | 'error';
    isVisible: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
}