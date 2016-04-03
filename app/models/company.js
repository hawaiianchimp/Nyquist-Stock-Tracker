import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  ticker: DS.attr('string'),
  prices: DS.attr()
});
