import type { FormikErrors, FormikTouched } from "formik";
import { useEffect } from "react";
import { useToast } from "ui/use-toast";

export const useToastFormikErrors = <IFormData = {}>(errors: FormikErrors<IFormData>, touched?: FormikTouched<IFormData>) => {
  const { toast } = useToast();
  useEffect(() => {
    for (const [field, message] of Object.entries(errors) as [string, string][]) {
      if (typeof touched !== "undefined" && !touched[field as keyof FormikTouched<IFormData>]) continue;
      console.error(message);
      toast({ title: message, variant: "destructive" });
    }
  }, [errors, touched]);
};
