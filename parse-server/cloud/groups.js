const Errors = require('./errors')
const Options = require('./options')

var Role = exports.Role = {
	Participant: 'participant',
	Admin: 'admin'
}

exports.join = (request, response) => {
	let { user } = request
	if (!user) { throw Errors.AuthenticationRequired }
	
	let { groupId } = request.params
	if (!groupId) { throw Errors.GroupIdRequired }
	
	let groupQuery = new Parse.Query('Group')
	groupQuery.get(groupId)
	.then( (group) => {
		if (!group) { throw Errors.GroupNotFound }
		return Promise.resolve(group)
	})
	.then( (group) => {
		let participant = new Parse.Object('Participant')
	
		let userACL = new Parse.ACL()
		userACL.setReadAccess(user.id, true)
		
		const obj = {
			user: user,
			group: group,
			role: Role.Participant,
			joinAt: new Date(),
			ACL: userACL
		}

		return participant.save(obj, Options.MasterKey)
	})
	.then(response.success)
	.catch(response.error)
}

exports.leave = (request, response) => {
	let { user } = request
	if (!user) { throw Errors.AuthenticationRequired }
	
	let { groupId } = request.params
	if (!groupId) { throw Errors.GroupIdRequired }
	
	let Group = new Parse.Object.extend('Group')
	const group = Group.createWithoutData(groupId)
	
	let participantQuery = new Parse.Query('Participant')
	participantQuery
	.equalTo('user', user)
	.equalTo('group', group)
	.first(Options.MasterKey)
	.then( (participant) => {
		if (!participant) { throw Errors.ParticipantNotFound }
		return Promise.resolve(participant)
	})
	.then( (participant) => {
		const obj = {
			leaveAt: new Date()
		}
		
		console.debug(participant)
		
		return participant.save(obj, Options.MasterKey)
	})
	.then(response.success)
	.catch(response.error)
}