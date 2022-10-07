import { AppProps } from "next/app"
import { globalStyles } from "../styles/global";

import { Container } from "../styles/pages/app";
import { Header } from "../components/Header";
import { CartContextProvider } from "../contexts/CartContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  globalStyles();

  const { pathname } = useRouter();

  return (
    <Container>
      <CartContextProvider>
        {pathname !== '/success' && (
          <Header />
        )}

        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}