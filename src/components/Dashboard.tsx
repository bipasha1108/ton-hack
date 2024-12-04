import React from 'react';

const Dashboard: React.FC<{ nftRewards: string[] }> = ({ nftRewards }) => (
  <div className="p-4">
    <h2 className="text-2xl">Dashboard</h2>
    <p className="mt-4">NFT Rewards Earned:</p>
    <ul>
      {nftRewards.length > 0 ? (
        nftRewards.map((nft, index) => (
          <li key={index} className="mt-2">
            <img src={nft} alt={`NFT ${index + 1}`} className="w-24 h-24" />
          </li>
        ))
      ) : (
        <p>No NFTs earned yet. Complete lessons to earn rewards!</p>
      )}
    </ul>
  </div>
);

export default Dashboard;
