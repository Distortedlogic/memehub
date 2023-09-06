import { useFormik } from 'formik';
import { useToastFormikErrors } from 'hooks/useToastFormikErrors';
import type { GetServerSideProps, NextPage } from 'next';
import { RegisterTokenEntity, authControllerGetSignupToken, authControllerRegister } from 'rest-client';
import { Button, Input, Label } from 'ui';
import * as yup from 'yup';

interface IFormData {
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

interface PageProps {
  token: RegisterTokenEntity;
}

export const getServerSideProps: GetServerSideProps<PageProps, { tokenId: string }> = async ({ query: { tokenId } }) => {
  if (!tokenId || Array.isArray(tokenId)) return { redirect: { permanent: true, destination: '/auth/login' } };
  return {
    props: {
      token: await authControllerGetSignupToken({ pathParams: { tokenId } }),
    },
  };
};

const Page: NextPage<PageProps> = ({ token }) => {
  const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
    firstName: yup.string().min(6).required(),
    lastName: yup.string().min(6).required(),
    password: yup
      .string()
      .min(8)
      .max(40)
      .required()
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain one uppercase, one number, and one special case character',
      ),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Passwords must match'),
  });

  const { errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik<IFormData>({
    initialValues: { firstName: '', lastName: '', password: '', passwordConfirm: '' },
    validationSchema,
    onSubmit: (values) => authControllerRegister({ body: { tokenId: token.id, ...values } }),
  });

  useToastFormikErrors(errors, touched);

  return (
    <form autoComplete="on" className="mx-auto flex max-w-sm flex-col space-y-4" onSubmit={handleSubmit}>
      <Label className="text-lg font-medium text-black">Register</Label>
      <Input name="firstName" placeholder="First Name" onChange={handleChange} onBlur={handleBlur} />
      <Input name="lastName" placeholder="Last Name" onChange={handleChange} onBlur={handleBlur} />
      <Input name="password" placeholder="Password" type="password" onChange={handleChange} onBlur={handleBlur} />
      <Input name="passwordConfirm" placeholder="Confirm Password" type="password" onChange={handleChange} onBlur={handleBlur} />
      <Button className="mx-auto w-24" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
};
export default Page;
