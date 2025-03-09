import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useSyncProviders } from "./hooks/useSyncProviders";
import "./App.css";
import { contractABI } from "./contractABI";

function App() {
  const ETH_MULTIPLIER = 1_000_000;
  const providers = useSyncProviders();

  const [userAccount, setUserAccount] = useState<string>("");
  const [playerBalance, setPlayerBalance] = useState<string>("0");
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Raw provider from MetaMask
  const [currentProvider, setCurrentProvider] = useState<any>(null);

  // Contract instances

  // contract address
  const contractAddress = "0xE962Fce4C071AE6EEf6d7B771d4a6C4aae63F242";

  const handleClick = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      setIsLoading(true);
      setError(null);
      const account = (await providerWithInfo.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      setUserAccount(account[0]);
      setCurrentProvider(providerWithInfo.provider);

      await getPlayerBalance(providerWithInfo.provider);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayerBalance = async (provider: any) => {
    try {
      const ethersProvider = new ethers.BrowserProvider(provider);
      const signer = await ethersProvider.getSigner();

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const balanceWei = await contract.getBalance();

      const balanceEth = ethers.formatEther(balanceWei);

      const multipliedBalance = parseFloat(balanceEth) * ETH_MULTIPLIER;
      console.log(multipliedBalance);
      setPlayerBalance(multipliedBalance.toString());
    } catch (error: any) {
      setError(error.message || "Failed to get balance.");
    }
  };

  const handleDeposit = async () => {
    if (!currentProvider || !userAccount) {
      setError("Please connect your waller first");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const ethersProvider = new ethers.BrowserProvider(currentProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const amountWei = ethers.parseEther(depositAmount);
      const tx = await contract.deposit({ value: amountWei });

      await tx.wait();

      // Update balance
      await getPlayerBalance(currentProvider);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message || "Failed to deposit");
    }
  };

  const handleWithdraw = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const ethersProvider = new ethers.BrowserProvider(currentProvider);
      const signer = await ethersProvider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const amountEth = parseFloat(playerBalance) / ETH_MULTIPLIER;
      const amountWei = ethers.parseEther(amountEth.toString());

      const tx = await contract.withdraw(amountWei);

      await tx.wait();

      await getPlayerBalance(currentProvider);
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message || "Failed to withdraw");
    }
  };

  useEffect(() => {
    if (currentProvider && userAccount) {
      getPlayerBalance(currentProvider);
    }
  }, [userAccount]);

  return (
    <div className="App">
      <h2>Wallet Detected:</h2>
      <div className="providers">
        {providers.length > 0 ? (
          providers.map((provider: EIP6963ProviderDetail) => (
            <button
              key={provider.info.uuid}
              onClick={() => handleClick(provider)}
              disabled={isLoading}
            >
              <img src={provider.info.icon}></img>
              <div>{provider.info.name}</div>
            </button>
          ))
        ) : (
          <div>No announced wallet provider</div>
        )}
      </div>

      {userAccount && (
        <div>
          <h3>Connected Account</h3>
          <p>{userAccount}</p>

          <div className="player-stats">
            <h3>Player Balance</h3>
            <p className="balance">{playerBalance} COIN</p>
            <button
              onClick={() => getPlayerBalance(currentProvider)}
              disabled={isLoading}
            >
              Refresh Balance
            </button>
          </div>

          <div className="deposit-form">
            <h3>Deposit Funds</h3>
            <p>1 ETH = 1,000,000 COIN</p>
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              min="0.0000000000001"
              disabled={isLoading}
            />

            <button onClick={handleDeposit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Deposit ETH"}
            </button>
          </div>

          <div className="withdraw-button">
            <h3>Withdraw fund</h3>
            <button onClick={handleWithdraw} disabled={isLoading}>
              {isLoading ? "Processing..." : "Withdraw all coin"}
            </button>
          </div>

          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
