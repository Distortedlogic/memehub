import { useFormik } from 'formik';
import { nextUrqlClient, useLoginMutation } from 'gql-client';
import { useToastFormikErrors } from 'hooks';
import type { NextPage } from 'next';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Button, Input } from 'ui';
import { isBrowser } from 'utils';
import * as yup from 'yup';

interface IFormData {
  email: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Page: NextPage = () => {
  const router = useRouter();
  const [, loginFN] = useLoginMutation();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting } = useFormik<IFormData>({
    initialValues: {
      email: isBrowser() ? document.querySelector<HTMLInputElement>('input[name="email"]')?.value ?? '' : '',
      password: isBrowser() ? document.querySelector<HTMLInputElement>('input[name="password"]')?.value ?? '' : '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ password, email }, {}) => {
      const { data, error } = await loginFN({ email, password });
      if (data && !error) {
        await router.push('/dashboard');
      }
    },
  });

  useToastFormikErrors(errors, touched);

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form className="flex flex-col items-center justify-center space-y-2" autoComplete="on" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange}
          onInput={handleChange}
          onBlur={handleBlur}
        />
        <Input
          type="password"
          placeholder="Password"
          autoComplete="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onInput={handleChange}
          onBlur={handleBlur}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
