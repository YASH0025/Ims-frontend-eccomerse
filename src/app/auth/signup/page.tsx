// pages/login.tsx

import RootLayout from "@/app/layout";
import LoginForm from "@/app/{componets}/login-form";
import UserForm from "@/app/{componets}/signup-form";

function LoginPage() {
  return (
    <RootLayout isLoginPage={true}>
      <UserForm />
    </RootLayout>
  );
}

export default LoginPage;
