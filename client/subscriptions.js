// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userWebinars');
    Meteor.subscribe('userAttendees');
     Meteor.subscribe('userQuestions');
    Meteor.subscribe('userMetas');
    Meteor.subscribe('allUsers');
});