const router = require("express").Router();

const validateJwtToken = require("../middlewares/validateTokenHandler");
const errorHandler = require("../middlewares/errorHandler");

router.use(errorHandler);

const {
  currentUser,
  loginUser,
  registerUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/current", validateJwtToken, currentUser);

module.exports = router;
