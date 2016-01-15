import Ember from 'ember';

export default Ember.Service.extend({
  inputService: Ember.inject.service(),

  /**
   * Calculates the moving average of an array of values
   *
   * @param  {Number} limit [The number of days to calculate the moving average]
   * @param  {Array} data  [The array of values]
   * @return {Number}       The simple moving average
   */
  movingAverage(limit, data) {
    let values = this.get('inputService').convertToArray(data);
    let total = 0;
    let days = parseFloat(limit);
    let sma;
    if (Ember.isEmpty(values) || Ember.isEmpty(days) || values.length === 0 || days === 0){
      return 0;
    }

    if (data.length > days) {
      values = values.splice(-days);
    }

    for (var i = values.length - 1; i >= 0; i--) {
      total += parseFloat(values[i]);
    }
    sma = total/values.length;
    return this.roundToNearest(4, sma);
  },

  /**
   *
   * @param  {Number} decimal Digits to round number to
   * @param  {Number} number  Number to round
   * @return {Number}         the rounded number
   */
  roundToNearest(decimal, number) {
    let tens = Math.pow(10, decimal);
    return Math.round(number * tens) / tens;
  },

  /**
   * Returns true if it is a number
   * @param {Number} i Number to be be checked
   * @returns {boolean}
   */
  isNumber(i){
    return !isNaN(i) && typeof i === "number";
  }
});
