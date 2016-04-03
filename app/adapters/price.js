import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query){
    return `${this.get('host')}/${this.get('namespace')}/${id}.json?auth_token=${this.get('auth_token')}`;
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
