import React from 'react';
import { AppProps } from 'next/app';
import Amplify from 'aws-amplify';
import awsExports from '../aws-exports';
import '../styles/globals.css';

Amplify.configure(awsExports);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp; 