Template.webinarAdmin.events({

    'click #start-webinar': function() {
        Meteor.call('startWebinar', this._id);
    }

});

Template.webinarAdmin.helpers({

    totalAttendees: function() {

        return Attendees.find({ webinarId: this._id, status: 'active' }).fetch().length;

    }

});

Template.webinarAdmin.onRendered(function() {

    // Video
    videojs("#my-video").ready(function() {
        var myPlayer = this;

        myPlayer.pause()
        Meteor.call('getStreamSource', function(err, streamSource) {
            myPlayer.src({
                src: streamSource,
                type: 'application/x-mpegURL'
            });
            myPlayer.load();
            myPlayer.play();
        });

    });



});
