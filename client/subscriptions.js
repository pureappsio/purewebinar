import Images from '/imports/api/files';

// Tracker
Tracker.autorun(function() {
    Meteor.subscribe('userBrands');
    Meteor.subscribe('userWebinars');
    Meteor.subscribe('userAttendees');
    Meteor.subscribe('userMessages');
    Meteor.subscribe('userInstances');
    Meteor.subscribe('userMetas');
    Meteor.subscribe('userEvents');
    Meteor.subscribe('allUsers');
    Meteor.subscribe('files.images.all');
});

AutoForm.hooks({

    insertWebinarForm: {
        onSuccess: function(doc, data) {
            Meteor.call('afterWebinarCreate', doc, data);
        }
    }
})
