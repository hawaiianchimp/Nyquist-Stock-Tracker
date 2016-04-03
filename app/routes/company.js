import Ember from 'ember';

export default Ember.Route.extend({
  options: {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' }
  },
  model(){
    return this.get('store').findRecord('company', 'lnkd');
  }
});
