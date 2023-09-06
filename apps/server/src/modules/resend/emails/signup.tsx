import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import { Head } from '@react-email/head';
import { Heading } from '@react-email/heading';
import { Html } from '@react-email/html';
import { Link } from '@react-email/link';
import { Preview } from '@react-email/preview';
import { Section } from '@react-email/section';
import { Tailwind } from '@react-email/tailwind';
import { Text } from '@react-email/text';
import type { FC } from 'react';

interface SignupEmailProps {
  link: string;
}

export const SignupEmail: FC<SignupEmailProps> = ({ link }) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Lobbymatic Sign Up</Preview>
      <Container className="border border-gray-200 bg-white p-6">
        <Section>
          <Text className="text-base font-light text-gray-700">Hello New User,</Text>
          <Text className="text-base font-light text-gray-700">
            Welcome to the Lobbymatic Platform! We're excited to have you onboard. To get started, please complete the account registration
            process by following the steps below:
          </Text>
          <Heading as="h3">Step 1: Account Creation</Heading>
          <Text className="text-base font-light text-gray-700">To create your account, please click on the following link:</Text>
          <Button
            className="block w-52 rounded-lg bg-blue-500 py-3 px-2 text-center text-base font-semibold text-white hover:bg-blue-600"
            href={link}
          >
            Account Creation Link
          </Button>
          <Heading as="h3">Step 2: Provide Account Details</Heading>
          <Text className="text-base font-light text-gray-700">
            Once you click the link, you will be redirected to a page where you can provide your account details. Please enter the required
            information accurately to ensure a smooth onboarding process for your organization.
          </Text>
          <Heading as="h3">Step 3: Access User Management Platform</Heading>
          <Text className="text-base font-light text-gray-700">
            Once you've completed the account creation and provided the necessary details, you will gain access to the User Management
            Platform. This platform enables you to efficiently manage the onboarding of users onto our app.
          </Text>
          <Text className="text-base font-light text-gray-700">
            If you have any questions or encounter any issues during the registration process, please don't hesitate to reach out to our
            support team at
          </Text>
          <Link href="mailto:support@lobbymatic.com">support@lobbymatic.com</Link>
          <Text className="text-base font-light text-gray-700">
            We look forward to assisting you in streamlining your user onboarding process and maximizing the benefits of our app for your
            organization.
          </Text>
          <Text className="text-base font-light text-gray-700">Thank you for choosing Lobbyist Firm's User Management Platform!</Text>
        </Section>
      </Container>
    </Html>
  </Tailwind>
);
