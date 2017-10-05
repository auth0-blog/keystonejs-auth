var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Planet Model
 * ==========
 */
var Planet = new keystone.List('Planet');

Planet.add({
  name: { type: Types.Name, required: true },
  diameter: { type: Types.Number, required: true, initial: false  },
  population: { type: Types.Number, required: true, initial: false },
  rotation_period: { type: Types.Number, required: true, initial: false  },
});


/**
 * Registration
 */
Planet.register();
