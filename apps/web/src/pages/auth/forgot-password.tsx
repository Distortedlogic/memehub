import { useFormik } from 'formik';
import { useToastFormikErrors } from 'hooks/useToastFormikErrors';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { authControllerForgotPassword } from 'rest-client/apiComponents';
import { Button, Input, Label, useToast } from 'ui';
import * as yup from 'yup';

interface IFormData {
  email: string;
}

const validationSchema = yup.object({
  email: yup.string().email().required(),
});

const Page: NextPage = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { handleSubmit, handleChange, handleBlur, errors, touched, isSubmitting } = useFormik<IFormData>({
    initialValues: {
      email: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authControllerForgotPassword({ body: values });
        toast({ title: 'Please check your email', variant: 'success' });
        router.push('/auth/login');
      } catch (error) {
        toast({ title: error.payload, variant: 'destructive' });
      }
    },
  });

  useToastFormikErrors(errors, touched);
  return (
    <form autoComplete="on" onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col space-y-4">
      <Label className="text-lg font-medium">Reset Password</Label>
      <Input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        onBlur={handleBlur}
        className="w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Email'}
      </Button>
    </form>
  );
};

export default Page;
