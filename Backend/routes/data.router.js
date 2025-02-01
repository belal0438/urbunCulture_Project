const express = require("express");
const CrudOPrControllers = require("../controllers/crudOpr.controller");
const Auth = require("../middleware/auth");
const router = express.Router();

router.post("/data", Auth.Authenticate, CrudOPrControllers.UserData);
router.put("/data/:dataID", Auth.Authenticate, CrudOPrControllers.updateData);
router.delete(
  "/data/:dataID",
  Auth.Authenticate,
  CrudOPrControllers.deleteData
);
router.get("/data", Auth.Authenticate, CrudOPrControllers.getAllData);

module.exports = router;
