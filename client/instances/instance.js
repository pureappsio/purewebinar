Template.instanceListing.helpers({

    webinarName: function() {
        return Webinars.findOne(this.webinarId).name;
    },
    webinarType: function() {
        return Webinars.findOne(this.webinarId).type;
    },
    instanceAttendees: function() {
        return Attendees.find({ instanceId: this._id }).count();
    }

});
