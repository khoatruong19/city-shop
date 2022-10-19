import { Button, Group, Modal, Title } from '@mantine/core';

interface IProps {
  open: boolean;
  handleConfirm: (yes: boolean) => void;
  setOpen: Function;
  title: string;
}

const ConfirmModal = ({ open, setOpen, handleConfirm, title }: IProps) => {
  return (
    <Modal opened={open} onClose={() => setOpen(false)} title={title}>
      <Title order={4}>Please confirm this task!</Title>
      <Group spacing={10} sx={{ justifyContent: 'flex-end' }}>
        <Button color="red" onClick={() => handleConfirm(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={() => handleConfirm(true)}>
          Argee
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmModal;
