Template.webinarAdmin.events({

    'click #start-webinar': function() {
        Meteor.call('startWebinar', this._id);
    }

});

Template.webinarAdmin.helpers({

    webinarName: function() {

        return Webinars.findOne(this.webinarId).name;

    },

    totalAttendees: function() {

        return Events.find({ instanceId: this._id, type: 'active' }).count();

    }

});

Template.webinarAdmin.onRendered(function() {

    // Webinar video
    if (this.data) {

        var webinarData = this.data;

        videojs("#my-video").ready(function() {
            var myPlayer = this;

            myPlayer.pause()

            if (webinarData.type == 'live') {
                Meteor.call('getStreamSource', function(err, streamSource) {
                    myPlayer.src({
                        src: streamSource,
                        type: 'application/x-mpegURL'
                    });
                    myPlayer.load();
                    myPlayer.play();
                });
            }

            if (webinarData.type == 'automated') {
                Meteor.call('getVideoSource', webinarData._id, function(err, streamSource) {
                    myPlayer.src({
                        src: streamSource,
                        type: 'video/mp4'
                    });
                    myPlayer.load();
                });
            }

        });

    }

});
