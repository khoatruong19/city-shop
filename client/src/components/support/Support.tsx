import { Box, Button, Stack, Textarea, TextInput, Title } from '@mantine/core';
import MetaData from '../layout/MetaData';
import SupportImage from '../../images/support.jpg';
import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import toaster from '../../utils/helpers/toaster';

const Support = () => {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_SERVICE_ID!,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID!,
        formRef.current!,
        process.env.REACT_APP_EMAIL_PUBLIC_ID!
      )
      .then(
        (result) => {
          toaster({
            id: 'reqport',
            message: 'Thanks for your report we will reply it in very soon...',
            success: true,
          });
          setDone(true);
          setLoading(false);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <Stack
      sx={{
        paddingTop: '4rem',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${SupportImage})`,
        backgroundRepeat: `no-repeat`,
      }}
    >
      <MetaData title="Support" />
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title order={2}>Hey! How can we improve our services</Title>
        <Title order={2}>Report us for something...</Title>
      </Box>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={30}>
          <TextInput
            sx={{ width: '25vw' }}
            size="md"
            placeholder="Write your name ..."
            name="user_name"
          />
          <TextInput
            sx={{ width: '25vw' }}
            size="md"
            placeholder="Write a subject ..."
            name="subject"
          />
          <TextInput
            sx={{ width: '25vw' }}
            size="md"
            placeholder="Write your email ..."
            name="user_email"
          />
          <Textarea
            sx={{ width: '25vw' }}
            size="md"
            minRows={2}
            autosize
            placeholder="Write your message ..."
            name="message"
          />
          <Button loading={loading} sx={{ height: '3rem' }} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Support;
