const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/users');

mongoose.connect(db.uri);

User.collection.drop();

User.create([{
  name: 'Curtis Osano',
  dob: 'March-08-1987',
  image: 'http://images.performgroup.com/di/library/Goal_India/db/10/curtis-osano-bengaluru-fc_1ag1kbho00pcb1g2mq9brs34gx.jpg?t=574028258&w=620&h=430'
},{
  name: 'Aaron',
  dob: 'January-04-1990',
  image: 'https://s-media-cache-ak0.pinimg.com/736x/9b/a2/57/9ba25796112cad616be27e473ae1e149.jpg'
},{
  name: 'Elliot Brock',
  dob: 'December-15-1994',
  image: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-08/18/13/enhanced/webdr13/grid-cell-15170-1439918492-2.jpg'
},{
  name: 'Will Whitmey',
  dob: 'Feb-02-1989',
  image: 'https://s-media-cache-ak0.pinimg.com/564x/4b/53/55/4b53554766a2ed8fe948c08b09f37b1b.jpg'
}],(err, users) => {
  if(err) console.log('There was an error creating users', err);

  console.log(`${users.length} users created!`);
  mongoose.connection.close();


});
