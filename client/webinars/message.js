Template.message.helpers({

    attendeeName: function() {
        return Attendees.findOne(this.attendeeId).name;
    }

});
