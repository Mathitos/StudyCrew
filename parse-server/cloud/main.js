const Groups = require('./groups')

Parse.Cloud.define('joinGroup', Groups.join)
Parse.Cloud.define('leaveGroup', Groups.leave)