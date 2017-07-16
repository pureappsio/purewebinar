Template.instances.helpers({

    instances: function() {
        return Instances.find({}, { sort: { date: 1 } });
    }

});
