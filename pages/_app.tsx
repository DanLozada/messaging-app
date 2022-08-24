import "../styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="script"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          if (!document.cookie.includes('jwt') && window.location.pathname !== '/login') {
            window.location.href = "/login"
          }
        `,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
