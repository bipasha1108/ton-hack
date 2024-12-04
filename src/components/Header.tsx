import React from 'react';
import { TonConnectUIProvider, TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';


const Header: React.FC<{ level: number; progress: number }> = ({ level, progress }) => (
    
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    
    <h1 className="text-xl">Learn-a-TON</h1>
    <div className="flex items-center space-x-4">
      <div>
        <span>Level: {level}</span>
        <div className="w-48 bg-gray-300 rounded-full h-4 mt-1">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <TonConnectButton />
    </div>
  </header>
);

const App: React.FC = () => (
  <TonConnectUIProvider manifestUrl="http://localhost:3000/tonconnect-manifest.json">
    <Header level={1} progress={50} />
  </TonConnectUIProvider>
);

export default App;
