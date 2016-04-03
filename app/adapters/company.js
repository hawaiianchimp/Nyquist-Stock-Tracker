import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  host: 'https://www.quandl.com',
  namespace: 'api/v3/datasets/WIKI',
  buildURL(modelName, id, snapshot, requestType, query){
    return `${this.get('host')}/${this.get('namespace')}/${id}.json`;
  },
  findRecord(store, type, id, snapshot) {
    // Do your thing here
    return this.ajax(this.buildURL(type.typeKey, id), 'GET');
  },

  findAll(store, type, sinceToken, snapshotRecordArray) {
    // Do your thing here
    var query;

    if (sinceToken) {
      query = { since: sinceToken };
    }

    return this.ajax(this.buildURL(type.typeKey), 'GET', { data: query });
  },

  query(store, type, query, recordArray) {
    // Do your thing here
    return this.ajax(this.buildURL(type.typeKey), 'GET', { data: query });
  }
});