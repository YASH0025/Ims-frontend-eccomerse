// pages/_app.js
import Navbar from "../{componets}/navbar";
// pages/_app.js or global stylesheet
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <>
      {/* <Navbar /> */}
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
