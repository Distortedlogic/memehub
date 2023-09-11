import 'symbol-observable';

import 'tailwind/global.css';

import { StoreProvider } from 'easy-peasy';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { nextReduxWrapper } from '../store/global.store';

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { store, props } = nextReduxWrapper.useWrappedStore(pageProps);
  return (
    <StoreProvider store={store}>
      <Component {...props} />
    </StoreProvider>
  );
};

export default MyApp;
