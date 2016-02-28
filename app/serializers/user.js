import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    return {
      data: {
        id: payload.login,
        type: primaryModelClass.modelName,
        attributes: {
          name: payload.name
        }
      }
    };
  }
});
