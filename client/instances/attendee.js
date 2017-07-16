Template.attendee.events({

    'click .delete-attendee': function() {

        Meteor.call('removeAttendee', this._id);

    }

});

Template.attendee.helpers({

    status: function() {
        return Events.findOne({ attendeeId: this._id }, { sort: { date: -1 } }).type.toUpperCase();
    }

});
