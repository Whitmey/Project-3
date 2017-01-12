   #iTrack
   ___

   ####GA WDI Project Three<br>

   #####Aaron Hall, Curtis Osano, Elliot Mountford-Brock, Will Whitmey<br>
   See iTrack [here](https://i-track.herokuapp.com/#/)

   ---
   ![Imgur](http://i.imgur.com/srZk1Ku.png)
   <br>

   ###Overview
   For this collaborative project, the brief was to produce a MEAN stack app, hosted on Heroku. We chose to build an app where users could track their fitness goals and finances. The idea was for the user to input meals, purchases etc and this data is consequently compiled and displayed back to them through various charts and graphs.



   ###Aim
   * To build a full stack application from scratch, using MongoDB, Express, JavaScript, AngularJS, HTML and SCSS
   * To include at least two models(including a user model)
   * To implement full RESTful routes for at least one resource
   * To produce a working API built by the whole team
   * To include at least one embedded or referenced sub-document
   * To implement thoughtful planning and wire-framing to achieve satisfactory user journey and determine MVP
   * To have a working app by deadline, deployed to Heroku
   * To present our project to the rest of the group, talking through the final product as well as the working process

   ###Process
   * Initially, we had a group discussion to throw some ideas around and generate some plans
   * Once we had my project decided, we began wireframing as a group and figured out the user journey
   * Next we created a Trello board to plan our steps, ordered by priority using a traffic light system. We assigned cards to each team member so everyone had a clear idea of what their initial targets were, and the workload was shared equally
   * We created a back end using MongoDB and Express
   * Once the back-end was complete, we tested RESTful routes were all working (with authentication) using Insomnia
   * Next we began to build the front-end using JavaScript and AngularJS
   * Once we had our basic app up and running on the front-end, we decided to add further functionality by integrating the USDA Agricultural API so that users could search for real food items and add these to their records rather than manually entering data each time. This meant accurate detailed nutritional breakdowns of each meal could stored and displayed to the user
   * We added the Skeleton framework and began to style our app
   * We spent the last day adding finishing touches to styling and bug-fixing/testing

   ###Biggest wins
   * Incorporating the USDA nutritional API to give real data to our food items
   * Extracting the data from the USDA results and creating functions to create day items in JavaScript where info could be compiled for each object based on the dates they were entered

   ###Challenges faced
   * The biggest challenge we faced was the initial scope of the project which we set ourselves. In hindsight, we struggled to acheive the target we had set ourselves within the short project week. This meant we had to scale down certain features to acheive a working MVP, but shells of unfinished features still remain
   * A four-member group meant we had to work efficiently and cohesively as a team. Using agile methodologies, we shared our progress in stand ups each day, merged changes through GIT as a group and split into teams of two to tackle larger problems more effectively

   ###Steps for improvement
   * Now we have a working MVP, it would be nice to add in full functionality for the features we were unable to finish, such as following other users, the leaderboard and goal systems and developing the finance sectino of the app to match the scale and success of the nutritional side of the site
   * We would like to redesign the app at some point to be more tailored for mobile use as it's an app that would be useful when on the move
