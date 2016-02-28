import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    let data = payload.dataset;
    debugger;
    return {
      data: {
        id: data.dataset_code,
        type: primaryModelClass.modelName,
        attributes: {
          name: data.name,
          ticker: data.dataset_code
        }
      }
    };
  }
});
