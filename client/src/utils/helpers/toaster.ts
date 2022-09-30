import { showNotification } from '@mantine/notifications';

interface ToastParams {
  id: string;
  message: string;
  title?: string;
  success?: boolean;
}

const toaster = ({ id, message, success, title }: ToastParams) => {
  return showNotification({
    id,
    disallowClose: false,
    autoClose: 3000,
    title,
    message,
    color: success ? 'green' : 'red',
    sx: { fontWeight: 700 },
    loading: false,
  });
};

export default toaster;
