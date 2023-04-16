import { Box } from '@chakra-ui/react';
import { useNotifValue } from '../context/NotificationContext';
export const Notification = () => {
  const message = useNotifValue();
  if (message.notif === null) {
    return null;
  }

  return (
    <Box
      className={'notif ' + message.notifType}
      position="absolute"
      top={0}
      right={0}
      m={2}
      p={2}
    >
      {message.notif}
    </Box>
  );
};
