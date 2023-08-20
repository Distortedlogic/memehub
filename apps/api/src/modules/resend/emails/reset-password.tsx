import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Html } from '@react-email/html';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
import type { FC } from 'react';

interface ResetPasswordEmailProps {
  link: string;
  firstName: string;
  lastName: string;
}

export const ResetPasswordEmail: FC<ResetPasswordEmailProps> = ({ link, firstName, lastName }) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Lobbymatic Password Reset</Preview>
      <Container className="border border-gray-200 bg-white p-6">
        <Section>
          <Text className="text-base font-light text-gray-700">
            Hi {firstName} {lastName},
          </Text>
          <Text className="text-base font-light text-gray-700">
            Someone recently requested a password change for your Lobbymatic account. If this was you, you can set a new password here:
          </Text>
          <Button
            className="block w-52 rounded-lg bg-blue-500 py-3 px-2 text-center text-base font-semibold text-white hover:bg-blue-600"
            href={link}
          >
            Reset password
          </Button>
          <Text className="text-base font-light text-gray-700">
            If you don't want to change your password or didn't request this, just ignore and delete this message.
          </Text>
          <Text className="text-base font-light text-gray-700">
            To keep your account secure, please don't forward this email to anyone.
          </Text>
          <Text className="text-base font-light text-gray-700">Cheers,</Text>
          <Text className="text-base font-light text-gray-700">The Lobbymatic Team</Text>
        </Section>
      </Container>
    </Html>
  </Tailwind>
);
