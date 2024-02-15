// pages/login.tsx

import RootLayout from "@/app/layout";
import LoginForm from "@/app/{componets}/login-form";

function LoginPage() {
  return (
    <RootLayout isLoginPage={true}>
      <LoginForm />
    </RootLayout>
  );
}

export default LoginPage;
