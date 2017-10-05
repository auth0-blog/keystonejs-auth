var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Starship Model
 * ==========
 */
var Starship = new keystone.List('Starship');

Starship.add({
  name: { type: String, required: true },
  model: { type: String, required: true, initial: false  },
  manufacturer: { type: String, required: true, initial: false  },
  crew: { type: Number, required: true, initial: false },
});


/**
 * Registration
 */
Starship.register();
