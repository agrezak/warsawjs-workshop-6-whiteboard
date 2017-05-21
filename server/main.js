import { Meteor } from 'meteor/meteor';
import '../imports/lib/fabric-objects';

Meteor.publish({
   fabricObjects() {
       return FabricObjects.find({

       });
   },
});

Meteor.startup(() => {
  // code to run on server at startup
});
