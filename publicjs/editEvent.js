// document.addEventListener('DOMContentLoaded', async () => {
//     const params = new URLSearchParams(window.location.search);
//     const eventId = params.get('id');
    
//     if (!eventId) {
//       alert('Event ID is missing');
//       return;
//     }
    
//     try {
//       const response = await fetch(`/events/${eventId}`);
//       const event = await response.json();
  
//       if (!event) {
//         alert('Event not found');
//         return;
//       }
  
//       document.getElementById('event-id').value = event._id;
//       document.getElementById('title').value = event.title;
//       document.getElementById('description').value = event.description;
//       document.getElementById('date').value = new Date(event.date).toISOString().split('T')[0];
//       document.getElementById('location').value = event.location;
//       document.getElementById('type').value = event.type;
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while fetching event details.');
//     }
  
//     document.getElementById('edit-event-form').addEventListener('submit', async (event) => {
//       event.preventDefault();
  
//       const formData = new FormData(event.target);
//       const data = {
//         title: formData.get('title'),
//         description: formData.get('description'),
//         date: formData.get('date'),
//         location: formData.get('location'),
//         type: formData.get('type')
//       };
  
//       try {
//         const response = await fetch(`/events/${document.getElementById('event-id').value}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//         });
  
//         const result = await response.json();
  
//         if (response.ok) {
//           alert('Event successfully updated');
//           window.location.href = '/dashboard';
//         } else {
//           alert(result.message || 'Error updating event');
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while updating the event.');
//       }
//     });
//   });
  


document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');
  
    try {
      const response = await fetch(`/api/events/${eventId}`);
      const event = await response.json();
  
      document.getElementById('event-id').value = event._id;
      document.getElementById('title').value = event.title;
      document.getElementById('description').value = event.description;
      document.getElementById('date').value = new Date(event.date).toISOString().split('T')[0];
      document.getElementById('location').value = event.location;
      document.getElementById('type').value = event.type;
    } catch (error) {
      console.error('Error loading event:', error);
    }
  });
  
  document.getElementById('edit-event-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const id = document.getElementById('event-id').value;
    const updatedEvent = {
      title: document.getElementById('title').value,
      description: document.getElementById('description').value,
      date: document.getElementById('date').value,
      location: document.getElementById('location').value,
      type: document.getElementById('type').value
    };
  
    try {
      await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedEvent)
      });
  
      alert('Event updated successfully!');
      window.location.href = '/dashboard.html';
    } catch (error) {
      console.error('Error updating event:', error);
    }
  });
  