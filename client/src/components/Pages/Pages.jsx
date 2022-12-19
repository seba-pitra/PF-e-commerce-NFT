import { useSelector } from "react-redux";
import NFTCard from "../NFTCard/NFTCard";
import NotFoundResults from "../NotFoundResults/NotFoundResults";
import PageSelector from "../PageSelector/PageSelector";
import "./Pages.css";

function Pages() {
  const filteredNfts = useSelector((state) => state.filteredNfts);
  console.log(filteredNfts);
  const activePage = useSelector((state) => state.activePage);
  const nftsPerPage = useSelector((state) => state.nftsPerPage);
  const lastNftInPage = activePage * nftsPerPage;
  const firstNftInPage = lastNftInPage - nftsPerPage;
  const nftsInPage = filteredNfts.slice(firstNftInPage, lastNftInPage);
  const cards = nftsInPage.map((nft) => {
    console.log(nft)
    return (
      <NFTCard
        key={nft.id}
        collectionId={nft.collectionId}
        contract={nft.contract}
        id={nft.id}
        image={nft.image}
        name={nft.name}
        price={nft.price}
        tokenId={nft.tokenId}
        userId={nft.userId}
      />
    );
  });

  console.log(cards);

  return (
    <div>
      {cards.length === 0 ? (
        <NotFoundResults />
      ) : (
        <>
          <PageSelector />
          <div className="pageSelector-Container">{cards}</div>
          <PageSelector />
        </>
      )}
    </div>
  );
}

export default Pages;
