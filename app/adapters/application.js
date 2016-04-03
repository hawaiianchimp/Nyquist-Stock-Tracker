import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'https://www.quandl.com',
  namespace: 'api/v3/datasets/WIKI',
  auth_token: 'zKTcfdFKjycju3fvk3hs',
});
