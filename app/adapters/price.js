import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  host: 'http://www.quandl.com',
  namespace: 'v1/datasets/WIKI',
  buildURL(modelName, id, snapshot, requestType, query){
    return `https://www.quandl.com/api/v1/datasets/WIKI/${query.company}.json?column=4&sort_order=asc&collapse=quarterly&trim_start=2012-01-01&trim_end=2013-12-31`;
  },
  pathForType(type) {
    return Ember.String.underscore(type);
  },
  findAll(store, type, sinceToken){
    let url = type;
    let query = { since: sinceToken };
    return new Ember.RSVP.Promise(function(resolve, reject) {
      Ember.$.getJSON(url, query).then(function(data) {
        Ember.run(null, resolve, data);
      }, function(jqXHR) {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  },

  query(store, type, query) {
    let url = type;
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.getJSON(url, query).then(data => {
        Ember.run(null, resolve, data);
      }, (jqXHR) => {
        jqXHR.then = null; // tame jQuery's ill mannered promises
        Ember.run(null, reject, jqXHR);
      });
    });
  }
});
