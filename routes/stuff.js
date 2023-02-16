const express = require("express");
// Je créais mon router depuis mon package express
const router = express.Router();

/* ---------- CONTROLLERS ----------  */
/* J'importe on controllers stuff=,js qui contient toute les logique de mes routes */
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
