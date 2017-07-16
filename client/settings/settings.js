Template.settings.events({

    'click #save-source': function() {

        Meteor.call('insertMeta', {
            value: $('#webinar-source').val(),
            type: "source"
        });

    },
    'click #save-author-data': function() {

        Meteor.call('insertMeta', {
            value: $('#author-name').val(),
            type: "authorName"
        });

        Meteor.call('insertMeta', {
            value: $('#author-description').val(),
            type: "authorDescription"
        });

    },
    'click #save-author-pic': function() {

        Meteor.call('insertMeta', {
            value: Session.get('authorPic'),
            type: "authorPic"
        });
    }


});
