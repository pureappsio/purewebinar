import Images from '/imports/api/files';

var webinarStarted = false;

Template.webinar.events({

    'keyup #chat-text': function(event) {

        if (event.keyCode === 13) {

            var message = {
                attendeeId: Session.get('attendeeId'),
                content: $('#chat-text').val(),
                instanceId: this._id,
                date: new Date()
            }

            Meteor.call('insertMessage', message);

            $('#chat-text').val('');
        }
    },
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

    messages: function() {

        var messages = Messages.find({ instanceId: this._id }, { limit: 10, sort: { date: -1 } }).fetch();

        return messages.reverse();
    },
    authorPic: function() {

        var picId = Metas.findOne({ type: 'authorPic' }).value;

        return Images.findOne(picId).link();

    },
    webinarDate: function() {

        return moment(this.date).format('MMMM Do YYYY, h:mm a');

    },
    webinarName: function() {

        if (this.webinarId) {
            return Webinars.findOne(this.webinarId).name;
        }
    },
    webinarReady: function() {

        // Get webinar
        var webinar = Webinars.findOne(this.webinarId);

        // Type
        if (webinar.type == 'live') {
            if (webinar.status == 'created') {
                return false;
            } else {
                return true;
            }
        } else {

            if (Session.get('time')) {
                var now = Session.get('time');
            } else {
                var now = new Date();
            }

            if (now.getTime() > (this.date).getTime()) {
                return true;
            } else {
                return false;
            }

        }

        return true;

    }

});

Template.webinar.onRendered(function() {

    if (Session.get('attendeeId')) {

        // Load webinar window
        $('#initial-signup').hide();

        // Set as active
        Meteor.call('setAttendeeActive', Session.get('attendeeId'));

    }

    // Video
    if (this.data) {

        // Webinar data
        var webinarData = Webinars.findOne(this.data.webinarId);
        var webinarDate = this.data.date;

        Meteor.setInterval(function() {

            var now = new Date();
            var diff = now.getTime() - webinarDate.getTime();

            console.log(diff);

            if (diff >= 0) {

                if (webinarStarted == false) {

                    webinarStarted = true;

                    $('#webinar-ready').show();
                    $('#webinar-wait').hide();

                    if (webinarData.type == 'live') {

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

                    } else {

                        videojs("#my-video").ready(function() {

                            streamSource = Images.findOne(webinarData.videoId).link();

                            var myPlayer = this;

                            myPlayer.src({
                                src: streamSource,
                                type: 'video/mp4'
                            });
                            myPlayer.load();

                            myPlayer.currentTime(diff / 1000);
                            myPlayer.play();

                        });

                    }


                }
            } else {
                $('#webinar-wait').show();
                $('#webinar-ready').hide();
            }

        }, 1000);

    }

    // Leaving
    $(window).bind('beforeunload', function() {
        Meteor.call('setAttendeeInactive', Session.get('attendeeId'));
    });

});
