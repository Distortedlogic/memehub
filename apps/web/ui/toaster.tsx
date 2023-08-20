import { AiFillCheckCircle } from "react-icons/ai";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "src/components/ui/toast";
import { useToast } from "src/components/ui/use-toast";
export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              <div className="flex justify-start space-x-2">
                {variant === "success" && <AiFillCheckCircle size={20} className="text-green-500" />}
                {title && <ToastTitle className="">{title}</ToastTitle>}
              </div>
              {description && <ToastDescription>{description}</ToastDescription>}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
