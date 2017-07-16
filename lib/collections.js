import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

// Required AutoForm setup
SimpleSchema.extendOptions(['autoform']);
SimpleSchema.debug = true;

// Collections
Brands = new Mongo.Collection('brands');
Webinars = new Mongo.Collection('webinars');

Instances = new Mongo.Collection('instances');
Attendees = new Mongo.Collection('attendees');
Messages = new Mongo.Collection('messages');

Events = new Mongo.Collection('events');

Metas = new Mongo.Collection('metas');

// Shemas
const Schemas = {};

Schemas.Webinars = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    },
    url: {
        type: String,
        label: "Url"
    },
    type: {
        type: String,
        label: "Type",
        autoform: {
            options: function() {
                return [{
                    label: 'Live',
                    value: 'live'
                }, {
                    label: 'Automated',
                    value: 'automated'
                }];
            }
        }
    },
    brandId: {
        type: String,
        label: "Brand",
        autoform: {
            options: function() {
                return Brands.find({}).map(function(brand) {
                    return {
                        label: brand.name,
                        value: brand._id
                    };
                });
            },
        }
    },
    videoId: {
        optional: true,
        type: String,
        label: "Video ID"
    },
    days: {
        optional: true,
        type: Array
    },
    'days.$': {
        optional: true,
        type: Number,
        label: "Day",
        autoform: {
            options: function() {
                return [{
                    label: 'Monday',
                    value: 1
                }, {
                    label: 'Tuesday',
                    value: 2
                }, {
                    label: 'Wednesday',
                    value: 3
                }, {
                    label: 'Thursday',
                    value: 4
                }, {
                    label: 'Friday',
                    value: 5
                }, {
                    label: 'Saturday',
                    value: 6
                }, {
                    label: 'Sunday',
                    value: 7
                }];
            }
        }
    },
    times: {
        optional: true,
        type: Array
    },
    'times.$': {
        type: Object,
        optional: true
    },
    'times.$.hour': {
        optional: true,
        type: Number,
        label: "Hour",
        autoform: {
            options: function() {
                timeArray = [];
                for (i = 0; i < 12; i++) {
                    timeArray.push({
                        label: i,
                        value: i
                    });
                }
                return timeArray;
            }
        }
    },
    'times.$.period': {
        optional: true,
        type: String,
        label: "Period",
        autoform: {
            options: function() {
                return [{
                    label: 'AM',
                    value: 'am'
                }, {
                    label: 'PM',
                    value: 'pm'
                }];
            }
        }
    }

});

Schemas.Brands = new SimpleSchema({

    name: {
        type: String,
        label: "Name"
    }

});

Schemas.Instances = new SimpleSchema({

    date: {
        type: Date,
        label: "Date",
        autoform: {
            afFieldInput: {
                type: "bootstrap-datetimepicker"
            }
        }
    },
    webinarId: {
        type: String,
        autoform: {
            options: function() {
                return Webinars.find({}).map(function(webinar) {
                    return {
                        label: webinar.name,
                        value: webinar._id
                    };
                });
            }
        }
    }

});

Schemas.Attendees = new SimpleSchema({

    name: {
        type: String,
        label: "Name",

    },
    email: {
        type: String,
        label: "Email",
    },
    instanceId: {
        type: String,
        autoform: {
            options: function() {
                return Instances.find({}).map(function(instance) {
                    return {
                        label: instance.date,
                        value: instance._id
                    };
                });
            }
        }
    }

});

Webinars.attachSchema(Schemas.Webinars);
Brands.attachSchema(Schemas.Brands);
Instances.attachSchema(Schemas.Instances);
Attendees.attachSchema(Schemas.Attendees);
