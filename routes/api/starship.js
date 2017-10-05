var keystone = require('keystone');

var Starship = keystone.list('Starship');

/**
 * List Starships
 */
exports.list = function(req, res) {
  Starship.model.find(function(err, items) {

    if (err) return res.json({ err: err });

    res.json({
      starships: items
    });

  });
}

/**
 * Get Starship by ID
 */
exports.get = function(req, res) {
  Starship.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json('not found');

    res.json({
      starship: item
    });

  });
}


/**
 * Create a Starship
 */
exports.create = function(req, res) {

  var item = new Starship.model(),
    data = (req.method == 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, function(err) {

    if (err) return res.json({ error: err });

    res.json({
      starship: item
    });

  });
}

/**
 * Patch Starship by ID
 */
exports.update = function(req, res) {
  Starship.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.json({ err: err });
    if (!item) return res.json({ err: 'not found' });

    var data = (req.method == 'PUT') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, function(err) {

      if (err) return res.json({ err: err });

      res.json({
        starship: item
      });

    });

  });
}

/**
 * Delete Starship by ID
 */
exports.remove = function(req, res) {
  Starship.model.findById(req.params.id).exec(function (err, item) {

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