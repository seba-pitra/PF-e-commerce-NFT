import { Link } from "react-router-dom";
import "./NFTCard.css";
import { useSelector } from "react-redux";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import "./NFTCard.css";

export default function NFTCard(props) {
  const ethPrice = useSelector((state) => state.ethPrice);

  const dispatch = useDispatch();

  const handleClickOnShoppingCart = (e) => {
    dispatch(actions.addNftOnShoppingCart(props));
  };

  return (
    <div className="cardContainer">
      <div className="nftCard-image-info">
        <Link className="link" to={`/details/${props.id}`}>
          <div className="nftCard-img-container">
            <img
              className={"nftImage"}
              src={`${
                props.image === "no image found"
                  ? "https://preview.redd.it/j82jl2vpg4n71.jpg?auto=webp&s=e8431005571759e9fd9b5cd2e82dd27696d0b6c4"
                  : props.image
              }`}
              alt="nft-image"
            />
          </div>
          <div className={"bottom-img-info"}>
            <div className="nftCard-nameToken">
              <h3>{props.name}</h3>
            </div>
            <div>
              <h3>Price ETH: {props.price}</h3>{" "}
              <h4>
                Usd: ${(props.price * ethPrice.USD).toFixed(2)} - Ars: $
                {(props.price * ethPrice.ARS).toFixed(2)}
              </h4>
            </div>
          </div>
        </Link>
        <div className="CardButtons">
          <div className="nftCard-icon-container">
            <FavoriteIcon />
          </div>
          <div
            className="nftCard-icon-container"
            onClick={handleClickOnShoppingCart}
          >
            <ShoppingCartIcon />
          </div>
        </div>
      </div>
      <div className="CardButtons">
        <img src="" alt="add-to-favs" />
        <img src="" alt="shopping-cart" />
      </div>
    </div>
  );
}
