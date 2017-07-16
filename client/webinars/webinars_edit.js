Template.webinarEdit.helpers({

    isAutomated: function() {

        if (this.type == 'automated') {
            return true;
        }

    }

});

Template.webinarEdit.events({

    'click #save-video': function() {
        Meteor.call('addVideoWebinar', Session.get('video'), this._id);
    }

});
