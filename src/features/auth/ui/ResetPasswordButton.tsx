import { Button } from "@/shared/ui";
import { resetPassword } from "../action/reset-password";

export default function ResetPasswordButton() {
  return <Button formAction={resetPassword}>Reset password</Button>;
}
