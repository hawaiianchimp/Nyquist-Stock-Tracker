import Ember from 'ember';

export default Ember.Service.extend({
  mathService: Ember.inject.service(),

  /**
   *
   * This function returns an array from text passed into it
   * Used for inputs that should be arrays
   *
   * @param  {String, Array} text [comma separated text that will be an array]
   * @return {Array}      [returns array]
   */
  convertToArray: function(text) {

    if(Ember.isEmpty(text)){
      return [];
    }
    if(typeof text === 'string') {
      if(text.indexOf(',') > -1) {
        return text.split(',')
            .map(i => parseFloat(i))
      .filter(i => !isNaN(i) && typeof i === 'number');
      }
      else if(typeof parseFloat(text) === 'number'){
        return (isNaN(parseFloat(text))) ? []:[parseFloat(text)];
      }
    }
    if(typeof text === 'number'){
      return [text];
    }
    return [];
  },

  /**
   *
   * Converts text to Integer
   *
   * @param  {String} text [number as text input]
   * @return {Number}      [returns Integer]
   */
  convertToInteger: function(text){
    if(!text){
      return 0;
    }
    return parseInt(text);
  }
});
