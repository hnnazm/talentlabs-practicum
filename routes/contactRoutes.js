const router = require('express').Router();

const validateJwtToken = require('../middlewares/validateTokenHandler');
const errorHandler = require("../middlewares/errorHandler");
const {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

router.use(validateJwtToken);
router.use(errorHandler);

router.route("/")
  .get(getContacts)
  .post(createContact);

router.route("/:id")
  .get(getContact)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
