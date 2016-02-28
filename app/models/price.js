import DS from 'ember-data';

export default DS.Model.extend({
  dates: DS.hasMany('date'),
  opens: DS.hasMany('number'),
  highs: DS.hasMany('number'),
  lows: DS.hasMany('number'),
  closes: DS.hasMany('number'),
  volumes: DS.hasMany('number'),
  ex_dividends: DS.hasMany('number'),
  split_ratios: DS.hasMany('number'),
  adj_opens: DS.hasMany('number'),
  adj_highs: DS.hasMany('number'),
  adj_lows: DS.hasMany('number'),
  adj_closes: DS.hasMany('number'),
  adj_volumes: DS.hasMany('number')
});