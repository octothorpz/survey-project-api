```I.M.O
======

I.M.O ('In My Opinion') is a survey application that allows users to login to create, update, and delete surveys of their own along with allowing them to take other people's surveys.

Technologies Used
------

Express, MongoDB, Mongoose, HTML, CSS, JavaScript, jQuery, Bootstrap, and Handlebars

Links
------
* Front-End Repo: https://github.com/octothorpz/survey-project-client
* Back-End Repo: https://github.com/octothorpz/survey-project-api
* Deployed Front-End: https://octothorpz.github.io/survey-project-client/
* Deployed Back-End: https://glacial-coast-67645.herokuapp.com

User Stories
------

* As a new user, I can sign up for the application using an email and password.
* As a signed up user, I can use my credentials to sign in to the application.
* As a signed in user, I can change my password.
* As a signed in user, I can sign out.
* As a signed in user, I can create a new survey.
* As a signed in user, I can update my surveys.
* As a signed in user, I can delete my surveys.
* As a signed in user, I can see all surveys created by me and other users.
* As a signed in user, I can take all surveys created by me and other users.

Wireframe
------
https://i.imgur.com/kaB7bha.jpg

Entity Relationship Diagram
------
https://i.imgur.com/vl3Do3a.jpg

API Paths & Methods
------
### Authentication

| Method   | URL
|--------|------------------------
| POST   | `/sign-up`
| POST   | `/sign-in`
| PATCH  | `/change-password/`
| DELETE | `/sign-out/`

### Surveys

| Method   | URL
|--------|------------------------
| POST   | `/surveys`
| GET    | `/surveys`
| GET    | `/surveys/:id`
| PATCH  | `/surveys/:id`
| DELETE | `/surveys/:id`

### Answers

| Method   | URL
|--------|------------------------
| POST   | `/answers`
| GET    | `/answers`

Planning
------
* Reviewed project requirements before writing code
* Created and reviewed a wireframe and ERD
* Held a daily SCRUM meeting to discuss accomplishments, roadblocks, and daily goals

Process
------
* Heavily utilized pair and group programming with rotating leaders
* Kept a running list of outstanding tasks to tackle
* Used curl scripts to test API before creating and styling HTML forms
* Methodically worked on code feature-by-feature
* Tested code thoroughly after each new feature was added
* Reviewed each pull request as a group to avoid merge conflicts

Problem-Solving Strategy
------

* Utilized online resources such as StackOverflow to investigate ways to resolve issues
* Pinpointed issues by using debugger and console.log
* Discussed and resolved code issues among group members
* Worked together as much as possible through pair and group programming
* Submitted inquiries to the General Assembly Project Issue queue to request assistance from instructors

Plans for Future Improvements
------
* Improve UI to make the application more intuitive and improve user experience
* Display aggregate survey results in a pie or bar chart

Team
------
* [Sarah Hale](https://github.com/sars604)
* [Natalyn Yu](https://github.com/natalynyu)
* [Greg Smith](https://github.com/g-walkersmith4492)
* [Anthony Palmoze](https://github.com/Palmoze5)```
Message Input


Message Sarah Hale, Natalyn Yu, Greg Smith
