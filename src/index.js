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
  chain,
} from 'wagmi'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  // chains we support 
  [chain.mainnet, chain.goerli],
  [
  // alchemyProvider({apiKey: "fAO9lKh5UMDFsEW1eyT_AbY7kcppthXn"}), 
  // infuraProvider({apiKey: "e92c38757159497d97aad034c8e59232"}), 
  publicProvider()],
);

const {connectors} = getDefaultWallets({
  appName: "EventFlow",
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
