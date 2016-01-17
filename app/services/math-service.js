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
  sma(limit, data) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return 0;
    }
    return data.splice(-limit).reduce((prev, curr, index, values) => {
      return prev + curr/values.length;
    }, 0);
  },

  /**
   * Recursive function to calculate Exponential Moving Average
   *
   * @param {Number} limit [The number of data points to calculate over]
   * @param {Array} data [The data]
   * @returns {Number}
   */
  ema: function ema(limit, data) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return 0;
    }
    if(limit === 1 || data.length === 1) {
      return data[0];
    }
    else {
      let values = data.slice(-limit);
      let prev = values.slice(0,-1);
      let curr = values.slice(-1);
      let weight = Math.round(2/(values.length + 1) * 1000000) / 1000000;
      let result = weight * curr[0] + (1 - weight) * ema(prev.length, prev);
      return Math.round(result * 100) / 100;
    }
  },

  /**
   * Rounds number to the specified number of digits
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
