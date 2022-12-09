const { Router } = require("express");
const {
  getUserById,
  deleteUser,
  createUser,
} = require("../controllers/user.controller");

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const foundUser = await createUser(req.body);
    res.status(200).send(foundUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const foundUser = await getUserById(id);
    res.status(200).send(foundUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserName = await deleteUser(id);
    res.status(200).send(`${deletedUserName} was deleted successfully`);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = userRouter;
