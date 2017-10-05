var keystone = require('keystone');

var Planet = keystone.list('Planet');

/**
 * List Planets
 */
exports.list = function(req, res) {
  Planet.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
      planets: items
    });

  });
}

/**
 * Get Planet by ID
 */
exports.get = function(req, res) {
  Planet.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
      planet: item
    });

  });
}


/**
 * Create a Planet
 */
exports.create = function(req, res) {

  var item = new Planet.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.json({ error: err });

    res.json({
      planet: item
    });

  });
}

/**
 * Patch Planet by ID
 */
exports.update = function(req, res) {
  Planet.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        planet: item
      });

    });

  });
}

/**
 * Delete Planet by ID
 */
exports.remove = function(req, res) {
  Planet.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.json({ dberror: err });
    if (!item) return res.json('not found');

    item.remove(function (err) {
      if (err) return res.json({ dberror: err });

      return res.json({
        success: true
      });
    });

  });
}