import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  host: 'https://api.github.com',
  namespace: '',
  headers: {
    'Accept': 'application/vnd.github.full+json'
  }
});
