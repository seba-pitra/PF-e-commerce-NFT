import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./ShoppingCart.module.css";
import { ethers } from "ethers";
// import { startPayment } from "../Details/Details";

export const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No cripto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts"); //connect with metamask wallet

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    ethers.utils.getAddress(addr); //address validation

    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether), //can not pay with ethereum directly.We need to pass the ethereum to "wei"
    });

    setTxs(tx.hash);
    return tx;
  } catch (err) {
    setError(err.message);
    return err.message;
  }
};

export default function Shoppingkart() {
  const userNfts = useSelector((state) => state.userNfts);
  const activeUserIs = useSelector((state) => state.activeUser);

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const dispatch = useDispatch();

  const handleBuyNftsOnShoppingCart = async () => {
    dispatch(actions.buyNftOnShoppingCart(userNfts));
  };

  const handlePay = async ({ nftPrice, nftContract,nftObj }) => {
    setError();

    const transactionMetamask = await startPayment({
      setError,
      setTxs,
      ether: nftPrice.toString(),
      addr: nftContract,
    });

    let metamaskBuyData = {
      price: nftPrice + " ETH",
      contract: nftContract,
      payMethod: "Metamask",
      statusPay: "Created",
      //se envia todo el obj entero
      purchases : nftObj
    };

    if (transactionMetamask.hash) {
      //si salio bien...
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Successed",
      };
    } else if (transactionMetamask.includes("rejected")) {
      //si se rechazo en metamask
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      //si faltan fondos
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Pending",
      };
    }

    dispatch(actions.addBuyAtHistoryBuys(metamaskBuyData));
  };

  const handleRemoveButton = async (nftId) => {
    dispatch(actions.removeNftOfShoppingCart(nftId));
  };

  let totalAmount = 0;
  for (const nft of userNfts) {
    totalAmount += nft.price;
  }

  let mercadoPagoBuyData = {
    price: totalAmount,
    payMethod: "MercadoPago",
    statusPay: "Created",
  };

  const validate =
    window.location.href.includes("collection_status") &&
    window.location.href.includes("external_reference");

  if (validate) {
    if (window.location.href.includes("approved")) {
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Successed",
      };
    } else if (window.location.href.includes("rejected")) {
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Rejected",
      };
    } else if (window.location.href.includes("null")) {
      mercadoPagoBuyData = {
        ...mercadoPagoBuyData,
        statusPay: "Pending",
      };
    }

    dispatch(actions.addBuyAtHistoryBuys(mercadoPagoBuyData));
  }

  return (
    <div className={styles["shopping-cart"]}>
      <div className={styles["shopping-cart-nft-cards"]}>
        {userNfts &&
          userNfts.map((nft) => {
            return (
              <div className={styles["cart-nfts-container"]}>
                <img
                  src={nft.image}
                  alt="nft-cart"
                  className={styles["cart-nft-img"]}
                />
                <div>
                  <p>Price</p>
                  <p className={styles["cart-nft-price"]}>
                    ${(nft.price * 1271).toFixed(2)} USD
                  </p>
                  <button
                    className={styles["button-buy-fast"]}
                    onClick={() =>
                      handlePay({
                        nftPrice: nft.price,
                        nftContract: nft.contract,
                        purchases : nft
                      })
                    }
                  >
                    Buy fast
                  </button>
                </div>
                <button
                  className={styles["cart-nft-remove-button"]}
                  onClick={() => handleRemoveButton(nft.id)}
                >
                  X
                </button>
              </div>
            );
          })}
        {error && <p>{error}</p>}
        {txs && <p>{txs}</p>}
      </div>
      <div className="text-center text-lg-bottom mt-4 pt-2">
        <h3>Total</h3>
        <h3>${(totalAmount * 1271).toFixed(2)} USD</h3>
        <h4>Clear cart</h4>
      </div>
      <div className="text-center text-lg-bottom mt-4 pt-2">
        <Button
          onClick={(e) => {
            handleBuyNftsOnShoppingCart();
          }}
        >
          checkout
        </Button>
      </div>
    </div>
  );
}
