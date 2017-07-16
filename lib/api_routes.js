Router.route("/api/webinars", { where: "server" }).get(function() {

    // Get data
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {

        var webinars = Webinars.find({}).fetch();
        this.response.end(JSON.stringify({ webinars: webinars }));

    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/webinars/:id", { where: "server" }).get(function() {

    // Get data
    var key = this.params.query.key;
    var webinarId = this.params.id;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {

        var webinar = Webinars.findOne(webinarId);

        // Generate dates
        if (webinar.type == 'automated') {
            var dates = Meteor.call('generateDates', webinarId);
            webinar.dates = dates;
        }

        this.response.end(JSON.stringify(webinar));

    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/instances", { where: "server" }).get(function() {

    // Get data
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {

        query = {};

        if (this.params.query.webinar) {
            query.webinarId = this.params.query.webinar;
        }

        var instances = Instances.find(query).fetch();
        this.response.end(JSON.stringify({ instances: instances }));

    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/attendees", { where: "server" }).get(function() {

    // Get data
    var key = this.params.query.key;

    // Send response
    this.response.setHeader('Content-Type', 'application/json');
    if (Meteor.call('validateApiKey', key)) {

        var attendees = Attendees.find({}).fetch();
        this.response.end(JSON.stringify({ attendees: attendees }));

    } else {
        this.response.end(JSON.stringify({ message: "API key invalid" }));
    }

});

Router.route("/api/register", { where: "server" }).post(function() {

    // Get data
    var data = this.request.body;
    console.log(data);

    if (data.instanceId && data.email && data.destination) {

        // Create attendee data
        var attendee = {
            email: data.email,
            instanceId: data.instanceId
        }

        if (data.name) {
            attendee.name = data.name;
        }

        // Register
        Meteor.call('registerAttendee', attendee);

        // Send response
        this.response.writeHead(302, {
            'Location': data.destination
        });
        this.response.end();

    } else {
        this.response.setHeader('Content-Type', 'application/json');
        this.response.end(JSON.stringify({ message: "Invalid data" }));
    }

});

Router.route('/api/status', { where: 'server' }).get(function() {

    this.response.setHeader('Content-Type', 'application/json');
    this.response.end(JSON.stringify({ message: 'System online' }));

});
