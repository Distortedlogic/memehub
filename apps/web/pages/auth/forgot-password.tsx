import { useFormik } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as yup from "yup";
import { NoSidebarLayout } from "../../components/layout/NoSidebarLayout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useToast } from "../../components/ui/use-toast";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { authControllerForgotPassword } from "../../rest/apiComponents";

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
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await authControllerForgotPassword({ body: values });
        toast({ title: "Please check your email", variant: "success" });
        router.push("/auth/login");
      } catch (error) {
        toast({ title: error.payload, variant: "destructive" });
      }
    },
  });

  useToastFormikErrors(errors, touched);
  return (
    <NoSidebarLayout>
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
          {isSubmitting ? "Sending..." : "Send Email"}
        </Button>
      </form>
    </NoSidebarLayout>
  );
};

export default Page;
