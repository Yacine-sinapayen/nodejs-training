const express = require("express");
// Je créais mon router depuis mon package express
const router = express.Router();

/* ---------- ROUTES ----------  */
/* import du controller */
const stuffCtrl = require('../controllers/stuff');

/* ---------- POST ----------  */
router.post("/", stuffCtrl.createThing);

/* ---------- PUT ---------- */
router.put("/:id", stuffCtrl.modifyThing);

/* ---------- DELETE ---------- */
router.delete("/:id", stuffCtrl.deleteThing);

/* ---------- GET ONE ---------- */
router.get("/:id", stuffCtrl.getOneThing);

/* ---------- GET ALL ---------- */
router.get("/", stuffCtrl.getAllThings);



module.exports = router;
