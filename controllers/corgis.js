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
    title: 'Create A Corgi'
  })
}

function create(req, res) {
  req.body.owner = req.user.profile._id
  Corgi.create(req.body)
  .then(corgi => {
    res.redirect(`/corgis/${corgi._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis/new')
  })
}

function show(req, res) {
  Corgi.findById(req.params.id)
  .populate('owner')
  .then(corgi => {
    res.render('corgis/show', {
      title: 'Corgi Details',
      corgi,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis')
  })
}

export {
  index,
  newCorgi as new,
  create,
  show,
}