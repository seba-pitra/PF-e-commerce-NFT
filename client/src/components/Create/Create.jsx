import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as utils from "../../utils";
import * as actions from "../../redux/actions";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

import "./Create.css";
import "../NFTCard/NFTCard.css";
import CreateCollection from "./CreateCollection/CreateCollection";
import CreateNFT from "./CreateNFT/CreateNFT";
import CategoriesSelector from "./CategoriesSelector/CategoriesSelector";

export default function Create() {
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();
  const [step, setStep] = useState(1);

  const [errors, setErrors] = useState({
    name: "Name is required",
    price: "Price is required",
  });

  const [createdCollection, setCreatedCollection] = useState({
    userId: user.id,
    name: undefined,
    image: undefined,
  });

  const [createdNft, setCreatedNft] = useState({
    userId: user.id,
    collectionId: undefined,
    name: undefined,
    description: undefined,
    image: undefined,
    price: 0,
    categories: ["", "", "", "", "", "", ""],
  });

  // console.log(createdNft)
  // console.log(createdCollection)
  // console.log(errors)

  // -- STEP --
  const next = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };
  const back = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  // SUBMIT NFT
  const handleSubmit = (e) => {
    e.preventDefault();
    let createdNftObj = {
      ...createdNft,
      price: Number(createdNft.price),
      userId: user.id,
    };
    dispatch(actions.createNft(createdNftObj));
  };

  return (
    <>
      <div className="mainContainer">
        <fieldset
          className={`info-fieldset ${
            step !== 1 ? "noneDisplay" : "first-field-collections"
          }`}
        >
          <CreateCollection
            createdNft={createdNft}
            image_prop={"image"}
            setCreatedNft={setCreatedNft}
            createdCollection={createdCollection}
            setCreatedCollection={setCreatedCollection}
            back={back}
            next={next}
          />
        </fieldset>

        <fieldset
          className={`info-fieldset ${step !== 2 ? "noneDisplay" : ""}`}
        >
          <CreateNFT
            createdNft={createdNft}
            setCreatedNft={setCreatedNft}
            back={back}
            next={next}
            errors={errors}
            setErrors={setErrors}
          />
        </fieldset>

        <fieldset
          className={`info-fieldset ${
            step !== 3 ? "noneDisplay" : "first-field-collections"
          }`}
        >
          <CategoriesSelector
            createdNft={createdNft}
            setCreatedNft={setCreatedNft}
          />

          <div className="ilustration-validations">
            <input
              className={
                createdNft.categories.includes("") ? "errorSubmit" : "submit"
              }
              type="submit"
              value={"Create NFT"}
              disabled={createdNft.categories.includes("")}
              onClick={(e) => handleSubmit(e)}
            />
          </div>

          <div className="buttons-next-prev">
            <button onClick={back}> back</button>
          </div>
        </fieldset>
      </div>
    </>
  );
}
