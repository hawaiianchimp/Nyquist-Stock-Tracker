import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'div',
	classNames: ['graph'],
	math: Ember.inject.service('math-service'),
	stream: '1,2,3,4',
	days: 200,
	points: Ember.computed('stream', 'days', function(){
		return this.get('stream') ? this.get('stream').split(','): 0; 
	}),
	movingAverage: Ember.computed('input', 'days', 'points', function(){
		return this.get('math').movingAverage(this.get('days'), this.get('points'));
	})
});
