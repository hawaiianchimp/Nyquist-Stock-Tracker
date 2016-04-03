import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    let dataset = payload.dataset;
    let prices = dataset.data.slice(0,20);
    prices.unshift(dataset.column_names);

    return {
      data: {
        id: id,
        type: primaryModelClass.modelName,
        attributes: {
          name: dataset.name,
          ticker: dataset.dataset_code,
          prices: prices
        }
      }
    };
  }
});
