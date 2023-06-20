const router = require("express").Router();
const { verifyTokenAndAutherization } = require("../middleware/verifyToken");
const { register, login, updatecredentials } = require("../routes/User.route");

router.post("/register", register);
router.post("/login", login);
router.put("/update/:id", verifyTokenAndAutherization, updatecredentials);

module.exports = router;
