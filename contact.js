const do_contact = (event) => {
    event.preventDefault();
        // Get form input values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        // Create data object to send to the server
        const formData = {
            name:name,
            phone:phone,
            problem:message,
        };
        console.log(formData);
        fetch('https://dish-discovery-backend.onrender.com/do_contact/',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Message sent successfully:', data);
            alert('Message sent successfully!');
        })
        .catch(error => {
            console.error('Error sending message:', error);
            alert('Error sending message. Please try again later.');
        });
        contactForm.reset();
    };
document.getElementById("contact-btn").addEventListener("click", do_contact);