import 'animate.css';
import '@/styles/custom.css'
import '@/styles/variables.css'
import '@/styles/tailwind.css'
import '@/styles/nprogress.css'
import type { AppProps } from 'next/app'

import Router from "next/router";
import NProgress from 'nprogress'
import AppProvider from "../store/contexts/app-context";
import {Provider} from "react-redux";
import {store} from "@/store";

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Provider store={store}>
          <AppProvider>
              <Component {...pageProps} />
          </AppProvider>
      </Provider>
  )
}

export default MyApp
