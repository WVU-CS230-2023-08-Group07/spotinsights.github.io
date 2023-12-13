window.addEventListener('DOMContentLoaded', domLoaded); // Call domLoaded() when DOM is loaded

function domLoaded() {
	emailjs.init('vYxoNopTF_gypGcOj'); // Initialize email.js (with public key)
	
	// Get HTML elements
	const form = document.getElementById('contact-form');
	const button = document.getElementById('submit');
	const status = document.getElementById('status-message');
	
	const recipient = 'spotinsightscontact@gmail.com'; // Email to recieve contact forms
	
	button.addEventListener('click', (event) => {
		event.preventDefault(); // Prevent default form submission
		
		// Get HTML form elements
		const nameForm = document.getElementById('name').value;
		const emailForm = document.getElementById('email').value;
		const messageForm = document.getElementById('message').value;
		
		// Check inputs
		console.log('Name:', nameForm);
		console.log('Email:', emailForm);
		console.log('Message:', messageForm);
		
		// Check if any fields are empty
		if (nameForm === '' || emailForm === '' || messageForm === '') {
			status.innerText = 'Please enter all fields';
		}
		else {
			status.innerText = 'Sending...';
			form.reset(); // Clear form inputs
			
			// Fill template parameters
			const templateParams = {
				to_email: [recipient],
				from_email: [emailForm],
				from_name: [nameForm],
				message: [messageForm],
			};
			
			// Send email using email.js (using service ID, template ID, and template parameters)
			emailjs.send('service_26ew3a9', 'template_4riqapc', templateParams)
				.then(response => {
					status.innerText = 'Email sent successfully!';
					console.log('Email sent successfully:', response);
				})
				.catch(error => {
					status.innerText = 'Error sending email';
					console.log('Error sending email:', error);
				});
		}
	});
}
