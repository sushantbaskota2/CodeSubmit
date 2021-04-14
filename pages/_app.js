import '../styles/globals.scss';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-terminal';
import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import { ToastProvider } from 'react-toast-notifications';

const WrappedApp = ({ Component, pageProps }) => (
    <ToastProvider>
        <Component {...pageProps} />
    </ToastProvider>
);

export default wrapper.withRedux(WrappedApp);
