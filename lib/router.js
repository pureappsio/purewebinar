Router.configure({
    layoutTemplate: 'layout'
});

// Routes
Router.route('/webinars/:id', {
    name: 'webinar',
    data: function() {

        return Webinars.findOne(this.params.id);

    }
});

Router.route('/webinars/:id/admin', {
    name: 'webinarAdmin',
    data: function() {

        return Webinars.findOne(this.params.id);

    }
});

Router.route('/admin', { name: 'admin' });
Router.route('/', { name: 'home', data: function() { this.render('admin') } });
