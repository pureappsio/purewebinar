Template.admin.events({

    // 'click #save-source': function() {

    //     Meteor.call('insertMeta', {
    //         value: $('#webinar-source').val(),
    //         type: "source"
    //     });

    // },
    // 'click #save-webinar': function() {
    // 	Meteor.call('createWebinar', {
    // 		name: $('#webinar-name').val(),
    // 		userId: Meteor.user()._id,
    //         status: 'created'
    // 	})
    // }

    'click #generate-key': function() {

        Meteor.call('generateApiKey');
    }

});

Template.admin.helpers({

    // webinars: function() {
    //     return Webinars.find({});
    // }

    key: function() {
        return Meteor.user().apiKey;
    }

});
