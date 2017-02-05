Template.admin.events({

    'click #save-source': function() {

        Meteor.call('insertMeta', {
            value: $('#webinar-source').val(),
            type: "source"
        });

    },
    'click #save-webinar': function() {
    	Meteor.call('createWebinar', {
    		name: $('#webinar-name').val(),
    		userId: Meteor.user()._id,
            status: 'created'
    	})
    }

});

Template.admin.helpers({

    webinars: function() {
        return Webinars.find({});
    }

});
