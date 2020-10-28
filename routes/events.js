const express = require("express");
const router = express.Router();
const {isDate}= require('../helpers/isDate')
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/eventsController");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

//todas tienen que estar validadd
router.use(validarJWT);
//obtener eventos

router.get("/", getEventos);
router.post(
  "/",
  [
    check("title", "El Titulo es Obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es Obligatoria").custom(isDate),
    check("end", "Fecha de finalizacion es Obligatoria").custom(isDate), 
    validarCampos
    ],
  crearEvento
);
router.put("/:id",
[
  check("title", "El Titulo es Obligatorio").not().isEmpty(),
  check("start", "Fecha de inicio es Obligatoria").custom(isDate),
  check("end", "Fecha de finalizacion es Obligatoria").custom(isDate), 
  validarCampos
  ], actualizarEvento);
router.delete("/:id",[validarCampos], eliminarEvento);

module.exports = router;
