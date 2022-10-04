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
  const options = ['Bone', 'Ball', 'Stick', 'Sunglasses']
  Corgi.findById(req.params.id)
  .populate('owner')
  .then(corgi => {
    const accessories = corgi.accessories.map(a => a.name)
    const filteredOptions = options.filter(o => !accessories.includes(o))
    res.render('corgis/show', {
      title: 'Corgi Details',
      corgi,
      options: filteredOptions,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis')
  })
}

function edit(req, res) {
  Corgi.findById(req.params.id)
  .then(corgi => {
    res.render('corgis/edit', {
      title: 'Edit Corgi',
      corgi,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis')
  })
}

function update(req, res) {
  Corgi.findByIdAndUpdate(req.params.id)
  .then(corgi => {
    if (corgi.owner.equals(req.user.profile._id)) {
      corgi.updateOne(req.body)
      .then(() => {
        res.redirect(`/corgis/${corgi._id}`)
      })
    } else {
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis')
  })
}

function deleteCorgi(req, res) {
  Corgi.findById(req.params.id)
  .then(corgi => {
    if (corgi.owner.equals(req.user.profile._id)) {
      corgi.delete()
      .then(() => {
        res.redirect('/corgis')
      })
    } else {
      throw new Error('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/corgis')
  })
}

function addAccessory(req, res) {
  Corgi.findById(req.params.id)
  .then(corgi => {
    corgi.accessories.push(req.body)
    corgi.save()
    .then(() => {
      res.redirect(`/corgis/${req.params.id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect(`/corgis/${req.params.id}`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect(`/corgis/${req.params.id}`)
  })
}

export {
  index,
  newCorgi as new,
  create,
  show,
  edit,
  update,
  deleteCorgi as delete,
  addAccessory,
}