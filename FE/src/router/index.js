import SMERouter from 'sme-router'
const router = new SMERouter('router-view','hash')

import HomeController from '../controllers/Home'
import PositionController from '../controllers/Position'
import UserController from '../controllers/User'

import activeNavUtil from '../utils/activeNav'

/**
 * 高量中间件
 */
router.use(activeNavUtil)

router.route('/',HomeController.render)
router.route('/position',PositionController.render)

router.redirect('/')


UserController.renderLogin()
UserController.renderReg()