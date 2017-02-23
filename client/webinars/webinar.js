Template.webinar.events({

    'click #join-webinar': function() {

        $('#webinar-wait').hide();
        $('#live-video').show();

        var myPlayer = videojs('#my-video');
        myPlayer.muted(false);

    },
    'click #enter-webinar': function() {

        attendeeData = {
            name: $('#attendee-name').val(),
            webinarId: this._id,
            status: 'active'
        }

        webinarData = this;

        Meteor.call('addAttendee', attendeeData, function(err, data) {

            // Show video
            $('#initial-signup').hide();

            if (webinarData.status == 'created') {
                $('#webinar-wait').show();
            }
            if (webinarData.status == 'live') {
                $('#live-video').show();
                var myPlayer = videojs('#my-video');
                myPlayer.muted(false);

            }

            // Set attendee
            Session.set('attendee', data);

        });

    }

});

Template.webinar.helpers({

    webinarReady: function() {

        if (this.status == 'created') {
            return false;
        } else {
            return true;
        }

    }

});

Template.webinar.onRendered(function() {

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

    // Leaving
    $(window).bind('beforeunload', function() {
        Meteor.call('setAttendeeInactive', Session.get('attendee'));
    });

});
