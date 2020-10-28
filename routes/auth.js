const {Router}=require('express')
const router =Router()
const {createUser,loginUser,revalidarToken}=require('../controllers/authControllers')
const {check}=require('express-validator')
const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT}=require('../middlewares/validar-jwt')
router.post('/new',
[
    check('name',"El nombre es obligatorio").not().isEmpty(),
    check('email',"El email es obligatorio").isEmail(),
    check('password',"El password debe ser 6 caracteres o mas").isLength({min:6}),
    validarCampos
],
createUser)
router.post('/',
[
    check('email',"El email es obligatorio").isEmail(),
    check('password',"El password debe ser 6 caracteres o mas").isLength({min:6}),
    validarCampos
],
loginUser)

router.get('/renew',validarJWT,revalidarToken)

module.exports= router