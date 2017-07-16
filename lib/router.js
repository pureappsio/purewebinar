Router.configure({
    layoutTemplate: 'layout'
});

// Routes
Router.route('/webinars/:id', {
    name: 'webinar',
    waitOn: function() {
        return [Meteor.subscribe('userWebinars'),
            Meteor.subscribe('userInstances')
        ];
    },
    data: function() {

        if (this.ready()) {

            // Check for attendeeId
            if (this.params.query.attendee) {
                Session.set('attendeeId', this.params.query.attendee);
            }

            return Instances.findOne(this.params.id);
        } else {
            this.render('loading');
        }

    }
});

Router.route('/webinars/:id/admin', {
    name: 'webinarAdmin',
    data: function() {

        return Instances.findOne(this.params.id);

    }
});

Router.route('/webinars/:id/edit', {
    name: 'webinarEdit',
    data: function() {

        return Webinars.findOne(this.params.id);

    }
});

Router.route('/instances/:id/attendees', {
    name: 'instanceAttendees',
    data: function() {

        return Instances.findOne(this.params.id);

    }
});

Router.route('/login', { name: 'login' });
Router.route('/admin', { name: 'admin' });
Router.route('/settings', { name: 'settings' });
Router.route('/brands', { name: 'brands' });
Router.route('/webinars', { name: 'webinars' });
Router.route('/instances', { name: 'instances' });
Router.route('/attendees', { name: 'attendees' });
Router.route('/', { name: 'home', data: function() { this.render('admin') } });
