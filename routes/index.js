const router = require('express').Router();
const Controller = require("../controllers");

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.get("/availability/:username", Controller.getAvailability);
router.post("/generate-midtrans-token", Controller.generateMidtransToken);


module.exports = router;