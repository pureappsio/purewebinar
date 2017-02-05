Meteor.publish("userWebinars", function() {
    return Webinars.find({});
});

Meteor.publish("userAttendees", function() {
    return Attendees.find({});
});

Meteor.publish("userQuestions", function() {
    return Questions.find({});
});

Meteor.publish("userMetas", function() {
    return Metas.find({});
});

Meteor.publish("allUsers", function() {
    return Meteor.users.find({});
});
