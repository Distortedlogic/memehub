import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
import type { FC } from 'react';

interface VerifyEmailEmailProps {
  link: string;
  firstName: string;
  lastName: string;
}

export const VerifyEmailEmail: FC<VerifyEmailEmailProps> = ({ link, firstName, lastName }) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Lobbymatic Email Verification</Preview>
      <Container className="mx-auto py-20">
        <Text className="text-base font-light leading-6">
          Hi {firstName} {lastName},
        </Text>
        <Text className="text-base font-light leading-6">
          Welcome to Koala, the sales intelligence platform that helps you uncover qualified leads and close deals faster.
        </Text>
        <Section className="text-center">
          <Button className="block rounded-md bg-purple-600 py-3 px-12 text-base text-white" href={link}>
            Verify Email
          </Button>
        </Section>
        <Text className="text-base font-light leading-6">
          Best,
          <br />
          The Lobbymatic team
        </Text>
      </Container>
    </Html>
  </Tailwind>
);
