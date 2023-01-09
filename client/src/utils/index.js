import { ethers } from "ethers";
import { toast } from "react-toastify";
import { injectLocalStorageCart } from "../redux/actions";

const NAME = "name";
const PRICE = "price";
const RARITY = "rarity";
const FAVS = "favs";
const STARS = "stars";
const LASTBUY = "lastbuy";
const CREATEDTS = "createdTs";

export function orderNFTBy(orderOption, orderDirection, nftsToSort) {
  switch (orderOption) {
    case NAME:
      return orderNFTByName(orderDirection, nftsToSort);
    case PRICE:
      return orderNFTByPrice(orderDirection, nftsToSort);
    case RARITY:
      return orderNFTByRarity(orderDirection, nftsToSort);
    case FAVS:
      return orderNFTByFavs(orderDirection, nftsToSort);
    case STARS:
      return orderNFTByStars(orderDirection, nftsToSort);
    case LASTBUY:
      return orderNFTByLastBuy(orderDirection, nftsToSort);
    case CREATEDTS:
      return orderNFTByCreatedTs(orderDirection, nftsToSort);
    default:
      return nftsToSort;
  }
}

export function orderNFTByName(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.name > nftB.name) {
        return 1;
      }
      if (nftB.name > nftA.name) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.name > nftB.name) {
        return -1;
      }
      if (nftB.name > nftA.name) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByPrice(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.price > nftB.price) {
        return 1;
      }
      if (nftB.price > nftA.price) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.price > nftB.price) {
        return -1;
      }
      if (nftB.price > nftA.price) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByRarity(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarity > nftB.rarity) {
        return 1;
      }
      if (nftB.rarity > nftA.rarity) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rarity > nftB.rarity) {
        return -1;
      }
      if (nftB.rarity > nftA.rarity) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByFavs(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.favs > nftB.favs) {
        return 1;
      }
      if (nftB.favs > nftA.favs) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.favs > nftB.favs) {
        return -1;
      }
      if (nftB.favs > nftA.favs) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByLastBuy(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyValue > nftB.lastBuyValue) {
        return 1;
      }
      if (nftB.lastBuyValue > nftA.lastBuyValue) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.lastBuyValue > nftB.lastBuyValue) {
        return -1;
      }
      if (nftB.lastBuyValue > nftA.lastBuyValue) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByCreatedTs(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdTs > nftB.createdTs) {
        return 1;
      }
      if (nftB.createdTs > nftA.createdTs) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdTs > nftB.createdTs) {
        return -1;
      }
      if (nftB.createdTs > nftA.createdTs) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByStars(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.stars > nftB.stars) {
        return 1;
      }
      if (nftB.stars > nftA.stars) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.stars > nftB.stars) {
        return -1;
      }
      if (nftB.stars > nftA.stars) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByCreation(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdAt > nftB.createdAt) {
        return 1;
      }
      if (nftB.createdAt > nftA.createdAt) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.createdAt > nftB.createdAt) {
        return -1;
      }
      if (nftB.createdAt > nftA.createdAt) {
        return 1;
      }
      return 0;
    });
  }
}

export function orderNFTByRating(order, nfts) {
  if (order === "up-down") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rating > nftB.rating) {
        return 1;
      }
      if (nftB.rating > nftA.rating) {
        return -1;
      }
      return 0;
    });
  } else if (order === "down-up") {
    return nfts.sort((nftA, nftB) => {
      if (nftA.rating > nftB.rating) {
        return -1;
      }
      if (nftB.rating > nftA.rating) {
        return 1;
      }
      return 0;
    });
  }
}

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

export function validate(input) {
  let errors = {
    name: "Name is required",
    price: "Pice is required",
  };

  if (!/([A-Z])/.test(input.name))
    errors = { ...errors, name: "Name can not contain special characters" };
  else errors = { ...errors, name: "Name is correct" };

  if (input.price <= 0)
    errors = { ...errors, price: "Price can not be 0 or less" };
  else errors = { ...errors, price: "Price is correct" };

  return errors;
}

