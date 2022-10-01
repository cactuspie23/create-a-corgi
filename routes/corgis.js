import { Router } from "express"
const router = Router()
import * as corgisCtrl from '../controllers/corgis.js'

router.get('/', corgisCtrl.index)
router.get('/new', corgisCtrl.new)

export {
  router
}