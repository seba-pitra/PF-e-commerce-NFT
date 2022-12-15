const { Router } = require("express");
const nftRouter = require("./nftRouter.js");
const collection = require("./collection.router");
const firebaseRouter = require("./login.js");
const paymentRouter = require("./paymentRouter");
const router = Router();

router.use("/nft", nftRouter);
router.use("/login", firebaseRouter);
router.use("/collection", collection);
router.use("/payment", paymentRouter);

module.exports = router;
