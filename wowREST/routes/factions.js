var express = require('express');
var router = express.Router();
var WoW = require('../controllers/wow')

/* GET home page. */
router.get('/', async function(req, res, next) {
  var dados = await WoW.listFactions()
  res.jsonp(dados)
});

router.get('/:f', async function(req, res, next) {
  var dados = await WoW.getFaction(req.params.f)
  res.jsonp(dados)
})

router.get('/:f/races/', async function(req, res, next) {
  var dados = await WoW.racesPerFaction(req.params.f)
  res.jsonp(dados)
})

module.exports = router;
