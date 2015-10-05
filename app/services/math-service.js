import Ember from 'ember';

export default Ember.Service.extend({
	movingAverage(limit, data) {
		let values = this.convertToArray(data);
		let total = 0;
		let days = parseFloat(limit);
		let sma = 0;
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

	roundToNearest(decimal, number) {
		var tens = Math.pow(10, decimal);
		return Math.round(number * tens) / tens;
	},

	/**
	* This function returns an array from text passed into it
	* Used for inputs that should be arrays
	* @param {String} [text] [comma separated text that will be an array]
	*/
	convertToArray(text){
		if(Ember.isEmpty(text)){
			return [];
		}
		if(Ember.isArray(text)){
			return text;
		}
		if(typeof text === 'string'){
			if(text.indexOf(',') > -1){
				return text.split(',').map(i => parseFloat(i))
				.filter(this.isNumber);
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
	* Returns true if it is a number
	*/
	isNumber(i){
		return !isNaN(i) && typeof i === "number";
	},
});
