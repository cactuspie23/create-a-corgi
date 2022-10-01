import { Router } from "express"
const router = Router()
import * as corgisCtrl from '../controllers/corgis.js'
import { isLoggedIn } from "../middleware/middleware.js"

router.get('/', corgisCtrl.index)
router.get('/new', isLoggedIn, corgisCtrl.new)
router.get('/:id', corgisCtrl.show)
router.post('/', isLoggedIn, corgisCtrl.create)

export {
  router
}