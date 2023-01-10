import * as actions from "../../redux/actions/index";
import { React, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import SearchBar from "../SearchBar/SearchBar";
import logo from "../../images/logo/logo.png";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Shoppingkart from "../Shoppingkart/Shoppingkart";
import Ufavorites from "../uFavorites/Ufavorites.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaterialUISwitch from "../Pages/switch";

import UserIcon from "./UserIcon/UserIcon";
import ProfilePicture from "../UserComponents/ProfilePicture/Profile.Picture";

// import styles from "./stylesheets/NFTNav.module.css";
import "./NFTNav.css";

export default function NFTNav() {
  const location = useLocation();

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [showFav, setShowFav] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  const cartItemsCount = useSelector((state) => state.shoppingCartContents);
  const userFavorites = useSelector((state) => state.userFavs);
  const loggedUser = useSelector((state) => state.loggedUser);
  const activeThemeIsDark = useSelector((state) => state.activeThemeIsDark);

  const areWeInLanding = location.pathname === "/";

  const handleClose = () => setShow(false);
  const handleShow = () =>  setShow(true);
  const handleCloseFav = () => setShowFav(false);
  const handleShowFav = () => setShowFav(true);

  const handleShowUserList = (e) => {
    e.preventDefault();
    setShowUserList(!showUserList);
  };


  const onSwitch = () => {
    dispatch(actions.toggleTheme());
// Theme LocalStorage Saver 
	  console.log(activeThemeIsDark); 
localStorage.setItem(JSON.stringify(loggedUser.email+'theme'),JSON.stringify(activeThemeIsDark));
  };

  return (
    <div className={areWeInLanding ? "hidden" : "nav-bar"}>
      <Navbar className="brand-colorized-background-color" expand="lg">
        <Container fluid>
          <img
            alt=""
            src={logo}
            width="60"
            height="60"
            className="d-inline-block align-top"
          />{" "}
          <Navbar.Brand>
            <Navbar.Text className="navbar-company-name-header brand-colorized-text">
              Non Fungible Town
            </Navbar.Text>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="brand-colorized-text" to="/home">
                Home
              </Link>
              <Link
                className={`brand-colorized-text ${
                  loggedUser
                    ? loggedUser.type === "Basic"
                      ? "noneDisplay"
                      : ""
                    : ""
                }`}
                to="/createNft"
              >
                Create
              </Link>
            </Nav>
            <SearchBar />
            <Nav>
              <Link className="brand-colorized-text" to="/marketplace">
                MarketPlace
              </Link>
              <Link to="/collections" className="brand-colorized-text">
                Collections
              </Link>
              <Link to="/developerTeam" className="brand-colorized-text">
                Developer Team
              </Link>

              <MaterialUISwitch className="switch-dark-ligth" onClick={onSwitch} />

              <div className="nav-bar-accountIcon">
               <ProfilePicture handleShowUserList={handleShowUserList}/>
              </div>

              {/* favorite */}

              <button className="control-icon" onClick={handleShowFav}>
                <FavoriteIcon />

                <span id="cart_Numer_Items" className="badge rounded-circle">
                  {userFavorites.length}
                </span>
              </button>

              {/* end favorite-*/}

              {/* slide kart trigger*/}
              <button className="control-icon" onClick={handleShow}>
                <ShoppingCartIcon />
                <span id="cart_Numer_Items" className="badge rounded-circle">
                  {cartItemsCount.length}
                </span>
              </button>
              {/* slide kart*/}
              <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>Your Shopping Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Shoppingkart />
                </Offcanvas.Body>
              </Offcanvas>

              {/* favorites comp */}
              <Offcanvas
                style={{
                  height: "200px",
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                show={showFav}
                onHide={handleCloseFav}
                placement={"bottom"}
                className="offcanvas-scrollbar"
              >
                <Offcanvas.Body>
                  <Ufavorites />
                </Offcanvas.Body>
              </Offcanvas>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <UserIcon setVisible={handleShowUserList} visible={showUserList} />
    </div>
  );
}
