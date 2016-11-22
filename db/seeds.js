const mongoose = require('mongoose');
const db = require('../config/db');
const User = require('../models/user');
const Food = require('../models/food');

mongoose.connect(db.uri);

User.collection.drop();
Food.collection.drop();

Food.create([{
  name: 'McDONALD\'S, Premium Grilled Chicken Classic Sandwich',
  kcal: 183,
  date: '19/11/2016'
},{
  name: 'McDONALD\'S, Sausage McGRIDDLES',
  kcal: 312,
  date: '20/11/2016'
},{
  name: 'POPEYES, Fried Chicken, Mild, Drumstick, meat and skin with breading',
  kcal: 293,
  date: '22/11/2016'
}],(err, foods) => {
  if(err) console.log('There was an error creating foods', err);
  console.log(foods[0]);
  console.log(`${foods.length} foods created!`);
  mongoose.connection.close();
});

User.create([{
  username: 'Wonder Woman',
  dob: 'June-01-1690',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/6eaa3180-b03d-11e6-9e59-8d3fc3665941.jpeg',
  email: 'wonder@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Goku',
  dob: 'September-03-1270',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/c1c59070-b03e-11e6-ac88-3d4977f73f0c.jpeg',
  email: 'goku@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Pixie Lot',
  dob: 'December-03-1970',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/4b43c6a0-b03f-11e6-870f-651eed4d1196.jpeg',
  email: 'pixie@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Margaret Thatcher',
  dob: 'October-03-1870',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/fc41ae90-b03f-11e6-9ae8-815fec3992cc.jpeg',
  email: 'margaret@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Michelle Keegan',
  dob: 'Febuary-04-1769',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/c2868490-b040-11e6-ab87-fd8b160cc0d5.jpeg',
  email: 'michelle@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Megan Fox',
  dob: 'August-01-1669',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/c431f530-b041-11e6-8620-eb740cf2eec7.jpeg',
  email: 'megan@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lilly Savage',
  dob: 'April-01-1257',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/0ed096a0-b042-11e6-bd68-7974e347e80d.jpeg',
  email: 'lilly@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Buzz Lightyear',
  dob: 'November-12-2000',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/74c35fb0-b042-11e6-ada6-69262ce4d582.jpeg',
  email: 'buzz@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Curtis Osano',
  dob: 'March-08-1987',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/cb5a4640-b042-11e6-94ac-8b620f3e732a.jpeg',
  email: 'curtis@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Tupac',
  dob: 'April-29-1782',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/7fd80620-b043-11e6-b3ca-b13143c9d9f6.jpeg',
  email: 'tupac@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -12
},{
  username: 'Sanka',
  dob: 'May-29-1493',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/d9436970-b043-11e6-87e6-dd0d453184bc.jpeg',
  email: 'sanka@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -27
},{
  username: 'Aaron',
  dob: 'May-29-1453',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/496dff8cfc4d9c825049146348d40688.gif',
  email: 'aaron@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -10000000
},{
  username: 'Elliot Brock',
  dob: 'December-15-1994',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/01151650-b045-11e6-a035-45f1c28fa0b8.jpeg',
  email: 'elliot@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  dailyGoal: []
},{
  username: 'Will Whitmey',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/4e88f7d0-b045-11e6-bba2-1180ac52a56e.jpeg',
  email: 'will@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2',
  score: -69
},{
  username: 'Drake',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/836a69c0-b045-11e6-8c77-a76000356395.jpeg',
  email: 'drake@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Dikembe Mutombo',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/baa5aa30-b045-11e6-834e-7124537571fa.jpeg',
  email: 'dikembe@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'McLovin',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/09acfcf0-b046-11e6-9052-4fa8775f8957.jpeg',
  email: 'mclovin@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Beyonce',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/4bd8d680-b046-11e6-8be2-b1a9658a1386.jpeg',
  email: 'beyonce@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Rihanna',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/7de68f00-b046-11e6-b98a-e1f1b1d8d220.jpeg',
  email: 'rihanna@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Serena',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/e0ad1e60-b046-11e6-995a-5bf3de08e6ba.gif',
  email: 'serena@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Kanye West',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/1daf4090-b047-11e6-8263-11e4429ec7ad.jpeg',
  email: 'kanye@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Amber Rose',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/880033a0-b047-11e6-a0f4-b97b3366e895.jpeg',
  email: 'amber@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Jaden Smith',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/ce327a40-b047-11e6-9e0c-c18d7e79f666.jpeg',
  email: 'jaden@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Clay Davis',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/fe68dab0-b047-11e6-b426-cfbbb0cff4bb.jpeg',
  email: 'clay@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Katy Perry',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/41665c20-b048-11e6-9777-553ed2f671ac.jpeg',
  email: 'katy@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Jhene Aiko',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/833ce9c0-b048-11e6-aceb-1f703957f8c3.jpeg',
  email: 'jhene@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'future',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/d1183fa0-b048-11e6-9153-03a2d75928fa.jpeg',
  email: 'future@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Ke$ha',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/1281daa0-b049-11e6-97f4-b38be133b215.jpeg',
  email: 'kesha@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lil Mama',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/6fb56980-b049-11e6-add4-6fb60cf96fdd.jpeg',
  email: 'mama@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Lil Yachty',
  dob: 'Mar-06-1981',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/a7e03a10-b049-11e6-a105-e3b9ffdedd79.jpeg',
  email: 'yachty@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
},{
  username: 'Shakira',
  dob: 'Feb-02-1989',
  profileImage: 'https://s3-eu-west-1.amazonaws.com/wdi-fitness-app/dc232210-b049-11e6-b020-4b159442f410.jpeg',
  email: 'shakira@example.com',
  password: 'hunter2',
  passwordConfirmation: 'hunter2'
}],(err, users) => {
  if(err) console.log('There was an error creating users', err);
  console.log(users[0]);
  console.log(`${users.length} users created!`);
  mongoose.connection.close();
});
