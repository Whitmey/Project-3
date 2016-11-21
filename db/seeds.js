const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/user');

mongoose.connect(db.uri);

User.collection.drop();

User.create([{
  username: 'Wonder Woman',
  dob: 'June-01-1690',
  profileImage: 'https://cnet4.cbsistatic.com/img/5SdtA9dV3jLTHJ5mGGweaI0Pm2s=/770x433/2016/07/16/69a827cf-ba37-4fd4-ae9c-ffe534c9bc22/wonderwoman.jpg',
  email: 'wonder@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Goku',
  dob: 'September-03-1270',
  profileImage: 'http://orig12.deviantart.net/6066/f/2013/233/7/6/goku_by_bpsola-d6j32pk.jpg',
  email: 'goku@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Pixie Lot',
  dob: 'December-03-1970',
  profileImage: 'http://www.aceshowbiz.com/images/wennpic/pixie-lott-gq-men-of-the-year-awards-2015-01.jpg',
  email: 'pixie@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Margaret Thatcher',
  dob: 'October-03-1870',
  profileImage: 'http://www.abc.net.au/news/image/3980674-3x4-700x933.jpg',
  email: 'margaret@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Michelle Keegan',
  dob: 'Febuary-04-1769',
  profileImage: 'http://www.shemazing.net/wp-content/uploads/2015/10/michelle-keegan_1.jpg',
  email: 'michelle@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Megan Fox',
  dob: 'August-01-1669',
  profileImage: 'http://cdn01.cdn.justjared.com/wp-content/uploads/headlines/2015/09/megan-fox-joins-new-girl-as-jess-new-roommate.jpg',
  email: 'megan@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lilly Savage',
  dob: 'April-01-1257',
  profileImage: 'http://images.npg.org.uk/800_800/9/7/mw15297.jpg',
  email: 'lilly@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Buzz Lightyear',
  dob: 'November-12-2000',
  profileImage: 'http://vignette2.wikia.nocookie.net/disney/images/b/bc/Buzz_Disney_INFINITY_Render.png/revision/latest?cb=20140605182818',
  email: 'buzz@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Curtis Osano',
  dob: 'March-08-1987',
  profileImage: 'http://images.performgroup.com/di/library/Goal_India/db/10/curtis-osano-bengaluru-fc_1ag1kbho00pcb1g2mq9brs34gx.jpg?t=574028258&w=620&h=430',
  email: 'curtis@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Tupac',
  dob: 'April-29-1782',
  profileImage: 'https://i.ytimg.com/vi/h69YQMbz0Yg/hqdefault.jpg',
  email: 'tupac@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -12
},{
  username: 'Sanka',
  dob: 'May-29-1493',
  profileImage: 'http://3.bp.blogspot.com/_5RlCD1fnT-U/TFsO-ta_bmI/AAAAAAAAAac/MfEL4yRdsLE/s1600/sanka1.jpg',
  email: 'sanka@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -27
},{
  username: 'Aaron',
  dob: 'May-29-1453',
  profileImage: 'https://pbs.twimg.com/profile_images/3705744002/324dc6a62abaebdfd446e72545e75568_400x400.jpeg',
  email: 'aaron@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -10000000
},{
  username: 'Elliot Brock',
  dob: 'December-15-1994',
  profileImage: 'https://img.buzzfeed.com/buzzfeed-static/static/2015-08/18/13/enhanced/webdr13/grid-cell-15170-1439918492-2.jpg',
  email: 'elliot@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Will Whitmey',
  dob: 'Feb-02-1989',
  profileImage: 'https://s-media-cache-ak0.pinimg.com/564x/4b/53/55/4b53554766a2ed8fe948c08b09f37b1b.jpg',
  email: 'will@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -69
},{
  username: 'Drake',
  dob: 'Feb-02-1989',
  profileImage: 'http://media.gq.com/photos/566f53b622c04e90668117ae/master/pass/Swerves-of-2015-drake-hotline-bling.jpg',
  email: 'drake@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Dikembe Mutombo',
  dob: 'Feb-02-1989',
  profileImage: 'http://www.africansuccess.org/docs/image/deke.jpg',
  email: 'dikembe@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'McLovin',
  dob: 'Mar-06-1981',
  profileImage: 'http://www3.pictures.zimbio.com/mp/sCJRv4hmKwDl.jpg',
  email: 'mclovin@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Beyonce',
  dob: 'Feb-02-1989',
  profileImage: 'http://factmag-images.s3.amazonaws.com/wp-content/uploads/2013/12/beyonce-121313.jpg',
  email: 'beyonce@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Rihanna',
  dob: 'Mar-06-1981',
  profileImage: 'http://www.36ng.com.ng/wp-content/uploads/2016/10/rihanna-2.jpg',
  email: 'rihanna@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Serena',
  dob: 'Feb-02-1989',
  profileImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Serena_Williams_at_2013_US_Open.jpg/220px-Serena_Williams_at_2013_US_Open.jpg',
  email: 'serena@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Kanye West',
  dob: 'Mar-06-1981',
  profileImage: 'http://pixel.nymag.com/imgs/daily/vulture/2016/02/09/09-kanye-west-2.w529.h529.jpg',
  email: 'kanye@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Amber Rose',
  dob: 'Feb-02-1989',
  profileImage: 'http://www.hiphopweekly.com/wp-content/uploads/2016/02/amber-rose.png',
  email: 'amber@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Jaden Smith',
  dob: 'Mar-06-1981',
  profileImage: 'http://static.djbooth.net/pics-artist/jadensmith2.jpg',
  email: 'jaden@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Clay Davis',
  dob: 'Feb-02-1989',
  profileImage: 'https://pbs.twimg.com/profile_images/3538542415/237bf6e273819abce5802731b71e0f90_400x400.jpeg',
  email: 'clay@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Katy Perry',
  dob: 'Mar-06-1981',
  profileImage: 'http://cp91279.biography.com/1000509261001/1000509261001_2051017820001_Bio-Biography-Katy-Perry-SF.jpg',
  email: 'katy@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Jhene Aiko',
  dob: 'Feb-02-1989',
  profileImage: 'http://www.olisa.tv/wp-content/uploads/2016/08/jhene-aiko.jpg',
  email: 'jhene@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'future',
  dob: 'Mar-06-1981',
  profileImage: 'http://thehollywoodunlocked.com/wp-content/uploads/2016/07/kQXgKE9.png',
  email: 'future@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Ke$ha',
  dob: 'Feb-02-1989',
  profileImage: 'http://www.pianohelp.net/pictures/Ke$ha.jpg',
  email: 'kesha@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lil Mama',
  dob: 'Feb-02-1989',
  profileImage: 'http://thesource.com/wp-content/uploads/2015/11/Lil-Mama-3.jpg',
  email: 'mama@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lil Yachty',
  dob: 'Mar-06-1981',
  profileImage: 'http://thefader-res.cloudinary.com/images/c_limit,w_1024/c_crop,h_392,w_753,x_145,y_75,f_auto,q_auto:best/90341C2-R01-006_cuwfd7/90341C2-R01-006_cuwfd7.jpg',
  email: 'yachty@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Shakira',
  dob: 'Feb-02-1989',
  profileImage: 'http://www.billboard.com/files/styles/article_main_image/public/media/shakira-barcelona-portrait-billboard-650.jpg',
  email: 'shakira@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
}],(err, users) => {
  if(err) console.log('There was an error creating users', err);
  console.log(users[0]);
  console.log(`${users.length} users created!`);
  mongoose.connection.close();
});
