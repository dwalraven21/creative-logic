// console.log($);
// console.log('modal practice app.js is linked to this index.html');

$( () => {
	// Grabbing About the Game button
const $openBtn = $('#openModal');

// Grabbing modal element
const $modal = $('#modal');

// Grabbing close button
const $closeBtn = $('#close');


//Event Handlers
// Event handler to open the modal
const openModal = () => {
  // $modal.css('display', 'block');
	//Alternate Option: look up the jQuery method .show()
	$modal.show()
}

const closeModal = () => {
  // $modal.css('display', 'none');
	// look up the jQuery method .hide()
	$modal.hide()
}

//Event Listeners
//Add event listener to About the Game button
$openBtn.on('click', openModal);

//Make a setTimeout for the modal to automatically pop-up after 5 seconds.
setTimeout(openModal, 5000);

//Add event listener to Close button
$closeBtn.on('click', closeModal);


});