export function validateUserData(errors, data) {
  errors.name = validateUserName(data.name);
  errors.last_name = validateUserLastName(data.last_name);
  errors.age = validateUserAge(data.age);
  errors.dni = validateUserDni(data.dni);
  errors.phone_number = validateUserPhone(data.phone_number);
  errors.nationality = validateUserNationality(data.nationality);
  errors.address = validateUserAddress(data.address);
  errors.face_picture = validateUserFace_picture(data.face_picture);
  errors.dni_image_front = validateUserDni_image_front(data.dni_image_front);
  errors.dni_image_back = validateUserDni_image_back(data.dni_image_back);
  return errors;
}

function validateUserName(property) {
  if (!property) return "This field must be filled";
  if (property.length < 4) return "The name is too short";
  else return "False";
}

function validateUserLastName(property) {
  if (!property) return "This field must be filled";
  if (property.length < 4) return "The last name is too short";
  else return "False";
}

function validateUserAge(property) {
  if (!property) return "This field must be filled";
  if (Number(property) < 18) return "You must be of legal age";
  if (Number(property) > 100) return "Add your real age";
  else return "False";
}

function validateUserDni(property) {
  if (!property) return "This field must be filled";
  if (!/^\d{8}$/.test(property)) return "The DNI must to have 8 digits";
  if (Number(property) < 10000000 || Number(property) > 50000000)
    return "Add a real DNI";
  else return "False";
}

function validateUserPhone(property) {
  if (!property) return "This field must be filled";
  if (!/^\d{8,12}$/.test(property)) return "Add a real phone number";
  else return "False";
}

function validateUserNationality(property) {
  if (!property) return "This field must be filled";
  if (property.length < 4) return "Add your real nationality";
  else return "False";
}

function validateUserAddress(property) {
  if (!property) return "This field must be filled";
  if (property.length < 4) return "Add your real address";
  else return "False";
}

function validateUserFace_picture(property) {
  if (!property) return "You must to add a picture";
  if (
    !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\.(?:jpe?g|gif|png)$/.test(
      property
    )
  )
    return "Add a real image";
  else return "False";
}

function validateUserDni_image_front(property) {
  if (!property) return "You must to add a picture";
  if (
    !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\.(?:jpe?g|gif|png)$/.test(
      property
    )
  )
    return "Add a real image";
  else return "False";
}

function validateUserDni_image_back(property) {
  if (!property) return "You must to add a picture";
  if (
    !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?\.(?:jpe?g|gif|png)$/.test(
      property
    )
  )
    return "Add a real image";
  else return "False";
}

export function handleErrorLoginAndRegister(error) {
  switch (error.code) {
    case "auth/email-already-in-use":
      toast.error("Email alredy in use", { position: "bottom-left" });
      break;

    case "auth/invalid-email":
      toast.error("Invalid email", { position: "bottom-left" });
      break;

    case "auth/operation-not-allowed":
      toast.error("Operation not allowed", { position: "bottom-left" });
      break;

    case "auth/weak-password":
      toast.error("Weak password", { position: "bottom-left" });
      break;

    case "auth/wrong-password":
      toast.error("Wrong password", { position: "bottom-left" });
      break;

    case "Password do not match":
      toast.error("Password do not match", { position: "bottom-left" });
      break;

    case "auth/user-not-found":
      toast.error("User not found", { position: "bottom-left" });
      break;

    case "Email not verified":
      toast.error("Email not verified", { position: "bottom-left" });
      break;

    default:
      console.error(error);
      break;
  }
}

export function saveLocalStorage(shoppingCartContents) {
  localStorage.setItem("nftsOnShoppingCart", JSON.stringify(shoppingCartContents));
}

export function loadLocalStorage(dispatch) {
  const localCart = JSON.parse(localStorage.getItem("nftsOnShoppingCart"));

  if (localCart) dispatch(injectLocalStorageCart(localCart));
}
