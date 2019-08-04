# CreativeLogic

CreativeLogic is an app that allows designers to share their mockup designs with developers and front-end developers to find mockups they would like to build and turn them into live sites. Both the designer and the developer can use the final project as a portfolio piece.

link to live site: https://creative-logic.herokuapp.com

## Motivation

As a developer, I really enjoy building web pages based on pre-existing mockups, but I wish I had more mockups available to me. I am sure many designers are in the same boat. They have a great website design to include in a portfolio, but wouldn't it be great if future clients could see what the live version might look like?

## Deployment

* Deployed with Heroku and MongoDB Atlas

## Tech/frameworks used

* Node.js
* MongoDB / Mongoose
* Express / EJS
* Materialize (CSS framework)
* bcrypt (password hashing function)
* Using RESTful Routs and full CRUD

## Usage

When a user first navigates to CreativeLogic they will be redirected to the login/sign-up page. Upon registration they can select if they are a designer, developer or both (or neither). They will then be taken to a view of all the available mockups. Here the experience will be slightly different for designers vs. developers.

Designers will be able to add new mockups, view all the mockups they have submitted on a separate page, and edit or delete their own mockups. (Designers can ONLY edit or delete their own projects.)

Developers will be able to see which mockups are available for use and which have been selected already by another developer. They can click "Select" on available mockups to view more information and "Request Source Files"

## Features

## Challenges

## Improvements

One improvement I would like to make in the future is to have an additional view for users who are not signed in or registered. I always hate it when a website makes you sign up before you can see anything. I would like users to be able to still interact with the site (in a limited way) before committing to signing up.

## Code Examples

## Author

* **Danielle Walraven** - (https://github.com/dwalraven21)

## Acknowledgments

* Inspiration and images used in prototype were taken from <a href="www.dribbble.com">Dribble</a>.
