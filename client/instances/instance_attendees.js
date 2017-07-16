Template.instanceAttendees.helpers({

    webinarName: function() {
        return Webinars.findOne(this.webinarId).name;
    },
    attendees: function() {
        return Attendees.find({ instanceId: this._id });
    }

});
