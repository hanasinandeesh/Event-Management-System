document.addEventListener('DOMContentLoaded', async () => {
    try {
      const response = await fetch('/events');
      const events = await response.json();
  
      const tableBody = document.getElementById('event-table-body');
      tableBody.innerHTML = ''; // Clear any existing rows
  
      events.forEach(event => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${event.title}</td>
          <td>${event.description}</td>
          <td>${new Date(event.date).toLocaleDateString()}</td>
          <td>${event.location}</td>
          <td>${event.type}</td>
          <td>
            <button onclick="editEvent('${event._id}')">Edit</button>
            <button onclick="deleteEvent('${event._id}')">Delete</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  });
  
  function editEvent(id) {
    fetch(`/events/${id}`)
      .then(response => response.json())
      .then(event => {
        document.getElementById('edit-event-id').value = event._id;
        document.getElementById('edit-title').value = event.title;
        document.getElementById('edit-description').value = event.description;
        document.getElementById('edit-date').value = event.date.split('T')[0];
        document.getElementById('edit-location').value = event.location;
        document.getElementById('edit-type').value = event.type;
        
        document.getElementById('edit-modal').style.display = 'block';
      })
      .catch(error => console.error('Error fetching event:', error));
  }
  
  function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
  }
  
  document.getElementById('edit-event-form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const id = document.getElementById('edit-event-id').value;
    const updatedEvent = {
      title: document.getElementById('edit-title').value,
      description: document.getElementById('edit-description').value,
      date: document.getElementById('edit-date').value,
      location: document.getElementById('edit-location').value,
      type: document.getElementById('edit-type').value,
    };
  
    fetch(`/events/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        location.reload(); // Refresh the dashboard to reflect changes
      } else {
        alert('Error updating event');
      }
    })
    .catch(error => console.error('Error updating event:', error));
  });
  
  function deleteEvent(id) {
    if (confirm('Are you sure you want to delete this event?')) {
      fetch(`/events/${id}`, {
        method: 'DELETE',
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert(data.message);
          location.reload(); // Refresh the dashboard to reflect changes
        } else {
          alert('Error deleting event');
        }
      })
      .catch(error => console.error('Error deleting event:', error));
    }
  }
  