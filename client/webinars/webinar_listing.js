Template.webinarListing.events({

    'click .delete-webinar': function() {

        Meteor.call('removeWebinar', this._id);

    }

});
