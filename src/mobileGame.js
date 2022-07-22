// import "regenerator-runtime/runtime";
const { ethers } = require('ethers');
// import { parseUnits, hexlify } from "ethers/lib/utils";

let provider;
let signer;

document.addEventListener("DOMContentLoaded", loadApp());

async function loadApp()
{
    // provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // signer = provider.getSigner();
    // if (!signer) window.location.reload();
    // await provider.send("eth_requestAccounts", []);
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
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        const signature = "asdfg"; //await signer.signMessage(message);
        console.log({ signature });

        const os = getMobileOperatingSystem();
        if (os == "Android")
        {
            window.location.replace("pepodl://sign?" + signature);
        }
        else if (os == "iOS")
        {
            window.location.replace(window.location.origin + "/pepodl/" + signature);
        }
        else
        {
            console.log(os + " platform not supported");
        }
    }
    catch (error)
    {
        console.log(error);
        console.log("Signature Denied");
    }
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem()
{
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent))
    {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent))
    {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
    {
        return "iOS";
    }

    return "unknown";
}
