Meteor.startup(function() {
	if (Instruments.find().count() == 0 && InstrumentCategories.find().count() == 0) {
		_.each({
			'musical instrument': ['piano', 'violin', 'viola', 'cello', 'flute', 'recorder', 'oboe', 'bassoon', 'guitar', 'bass guitar', 'percussion'],
			'voice': ['soprano voice', 'alto voice', 'tenor voice', 'bass voice']			
		}, function(instruments, category) {
			var instrumentIds = []
			instruments.forEach(function(instrument) {
				instrumentIds.push(
					Instruments.insert({name: instrument})
				)
			})
			InstrumentCategories.insert({name: category, instrumentIds: instrumentIds})
		})
	}
})

Meteor.publish('instruments', function() {
	return [Instruments.find(), InstrumentCategories.find()]
})

var isAdmin = function(userId) {return userId == 'bfyD2jEcprsqEoJ7r'}
var crudAdmin = {
	insert: isAdmin,
	update: isAdmin,
	remove: isAdmin
}

Instruments.allow(crudAdmin)
InstrumentCategories.allow(crudAdmin)