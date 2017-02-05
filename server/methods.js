Meteor.methods({

    startWebinar: function(webinarId) {

        Webinars.update(webinarId, { $set: { status: 'live' } });

    },
    setAttendeeInactive(attendeeId) {

        console.log(attendeeId);
        Attendees.update(attendeeId, { $set: { status: 'inactive' } });

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
    getStreamSource: function() {

        return Metas.findOne({ type: 'source' }).value;

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
