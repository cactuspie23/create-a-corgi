import { Corgi } from '../models/corgi.js'

function index(req, res) {
  Corgi.find({})
  .then(corgis => {
    res.render('corgis/index', {
      title: 'All Corgis',
      corgis,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

function newCorgi(req, res) {
  res.render('corgis/new', {
    title: 'Add Corgi'
  })
}

function create(req, res) {

}

export {
  index,
  newCorgi as new,
  create,
}