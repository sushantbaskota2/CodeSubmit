import '../styles/globals.scss';
// import 'ace-builds/src-noconflict/mode-javascript';
// import 'ace-builds/src-noconflict/theme-terminal';
import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';

const WrappedApp = ({ Component, pageProps }) => <Component {...pageProps} />;

export default wrapper.withRedux(WrappedApp);
