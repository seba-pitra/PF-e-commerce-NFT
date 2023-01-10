import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../redux/actions";
import styles from "./ShoppingCart.module.css";
import { startPayment } from "../../utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shoppingkart() {
  const shoppingCartContents = useSelector((state) => state.shoppingCartContents);

  const [error, setError] = useState();
  const [txs, setTxs] = useState([]);

  const dispatch = useDispatch();

  const handleBuyNftsOnShoppingCart = async () => {
    //localStorage for payment for mercago pago in component "PayResult"
    localStorage.setItem("nftsOnShoppingCart", JSON.stringify(shoppingCartContents));
    dispatch(actions.buyNftOnShoppingCart(shoppingCartContents));
    console.log(shoppingCartContents)
    localStorage.setItem("compras", JSON.stringify(shoppingCartContents))
    // test only >> dispatch(actions.sendFungibleMail({correoUser: "yomero@gmail.com",accion: "pago"}));
  };

  const handlePay = async ({ nftPrice, nftContract, nftObj }) => {
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
      purchases: [nftObj],
      // from: transactionMetamask.from,
      // to: transactionMetamask.to,
    };

    if (transactionMetamask.hash) {
      //si salio bien...
      toast.success("Payment successfully", { position: "bottom-left" });
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Successful",
      };
    } else if (transactionMetamask.includes("rejected")) {
      //si se rechazo en metamask
      toast.error("Something was wrong. Try again later", {
        position: "bottom-left",
      });
      metamaskBuyData = {
        ...metamaskBuyData,
        statusPay: "Rejected",
      };
    } else if (transactionMetamask.includes("insufficient funds")) {
      //si faltan fondos
      toast.warning("You have insufficient funds in Metamask", {
        position: "bottom-left",
      });
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
  for (const nft of shoppingCartContents) {
    totalAmount += nft.price;
  }

  return (
    <div className={styles["shopping-cart"]}>
      <div className={styles["shopping-cart-nft-cards"]}>
        {shoppingCartContents &&
          shoppingCartContents.map((nft, index) => {
            return (
              <div 
                key={index}
                className={styles["cart-nfts-container"]}>
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
                        nftObj: nft,
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
