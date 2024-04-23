const express = require ('express')
const router = express.Router()
const Peliculas = require('../models/Peliculas.js')
const PeliculasController= require('../controllers/PeliculasController.js')


router.post('/create', PeliculasController.create);
router.get('/peliculas',PeliculasController.getAll);
router.get('/peliculas/all',PeliculasController.getAllSSR);
router.get('/id/:_id', PeliculasController.getByID)
router.delete('/:id', PeliculasController.deletePelicula);
router.put('/peliculas/:name', PeliculasController.updateByName);
router.get('/peliculas/new', PeliculasController.showCreateForm);
router.post('/peliculas/new', PeliculasController.createPelicula);
router.get('/:id', PeliculasController.getPeliculaDetails);








module.exports = router;