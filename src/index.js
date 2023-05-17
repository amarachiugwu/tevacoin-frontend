import React from 'react';
import ReactDOM from 'react-dom/client';
import '@rainbow-me/rainbowkit/styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {getDefaultWallets, RainbowKitProvider} from '@rainbow-me/rainbowkit';
import {
  WagmiConfig,
  createClient,
  configureChains,
} from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains';


import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc"
import env from "react-dotenv";
// console.log(env)

const { chains, provider, webSocketProvider } = configureChains(
  // chains we support 
  [mainnet],
  [
  // infuraProvider({apiKey: env.INFURA_API_KEY}), 
  // alchemyProvider({apiKey: env.ALCHEMY_GOERLI_API_KEY}), 
  publicProvider()],
 
);

const {connectors} = getDefaultWallets({
  appName: "Teva Coin",
  chains,
});

const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WagmiConfig client={client}>
    <RainbowKitProvider chains={chains}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
