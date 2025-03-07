import { useState } from "react";
import { useSyncProviders } from "./hooks/useSyncProviders";
import "./App.css";
function App() {
  const providers = useSyncProviders();
  console.log("Providers detected:", providers);
  const handleClick = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const account = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>Wallet Detected:</h2>
      <div className="providers">
        {providers.length > 0 ? (
          providers.map((provider: EIP6963ProviderDetail) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleClick(provider)}
            >
              <img src={provider.info.icon}></img>
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No announced wallet provider</div>
        )}
      </div>
    </div>
  );
}

export default App;
