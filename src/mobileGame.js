// import "regenerator-runtime/runtime";
const { ethers } = require('ethers');
// import { parseUnits, hexlify } from "ethers/lib/utils";

let provider;
let signer;

document.addEventListener("DOMContentLoaded", loadApp());

async function loadApp()
{
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    signer = provider.getSigner();
    if (!signer) window.location.reload();
    await provider.send("eth_requestAccounts", []);
    processAction();
}

function processAction()
{
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get("action");
    const message = urlParams.get("message");
    const chainId = urlParams.get("chainId") || 1;
    const to = urlParams.get("to");
    const value = urlParams.get("value");
    const data = urlParams.get("data") || "";
    const gasLimit = urlParams.get("gasLimit") || undefined;
    const gasPrice = urlParams.get("gasPrice") || undefined;

    if (action === "sign" && message)
    {
        return signMessage(message);
    }

    // if (action === "send" && to && value)
    // {
    //     return sendTransaction(chainId, to, value, gasLimit, gasPrice, data);
    // }

    console.log("Invalid URL");
}

// async function sendTransaction(chainId, to, value, gasLimit, gasPrice, data)
// {
//     try
//     {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         const network = await provider.getNetwork();
//         if (network.chainId !== chainId)
//         {
//             await window.ethereum.request({
//                 method: "wallet_switchEthereumChain",
//                 params: [{ chainId: `0x${parseInt(chainId, 10).toString(16)}` }], // chainId must be in hexadecimal numbers
//             });
//         }
//         const from = await signer.getAddress();
//         const tx = await signer.sendTransaction({
//             from,
//             to,
//             value: parseUnits(value, "wei"),
//             gasLimit: gasLimit ? hexlify(Number(gasLimit)) : gasLimit,
//             gasPrice: gasPrice ? hexlify(Number(gasPrice)) : gasPrice,
//             data: data ? data : "0x",
//         });
//         console.log({ tx });
//         displayResponse("Transaction sent.<br><br>Copy to clipboard then continue to App", tx.hash);
//     } catch (error)
//     {
//         copyToClipboard("error");
//         displayResponse("Transaction Denied");
//     }
// }

async function signMessage(message)
{
    try
    {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const signature = await signer.signMessage(message);
        console.log({ signature });
        window.location.replace("unitydl://pepoparadise?"+signature);
    }
    catch (error)
    {
        console.log("Signature Denied");
    }
}
