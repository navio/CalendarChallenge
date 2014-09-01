var layOutDay = (function(width,height){
  "use strict";

  // Check events to be Valid. Remove invalid.
  function validate(events){

    return events;
  }

  // Sort elements by start date and lenght, return formatted structure.
  function sortAndFormat(events){

    return events;
  }

  // Create Calendar Strucuture and Add Events to it
  function setEvents(events){
    var calendar;

    return calendar;
  }

  //Fix collisions of events happening at the same time
  function fixCollisions(calendar){

    return calendar;
  }

  // Correctly format calendar and events to be rendered.
  function render(calendar){

    return calendar;
  }

  return function readyEvents(events){

    var calendar; // Init.

    // Validate Events
    events = validate(events);

    // Sort and Format
    events = sortAndFormat(events);

    // Add Events to Structure
    calendar = setEvents(events)

    // Find and Fix Collisions
    calendar = fixCollisions(calendar);

    // Return formated data to Render
    return render(calendar);
  };

})(600,720);
