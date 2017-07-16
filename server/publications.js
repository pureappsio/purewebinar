import Images from '../imports/api/files';

Meteor.publish("userWebinars", function() {
    return Webinars.find({});
});

Meteor.publish("userBrands", function() {
    return Brands.find({});
});

Meteor.publish("userAttendees", function() {
    return Attendees.find({});
});

Meteor.publish("userInstances", function() {
    return Instances.find({});
});

Meteor.publish("userEvents", function() {
    return Events.find({});
});

Meteor.publish("userMessages", function() {
    return Messages.find({});
});

Meteor.publish("userMetas", function() {
    return Metas.find({});
});

Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
});

Meteor.publish('files.images.all', function() {
    return Images.find().cursor;
});
