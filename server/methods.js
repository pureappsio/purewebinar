import Images from '../imports/api/files';

Meteor.methods({

    insertMessage: function(message) {

        console.log(message);

        Messages.insert(message);

    },
    registerAttendee: function(attendee) {

        // Check if attendee exists
        if (Attendees.findOne({ email: attendee.email, instanceId: attendee.instanceId })) {

            console.log('Already registered');

        } else {

            // Insert
            var attendeeId = Attendees.insert(attendee);

            // Create event
            var event = {
                instanceId: attendee.instanceId,
                attendeeId: attendeeId,
                date: new Date(),
                type: 'registered'
            }

            Events.insert(event);

        }

    },
    removeAttendee: function(attendeeId) {

        // Remove
        Attendees.remove(attendeeId);

        // Remove all events
        Events.remove({ attendeeId: attendeeId });

    },
    afterWebinarCreate: function(action, webinarId) {

        var webinar = Webinars.findOne(webinarId);

        var dates = Meteor.call('generateDates', webinarId);

        for (i in dates) {

            var instance = {
                webinarId: webinarId,
                date: dates[i]

            }

            Instances.insert(instance);

        }


    },
    generateDates: function(webinarId) {

        var webinar = Webinars.findOne(webinarId);
        var days = webinar.days;
        var times = webinar.times;

        var outputDates = [];

        for (d in days) {

            for (i in times) {

                var currentDate = new Date();

                var dayDiff = days[d] - currentDate.getDay() + 7;
                currentDate = new Date(currentDate.getTime() + dayDiff * 24 * 3600 * 1000);

                if (times[i].period == 'pm') {

                    currentDate.setHours(times[i].hour + 12);
                } else {
                    currentDate.setHours(times[i].hour);
                }

                currentDate.setMinutes(0);
                currentDate.setSeconds(0);

                outputDates.push(currentDate);
            }

        }

        return outputDates;

    },
    startWebinar: function(webinarId) {

        Webinars.update(webinarId, { $set: { status: 'live' } });

    },
    setAttendeeInactive(attendeeId) {

        // Get attendee
        var attendee = Attendees.findOne(attendeeId);

        // Create event
        var event = {
            instanceId: attendee.instanceId,
            attendeeId: attendeeId,
            date: new Date(),
            type: 'inactive'
        }

        console.log(event);

        Events.insert(event);

    },
    setAttendeeActive(attendeeId) {

        // Get attendee
        var attendee = Attendees.findOne(attendeeId);

        // Create event
        var event = {
            instanceId: attendee.instanceId,
            attendeeId: attendeeId,
            date: new Date(),
            type: 'active'
        }

        console.log(event);

        Events.insert(event);
    },
    addAttendee: function(attendee) {

        console.log(attendee);
        var attendeeId = Attendees.insert(attendee);

        return attendeeId;

    },
    removeWebinar: function(webinarId) {

        Webinars.remove(webinarId);

    },
    createWebinar: function(webinar) {

        console.log(webinar);

        Webinars.insert(webinar);

    },
    addVideoWebinar(videoId, webinarId) {

        Webinars.update(webinarId, { $set: { videoId: videoId } });

    },
    getStreamSource: function() {

        return Metas.findOne({ type: 'source' }).value;

    },
    getVideoSource: function(webinarId) {

        var webinar = Webinars.findOne(webinarId);

        if (webinar.videoId) {
            return Images.findOne(webinar.videoId).link();
        } else {
            return "";
        }

    },
    insertMeta: function(meta) {

        console.log(meta);

        // Check if exist
        if (Metas.findOne({ type: meta.type })) {

            // Update
            console.log('Updating meta');
            Metas.update({ type: meta.type }, { $set: { value: meta.value } });

        } else {

            // Insert
            console.log('Creating new meta');
            Metas.insert(meta);

        }

    },

    createUsers: function() {

        // Create admin user
        var adminUser = {
            email: Meteor.settings.adminUser.email,
            password: Meteor.settings.adminUser.password,
            role: 'admin'
        }
        Meteor.call('createNewUser', adminUser);

    },
    createNewUser: function(data) {

        // Check if exist
        if (Meteor.users.findOne({ "emails.0.address": data.email })) {

            console.log('User already created');
            var userId = Meteor.users.findOne({ "emails.0.address": data.email })._id;

        } else {

            console.log('Creating new user');

            // Create
            var userId = Accounts.createUser(data);

            // Change role
            Meteor.users.update(userId, { $set: { role: data.role } });
            console.log(Meteor.users.findOne(userId));

        }

    },

    validateApiKey: function(key) {

        var adminUser = Meteor.users.findOne({ apiKey: { $exists: true } });

        if (adminUser.apiKey == key) {
            return true;
        } else {
            return false;
        }

    },
    generateApiKey: function() {

        // Check if key exist
        if (!Meteor.user().apiKey) {

            // Generate key
            var key = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 16; i++) {
                key += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            console.log(key);

            // Update user
            Meteor.users.update(Meteor.user()._id, { $set: { apiKey: key } });
        }

    }

});
