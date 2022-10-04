import { Router } from "express"
const router = Router()
import * as corgisCtrl from '../controllers/corgis.js'
import { isLoggedIn } from "../middleware/middleware.js"

router.get('/', corgisCtrl.index)
router.get('/new', isLoggedIn, corgisCtrl.new)
router.get('/:id', corgisCtrl.show)
router.get('/:id/edit', isLoggedIn, corgisCtrl.edit)
router.post('/', isLoggedIn, corgisCtrl.create)
router.post('/:id/accessories', isLoggedIn, corgisCtrl.addAccessory)
router.put('/:id', isLoggedIn, corgisCtrl.update)
router.delete('/:id', isLoggedIn, corgisCtrl.delete)

export {
  router
}