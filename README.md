# CreativeLogic

CreativeLogic is an app that allows designers to share their mockup designs with developers and front-end developers to find mockups they would like to build and turn them into live sites. Both the designer and the developer can use the final project as a portfolio piece.

link to live site: https://creative-logic.herokuapp.com

## Motivation

As a developer, I really enjoy building web pages based on pre-existing mockups, but I wish I had more mockups available to me. I am sure many designers are in the same boat. They have a great website design to include in a portfolio, but wouldn't it be great if future clients could see what the live version might look like?

## Usage

When a user first navigates to CreativeLogic they will be redirected to the login/sign-up page. Upon registration they can select if they are a designer, developer or both (or neither). They will then be taken to a view of all the available mockups. Here the experience will be slightly different for designers vs. developers.

Designers will be able to add new mockups, view all the mockups they have submitted on a separate page, and edit or delete their own mockups. (Designers can ONLY edit or delete their own projects.)

Developers will be able to see which mockups are available for use and which have already been selected by another developer. They can click "Select" on available mockups to view more information and "Request Source Files" to email the designer directly. I would like to eventually move the messaging feature to be hosted within the app, instead of over email.

## Just For Fun

In the process of testing this app and creating numerous fake accounts with designer/developer attributes, I ran into a very annoying problem of continuously entering incorrect usernames and passwords. I decided to take this issue and make it more fun by adding some special pages for these login errors.

![Screencast](http://g.recordit.co/IzLXGK7SB9.gif)

## Challenges

One challenge was creating logic so that certain parts of the site would only be displayed for certain users. I handled this by having the user provide some information upon registration (designer and/or developer status) and then storing that in a user schema. Then I used if statements in my ejs files to display those special features only if the current user had a value of true for designer or developer (depending on the feature).

I also wanted to take some information from the user (email and username) and store that in my mockup schema whenever the user created a new mockup. I needed to do this for multiple reasons:

1. To allow the content creator to edit and delete their own projects, but not allow users to delete or edit projects they don't own.
2. To display a special page for designers to view only their own projects
3. To allow developers to contact the designer for any particular mockup and request source files and permission to build the mockup.

Here us the Post/Create Route I used to create a new user:

```JavaScript
users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
	if (req.body.designer === "on") {
		req.body.designer = true
	} else {
		req.body.designer = false
	}
	if (req.body.developer === "on") {
		req.body.developer = true
	} else {
		req.body.developer = false
	}

	User.create(req.body, (err, createUser) => {
		if (err) {
			console.log(err);
		} else {
			Mockup.find({}, (error, allMockups) => {
				req.session.currentUser = req.body
				res.render('index.ejs', {
				currentUser: req.session.currentUser,
				mockups: allMockups
			})
	    })
	  }
	})
})
```
And here is how I grabbed that username/email info from them when they created a mockup:

```JavaScript
designers.post('/', (req, res) => {
	req.body.author = req.session.currentUser.username;
	req.body.email = req.session.currentUser.email;
	Mockup.create(req.body, () => {
		Mockup.find({}, (error, allMockups) => {
		res.render('myprojects.ejs', {
			currentUser: req.session.currentUser,
			mockups: allMockups
		});
	  });
	})
})
```

Finally, all of this is meaningless if I don't utilize some logic in my ejs files to check the username and use the email:

```ejs
<%	if (currentUser.developer === true && currentUser.username !== mockup.author) { %>
    <p><b>This mockup is available for use.</b></p><br>
	<a href="mailto:<%=mockup.email%>?subject=CreativeLogic%20Source%20Files%20Request" class="range-text text-lighten-3">Request Source Files</a><br><br>
<% } %>
```

Here is some more logic to display Delete and Edit buttons, only for the mockup creator or "author"

```ejs
<% if(currentUser.username === mockup.author){ %>
	<div class="row">
		<div class="col">
			<form action='/designers/<%=mockup.id%>?_method=DELETE' method="POST">
			<input type="submit" value="DELETE" class="waves-effect waves-light btn orange"/>
			</form>
		</div>
		<div class="col">
			<a href="/designers/<%=mockup.id%>/edit" class="waves-effect waves-light btn orange">Edit</a>
		</div>
	</div>
<% } %>
```

## Improvements

One improvement I would like to make in the future is to have an additional view for users who are not signed in or registered. I always hate it when a website makes you sign up before you can see anything. I would like users to be able to still interact with the site (in a limited way) before committing to signing up.

Another improvement would be to allow messaging between the designers and developers within the app, instead of over email. There could also be a button that the designer could click when the developer requests source files, that would simultaneously allow the developer to download source files, mark the project as "currently being built" and put the project in the developer's project section. Currently the designers can view their mockups, but developers can't view ones they are developing. This would require another key-object pair in my mockups schema for the developer's username so I can allow that user access to those elements.

## Deployment

* Deployed with Heroku and MongoDB Atlas

## Tech/frameworks used

* Node.js
* MongoDB / Mongoose
* Express / EJS
* Materialize (CSS framework)
* bcrypt (password hashing function)
* Using RESTful Routes and full CRUD

## Author

* **Danielle Walraven** - (https://github.com/dwalraven21)

## Acknowledgments

* Inspiration and images used in prototype were taken from <a href="www.dribbble.com">Dribbble</a>.
