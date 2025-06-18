const { Router } = require("express");
const { getlogin, getRoles, createUser } = require("../controllers/users/userControllers")

const router = Router();

router.post("/login", getlogin);
router.get("/allRoles", getRoles);
router.post("/createUser", createUser);


module.exports = router;