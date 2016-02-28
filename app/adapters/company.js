import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  host: 'https://www.quandl.com',
  namespace: 'api/v3/datasets/WIKI',
  buildURL(modelName, id, snapshot, requestType, query){
    return `${this.get('host')}/${this.get('namespace')}/${id}.json?auth_token=${this.get('auth_token')}`;
  }
});
