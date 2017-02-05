Template.settings.events({

  'click #save-source': function () {

    Meteor.call('insertMeta', {
    	value: $('#webinar-source').val(),
    	type: "source"
    });

  }

});
