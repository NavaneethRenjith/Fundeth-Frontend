import { useEffect, useState } from 'react';
// import contract from './contracts/NFTCollectible.json';
import { ethers } from 'ethers';
import { abi, contractAddress } from "./constants.js"

// const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
// const abi = contract.abi;

function ProjectPage() {

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have Metamask installed!");
      return;
    } else {
      console.log("Wallet exists! We're ready to go!")
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWalletHandler = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Please install Metamask!");
    }

    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err)
    }
  }

  // const mintNftHandler = async () => {
  //   try {
  //     const { ethereum } = window;

  //     if (ethereum) {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const nftContract = new ethers.Contract(contractAddress, abi, signer);

  //       console.log("Initialize payment");
  //       let nftTxn = await nftContract.mintNFTs(1, { value: ethers.utils.parseEther("0.01") });

  //       console.log("Mining... please wait");
  //       await nftTxn.wait();

  //       console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

  //     } else {
  //       console.log("Ethereum object does not exist");
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='button1'>
        Connect Wallet
      </button>
    )
  }

  const fund = async () => {
    // const ethAmount = document.getElementById("ethAmount").value
    const ethAmount = "0.01";
    console.log(`Funding with ${ethAmount}...`)
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      try {
        const transactionResponse = await contract.fund({
          value: ethers.utils.parseEther(ethAmount),
        })
        // await listenForTransactionMine(transactionResponse, provider)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const withdraw = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, abi, signer)
      console.log("Withdraw!!")
      try {
        const transactionResponse = await contract.withdraw()
        // await listenForTransactionMine(transactionResponse, provider)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Please install MetaMask");
    }
  }

  const getBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      try {
        const balance = await provider.getBalance(contractAddress)
        console.log(ethers.utils.formatEther(balance))
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("Please install MetaMask")
    }
  }


  // const mintNftButton = () => {
  //   return (
  //     <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
  //       Mint NFT
  //     </button>
  //   )
  // }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

  return (
    <div className='main-app'>
      <h1>Welcome to xyz project</h1>
      <div>
        {connectWalletButton()}
      </div>
      <div>
        <button onClick={fund} className='button2'>
          Fund
        </button>
      </div>
      <div>
        <button onClick={withdraw} className='button3'>
          Withdraw
        </button>
      </div>
      <div>
        <button onClick={getBalance} className='button2'>
          See Balance
        </button>
      </div>
    </div>
  )
}

export default ProjectPage;