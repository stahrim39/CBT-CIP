
  // Function to save events to localStorage
const saveEvents = () => {
    const events = document.getElementById("events").innerHTML;
    localStorage.setItem("events", events);
  };
  
  // Function to load events from localStorage
  const loadEvents = () => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      document.getElementById("events").innerHTML = savedEvents;
      addDeleteListeners();  // Reattach delete buttons after loading
    }
  };
  
  // Function to add a delete button to each event
  const addDeleteButton = (eventItem) => {
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.style.marginLeft = "10px";
    deleteButton.addEventListener("click", function () {
      eventItem.remove();
      saveEvents();  // Save updated events after deletion
    });
    eventItem.appendChild(deleteButton);
  };
  
  // Function to add event creation functionality
  document.getElementById("event-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("event-name").value;
    const date = document.getElementById("event-date").value;
    const time = document.getElementById("event-time").value;
    const location = document.getElementById("event-location").value;
  
    // Create a new event item
    const eventItem = document.createElement("li");
    eventItem.innerHTML = `<strong>${name}</strong> <br> ${date} at ${time} <br> Location: ${location}`;
  
    // Add the delete button to the new event
    addDeleteButton(eventItem);
  
    // Append the new event to the event list
    document.getElementById("events").appendChild(eventItem);
  
    // Reset the form
    document.getElementById("event-form").reset();
  
    // Save the updated event list to localStorage
    saveEvents();
  });
  
  // Function to filter events based on the search query
  const filterEvents = (query) => {
    const events = document.querySelectorAll("#events li");
    events.forEach(event => {
      if (event.textContent.toLowerCase().includes(query.toLowerCase())) {
        event.style.display = "";
      } else {
        event.style.display = "none";
      }
    });
  };
  
  // Add event listener for the search box
  document.getElementById("search-box").addEventListener("input", function () {
    filterEvents(this.value);
  });
  
  // Reattach delete buttons to events loaded from localStorage
  const addDeleteListeners = () => {
    const eventItems = document.querySelectorAll("#events li");
    eventItems.forEach(addDeleteButton);
  };
  
  // Load saved events when the page loads
  window.onload = () => {
    loadEvents();
  };
  