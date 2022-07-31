import { useEffect, useState } from 'react';
// import contract from './contracts/NFTCollectible.json';
import { ethers } from 'ethers';
import { abi, contractAddress } from "./constants.js"
import "./ProjectPage.css"

// const contractAddress = "0x355638a4eCcb777794257f22f50c289d4189F245";
// const abi = contract.abi;

function ProjectPage() {
  <script src="https://cdn.tailwindcss.com"></script>

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
    // <div className='main-app'>
    //   <h1>Welcome to xyz project</h1>
    //   <div>
    //     {connectWalletButton()}
    //   </div>
    //   <div>
    //     <button onClick={fund} className='button2'>
    //       Fund
    //     </button>
    //   </div>
    //   <div>
    //     <button onClick={withdraw} className='button3'>
    //       Withdraw
    //     </button>
    //   </div>
    //   <div>
    //     <button onClick={getBalance} className='button2'>
    //       See Balance
    //     </button>
    //   </div>
    // </div>
    <>
    <div style={{ marginBottom: "3 rem", backgroundColor: "white" }}>
      <div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            margin: "0.75rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              textAlign: "center",
              padding: "0.75rem",
            }}
          >
            Project Title
          </h1>
          <p
            style={{
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              color: "black",
            }}
          >
            dkfjlkadjsfk dkfjlasjdf kjsdffkjadjsflkjaksdfflkdfas
            dfioqweruopqweri oewqiruqwieo qweiouroiqu
            roiquewoiruqoiweruoiqewrru qwoieuroiqewruoikdsflkjslkdfjl;asdjf
            f;aksfdjlsjdfk
            asdjflksajflkajsffl;khasoifkjasperroikjasddo;aisfjkaso;iu
            ddjkas;ifduwjeo;iu asflkasf;ilasfduj
          </p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",

          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "66.666%",
            margin: ".075rem",
            paddingLeft: "3rem",
          }}
        >
          <img
            style={{ maxHeight: "100%", width: "100%" }}
            src="https://ksr-ugc.imgix.net/assets/037/852/942/0d313cc981d61e25066c46ee693779a4_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1024&h=576&fit=crop&v=1656976124&auto=format&frame=1&q=92&s=c393fc344af09cff82607f40b28dd7df"
            alt="dicegame"
          />
        </div>
        <div
          style={{
            width: "33%",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100",
              backgroundColor: "grey",
              height: "1.25rem",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                width: "45%",
                backgroundColor: "blue",
                height: "1.25rem",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ padding: "0.25 rem" }}>
              <h1
                style={{
                  fontSize: "1.875rem",
                  lineHeight: "2.25rem",
                  padding: ".5 rem",
                  paddingLeft: ".5rem",
                  color: "green",
                }}
              >
                5000 eth
              </h1>
              <p
                style={{
                  color: "grey",
                  paddingLeft: ".5rem",
                  paddingBottom: ".5rem",
                }}
              >
                pledged of etherium 6000 goal
              </p>
            </div>
            <div style={{ padding: ".5 rem" }}>
              <h1
                className="text-2xl p-1 text-black-300"
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  padding: ".5 rem",
                  paddingLeft: ".5rem",

                  color: "black",
                }}
              >
                1000
              </h1>
              <p
                style={{
                  color: "grey",
                  paddingLeft: ".5rem",
                  paddingBottom: ".5rem",
                }}
              >
                backers
              </p>
            </div>
            <div style={{ padding: "0.5rem" }}>
              <h1
                style={{
                  fontSize: "1.5rem",
                  lineHeight: "2rem",
                  paddingLeft: ".25rem",

                  color: "black",
                }}
              >
                12
              </h1>
              <p
                style={{
                  color: "black",
                  paddingLeft: ".25rem",
                  paddingBottom: ".5rem",
                }}
              >
                days to go
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingTop: "1.25 rem",
                paddingLeft: ".25rem",
                paddingBottom: ".5rem",

              }}
            >
              <input
                type="text"
                placeholder="Enter the amount"
                className="w-15 border-2"
                style={{
                  width: "10rem",
                  paddingLeft: ".5rem",
                  borderWidth: "2px",
                }}
              />
              <div
                style={{
                  margin: ".25rem",
                }}
              >
                eth
              </div>
            </div>

            <div
              style={{
                height: "3rem",
                width: "100%",
                marginBottom: ".75rem",
                marginTop: "0.75rem",
                backgroundColor: "rgba(16,189,125,1)",
              }}
            >
              <button
                style={{
                  width: "100%",
                  height: "3rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                type="button" onClick={fund}
              >
                Fund this Project
              </button>
            </div>
            <div
              style={{
                width: "33.33%",
                height: "2.25rem",
                marginTop: "0.75rem",
                marginBottom: "0.75rem",
                backgroundColor: "lightgray",
              }}
            >
              <button
                type="button"
                style={{
                  width: "100%",
                  height: "2.25rem",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                onClick = {connectWalletHandler}
              >
                Connect wallet
              </button>
              <button onClick={withdraw} className='button3'>
           Withdraw
        </button>
      </div>
       <div>
         <button onClick={getBalance} className='button2'>
           See Balance
         </button>
            </div>
            <div
              style={{
                marginTop: "0.75rem",
              }}
            >
              <p
                style={{
                  fontsize: "0.875rem",
                  lineHeight: "1.25rem",
                }}
              >
                <u>All or nothing</u> 
                <br/>
                This project will only be funded if it
                reached the goal by August 30
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        gap: "1rem",
        placeItems: "center",
        backgroundColor: "lightgray",
        paddding: "1.5rem",
        marginBottom: "1.5rem",
        textAlign: "start",
      }}
    >
      <div>
        <li> Fundeth connects creators with backers to fund projects</li>
      </div>
      <div>
        <li>
          Rewards aren't guaranteeed but creators must regularly update backers
        </li>
      </div>
      <div>
        <li>
          You're only charged if the project meets its funding goal by the
          campaign deadline
        </li>
      </div>
    </div>
  </>
  )
}

export default ProjectPage;