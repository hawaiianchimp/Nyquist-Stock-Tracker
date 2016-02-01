import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * Calculates the moving average of an array of values
   *
   * @param  {Array} data [The data]
   * @param  {Number} limit [The number of data points to calculate over]
   * @returns {Number} [The simple moving average]
   */
  sma(data, limit = data.length) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return 0;
    }
    return data.splice(-limit).reduce((prev, curr, index, values) => {
      return prev + curr/values.length;
    }, 0);
  },

  smaLine(data, limit = data.length) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return [];
    } else if (limit > data.length){
      limit = data.length;
    }

    let values = [];
    for(let i = data.length; i > 0; i--){
      let subtotal = 0;
      for(let j = limit; j > 0 && ((i - j) >= 0); j--){
        subtotal += data[i - j];
      }
      values.unshift(Math.round(subtotal/limit * 100) / 100);
    }
    return values;
  },

  /**
   * Recursive function to calculate Exponential Moving Average
   *
   * @param {Array} data [The data]
   * @param {Number} limit [The number of data points to calculate over]
   * @returns {Number} [The exponential moving average]
   */
  ema: function ema(data, limit = data.length) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return 0;
    } else if(limit === 1 || data.length === 1) {
      return data[0];
    } else {
      let values = data.slice(-limit);
      let prev = values.slice(0,-1);
      let curr = values.slice(-1);
      let weight = Math.round(2/(values.length + 1) * 1000000) / 1000000;
      let result = weight * curr[0] + (1 - weight) * ema(prev);
      return Math.round(result * 100) / 100;
    }
  },

  /**
   * Recursive function to calculate Exponential Moving Average
   *
   * @param {Array} data [The data]
   * @param {Number} limit [The number of data points to calculate over]
   * @returns {Number} [The exponential moving average]
   */
  emaLine(data, limit = data.length) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);

    if (limit <= 0 || data.length === 0) {
      return [];
    } else if (limit > data.length){
      limit = data.length;
    }

    let values = [];
    for(let i = data.length; i > 0; i--){
      let subdata = data.slice(i - limit, i);
      values.unshift(this.ema(subdata, limit));
    }
    return values;
  },

  /**
   * Function to calculate Relative Strength Index
   *
   * @param {Array} data [The data]
   * @param {Number} limit [The number of data points to calculate over]
   * @returns {number} [The relative strength index]
   */
  rsi(data, limit = data.length) {
    Ember.assert('Limit must be an Integer', typeof limit === 'number');
    Ember.assert('Data must be an Array', data.constructor === Array);
    if (limit <= 1 || data.length === 1) {
      return 100;
    }
    let ups = [];
    let downs = [];
    let u,d,rs;

    for(let i = data.length - 1; i > 0; i--){
      if(data[i] > data[i - 1]) {
        ups.push(data[i] - data[i - 1]);
        downs.push(0);
      } else if (data[i] < data[i - 1]) {
        ups.push(0);
        downs.push(data[i - 1] - data[i]);
      } else{
        ups.push(0);
        downs.push(0);
      }
    }
    u = this.sma(ups);
    d = this.sma(downs);

    if(d === 0) { return 100; }

    rs = u/d;

    return Math.round(100 - 100/(1 + rs));
  },
  //
  //macd(data, limit = data.length){
  //  return this.ema(data, 26) - this.ema(data, 12);
  //},
  //
  //signalLine(data, limit = data.length){
  //  return this.ema(data, 9);
  //},

  /**
   * Rounds number to the specified number of digits
   *
   * @param  {Number} number  [Number to round]
   * @param  {Number} decimal [Digits to round number to]
   * @returns {Number} [The rounded number]
   */
  roundToNearest(number, decimal = 3) {
    let tens = Math.pow(10, decimal);
    return Math.round(number * tens) / tens;
  },

  /**
   * Returns true if it is a number
   *
   * @param {Number} i [Number to be be checked]
   * @returns {boolean}
   */
  isNumber(i) {
    return !isNaN(i) && typeof i === 'number';
  }
});
