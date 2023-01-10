import * as actions from "../../../redux/actions";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import "./Filtering.css";
import PriceSelector from "../PriceSelector/PriceSelector";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Offcanvas from "react-bootstrap/Offcanvas";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import styles from "./stylesheets/Filtering.module.css";

export default function Filtering() {
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedCategorySpecies, setSelectedCategorySpecies] = useState([]);
  const [selectedCategorySpecies2, setSelectedCategorySpecies2] = useState([]);
  const [selectedCategoryArt, setSelectedCategoryArt] = useState([]);
  const [selectedCategoryType, setSelectedCategoryType] = useState([]);
  const [selectedCategoryStyle, setSelectedCategoryStyle] = useState([]);
  const [selectedCategoryRest, setSelectedCategoryRest] = useState([]);
  const [selectedCategoryBackg, setSelectedCategoryBackg] = useState([]);

  const [showFilters, setShowFilters] = useState(false);

  const handleClose = () => setShowFilters(false);
  const handleShow = () => {
    setShowFilters(true);
  };

  const dispatch = useDispatch();

  const nfts = useSelector((state) => state.nfts);
  const collections = useSelector((state) => state.collections);

  useEffect(() => {
    dispatch(actions.setCollections(selectedCollection));
    dispatch(actions.setCategorySpecies(selectedCategorySpecies));
    dispatch(actions.setCategorySpecies2(selectedCategorySpecies2));
    dispatch(actions.setCategoryArt(selectedCategoryArt));
    dispatch(actions.setCategoryType(selectedCategoryType));
    dispatch(actions.setCategoryStyle(selectedCategoryStyle));
    dispatch(actions.setCategoryRest(selectedCategoryRest));
    dispatch(actions.setCategoryBackg(selectedCategoryBackg));
    dispatch(actions.filterNfts());
  }, [
    selectedCategorySpecies,
    selectedCategorySpecies2,
    selectedCategoryArt,
    selectedCategoryType,
    selectedCategoryStyle,
    selectedCategoryRest,
    selectedCategoryBackg,
    selectedCollection,
  ]);

  let category = {
    Species: [],
    Species2: [],
    Art: [],
    Type: [],
    Style: [],
    Rest: [],
    Backg: [],
  };

  nfts.forEach((n) => {
    category.Species.push(n.category[0]);
    category.Species2.push(n.category[1]);
    category.Art.push(n.category[2]);
    category.Type.push(n.category[3]);
    category.Style.push(n.category[4]);
    category.Rest.push(n.category[5]);
    category.Backg.push(n.category[6]);
  });

  category.Species = Array.from(new Set(category.Species));
  category.Species2 = Array.from(new Set(category.Species2));
  category.Art = Array.from(new Set(category.Art));
  category.Type = Array.from(new Set(category.Type));
  category.Style = Array.from(new Set(category.Style));
  category.Rest = Array.from(new Set(category.Rest));
  category.Backg = Array.from(new Set(category.Backg));

  const selectCollection = (e) => {
    if (selectedCollection.includes(e.target.value)) {
      let filtered = selectedCollection.filter((a) => a !== e.target.value);
      setSelectedCollection(filtered);
    } else setSelectedCollection([...selectedCollection, e.target.value]);
  };

  const selectCategorySpecies = (e) => {
    if (selectedCategorySpecies.includes(e.target.value)) {
      let filtered = selectedCategorySpecies.filter(
        (a) => a !== e.target.value
      );
      setSelectedCategorySpecies(filtered);
    } else
      setSelectedCategorySpecies([...selectedCategorySpecies, e.target.value]);
  };

  const selectCategorySpecies2 = (e) => {
    if (selectedCategorySpecies2.includes(e.target.value)) {
      let filtered = selectedCategorySpecies2.filter(
        (a) => a !== e.target.value
      );
      setSelectedCategorySpecies2(filtered);
    } else
      setSelectedCategorySpecies2([
        ...selectedCategorySpecies2,
        e.target.value,
      ]);
  };

  const selectCategoryArt = (e) => {
    if (selectedCategoryArt.includes(e.target.value)) {
      let filtered = selectedCategoryArt.filter((a) => a !== e.target.value);
      setSelectedCategoryArt(filtered);
    } else setSelectedCategoryArt([...selectedCategoryArt, e.target.value]);
  };

  const selectCategoryType = (e) => {
    if (selectedCategoryType.includes(e.target.value)) {
      let filtered = selectedCategoryType.filter((a) => a !== e.target.value);
      setSelectedCategoryType(filtered);
    } else setSelectedCategoryType([...selectedCategoryType, e.target.value]);
  };

  const selectCategoryStyle = (e) => {
    if (selectedCategoryStyle.includes(e.target.value)) {
      let filtered = selectedCategoryStyle.filter((a) => a !== e.target.value);
      setSelectedCategoryStyle(filtered);
    } else setSelectedCategoryStyle([...selectedCategoryStyle, e.target.value]);
  };

  const selectCategoryRest = (e) => {
    if (selectedCategoryRest.includes(e.target.value)) {
      let filtered = selectedCategoryRest.filter((a) => a !== e.target.value);
      setSelectedCategoryRest(filtered);
    } else setSelectedCategoryRest([...selectedCategoryRest, e.target.value]);
  };

  const selectCategoryBackg = (e) => {
    if (selectedCategoryBackg.includes(e.target.value)) {
      let filtered = selectedCategoryBackg.filter((a) => a !== e.target.value);
      setSelectedCategoryBackg(filtered);
    } else setSelectedCategoryBackg([...selectedCategoryBackg, e.target.value]);
  };

  // className={styles[]}

  return (
    <div className={styles["filters-container"]}>
      <FilterAltIcon
        className={styles["filter-icon"]}
        fontSize="large"
        onClick={handleShow}
      />
      <Offcanvas
        show={showFilters}
        onHide={handleClose}
        placement={"start"}
        className={styles["offcanvas-container"]}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body className={styles["offcanvas-body"]}>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Collections
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {collections.map((collection, index) => {
                return (
                  <div
                    key={index}
                    className="input-checkbox"
                    >
                    <label htmlFor={collection.id}>{collection.name}</label>
                    <input
                      type="checkbox"
                      key={collection.id}
                      value={collection.id}
                      onClick={(e) => {
                        selectCollection(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select gender
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Species?.map((specie, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      onClick={(e) => {
                        selectCategorySpecies(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Species
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Species2?.map((specie, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={specie}>{specie}</label>
                    
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      onClick={(e) => {
                        selectCategorySpecies2(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Art
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Art?.map((specie, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      onClick={(e) => {
                        selectCategoryArt(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Type
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Type?.map((specie, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={specie}>{specie}</label>
                    <input
                      type="checkbox"
                      key={specie}
                      value={specie}
                      onClick={(e) => {
                        selectCategoryType(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Style
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Style?.map((value, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      onClick={(e) => {
                        selectCategoryStyle(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Rest
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Rest?.map((value, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      onClick={(e) => {
                        selectCategoryRest(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Select Background
              </label>
            </AccordionSummary>
            <AccordionDetails>
              {category.Backg?.map((value, index) => {
                return (
                  <div key={index} className="input-checkbox">
                    <label htmlFor={value}>{value}</label>
                    <input
                      type="checkbox"
                      key={value}
                      value={value}
                      onClick={(e) => {
                        selectCategoryBackg(e);
                      }}
                      className="option-btn btn-filter"
                    />
                  </div>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            style={{
              backgroundColor: "#424242",
              color: "white",
              cursor: "pointer",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <label className="label" htmlFor="genres">
                Price Selector
              </label>
            </AccordionSummary>
            <AccordionDetails>
              <PriceSelector />
            </AccordionDetails>
          </Accordion>
          <button
            className={styles["reset-filters"]}
            onClick={() => {
              dispatch(actions.resetFilters());
            }}
          >
            Reset Filters
          </button>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
