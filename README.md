# CreativeLogic

CreativeLogic is an app that allows designers to share their mockup designs with developers and front-end developers to find mockups they would like to build and turn them into live sites. Both the designer and the developer can use the final project as a portfolio piece.

link to live site: https://creative-logic.herokuapp.com

## Motivation

As a developer, I really enjoy building web pages based on pre-existing mockups, but I wish I had more mockups available to me. I am sure many designers are in the same boat. They have a great website design to include in a portfolio, but wouldn't it be great if future clients could see what the live version might look like?

## User Story

When a user first navigates to CreativeLogic they will be redirected to the login/sign-up page. Upon registration they can select if they are a designer, developer or both (or neither). They will then be taken to a view of all the available mockups. Here the experience will be slightly different for designers vs. developers.

### Designers

Designers will be able to add new mockups, view all the mockups they have submitted on a separate page, and edit or delete their own mockups. (Designers can ONLY edit or delete their own projects.)

![Screencast](http://g.recordit.co/iNuZRr2jKb.gif)

### Developers

Developers will be able to see which mockups are available for use and which have already been selected by another developer. They can click "Select" on available mockups to view more information and "Request Source Files" to message the designer through the app. They can also view projects on which they are already the developer on a separate page.

![Screencast](http://g.recordit.co/HO9uA7QkwZ.gif)

### Build Requests

When the designer receives a developer's request, they can reject it or accept it (sending a message and link to source files to the developer). By clicking "accept", the status of the mockup will automatically be updated to "Selected". Other developers will now see that the mockup is no longer available to them. The developer who made the request will also now be given limited permission to edit the mockup. They can't edit the title, description or image as the designer can, but once they have finished with the build, they can edit the status to "built" and provide a live URL.

Once this happens, the designer should receive a notification that the site is live! The live URL is also available to view by other members of the CreativeLogic community.

## Just For Fun

In the process of testing this app and creating numerous fake accounts with designer/developer attributes, I ran into a very annoying problem of continuously entering incorrect usernames and passwords. I decided to take this issue and make it more fun by adding some special pages for these login errors.

![Screencast](http://g.recordit.co/5JmtaMjZ0L.gif)

## Challenges

When I build this app I initially set it up so that when the developer clicked "Request Source Files", an email opened up with the designer's email in the "to" line and "CreativeLogic Request for Source Files" in the "subject" line. I was pretty proud of myself.

But then I thought, "how cool would it be if instead of just sending an email, the requester could message the designer through the app itself, and I could create some functionality to update the status of the mockup automatically as this was happening?"

Did I bite off more than I could chew?

To that I answer, "mmmmell mmmammmbe".

The messaging feature ended up being far more challenging to build than the rest of the app, simply because there were so many layers to it.

Let's take the example of the designer seeing the request in their inbox and clicking "Accept".

![Screencast](http://g.recordit.co/fug6ljMWex.gif)

Well first, I want the designer to go to message form, so they can send a reply and add the source files link.

```JavaScript
// NEW - GET
// When a user clicks to accept a developers request
// They will be taken to form page to submit the message
messages.get('/:id/accept', (req, res) => {
	Message.findById(req.params.id, (err, foundMessage)=>{
	// first we need some info about the mockup
		Mockup.findById(foundMessage.mockup, (err, foundMockup)=>{
			if (req.session.currentUser){
				res.render('messages/accept.ejs', {
					// we need to send the message back to the original message sender
					message: foundMessage,
					// we need to know what mockup this is in reference to
					// so we can update the staus to "selected" and add the developer username
					mockup: foundMockup,
					// we need to know who the current sender is
					currentUser: req.session.currentUser,
				})
			} else {
				res.redirect('/sessions/new');
			}
		})
	})
})

```
I also added some hidden inputs on my form, so that the designer doesn't need to see or input this information, but it would still be collected.

```ejs

<input type="hidden" name="recipient" value="<%= message.sender %>">
<input type="hidden" name="sender" value="<%= message.recipient %>">
<input type="hidden" name="mockup" value="<%= message.mockup %>">
<input type="hidden" name="messageType" value="accept">
<input type="hidden" name="selected" value="true">
<input type="hidden" name="developer" value="<%= message.sender %>">

```
message.mockup was yet another key that I created earlier which stored the mockup id that was being referenced in the message

Finally, when the user clicks "Accept and Reply", three things need to happen:
1. The developer needs to receive a new message letting them know they've been accepted and providing the source files link
2. The status of the mockup needs to change to "selected", so that other developers know it is no longer available
3. The developer needs to be added to the mockup so that they have permission to add updates to the project including a live URL when the site is completed.

```JavaScript
// UPDATE - PUT
// When a user clicks Accept and Reply (submits the form)
// Dev gets a reply message including source files
// Note: this is the Message id, not the Mockup id
messages.put('/:id/accept', (req, res) => {

	Message.create(req.body, (error, newMessage) => {
		console.log(newMessage);
		console.log(error);
		// We are updating the mockup with new info
		Mockup.findByIdAndUpdate(newMessage.mockup, req.body, {new: true}, (err, updatedModel)=>{
			if (req.session.currentUser){
				// Send user back to messages
				res.redirect('/messages')
			} else {
				res.redirect('/sessions/new');
			}
		})
	})
})

```
Whew! That's a lot of functionality for one button. And the user should be unaware of almost all of it. The best UX is the one that's invisible.

## Improvements

One improvement I would like to make in the future is to have an additional view for users who are not signed in or registered. I always hate it when a website makes you sign up before you can see anything. I would like users to be able to still interact with the site (in a limited way) before committing to signing up.

Another improvement would be to make the messaging part of the app a little nicer looking. I would love to change the inbox view to display just the subject and date of each message and allow the user to click to open the full message as an accordion or modal. I would also love to have some sort of indication when the message has been read, but I didn't have time to accomplish all of this in four days.

Finally, as it stands now, the rejection button just deletes the message, and doesn't give any feedback to the requester, besides the message being removed from their outbox. (I mean... Facebook doesn't tell you if your friend request was accepted right?) One update I might make, is to provide a gentle rejection notice to the requester when this happens, "The designer has decided to go in a different direction. Your request was not accepted at this time.", or something so the requester at least knows what happened.

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
