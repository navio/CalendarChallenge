var layOutDay = (function(view_width,view_height){
  "use strict";

  // Check events to be Valid. Remove invalid.
  function validate(events){

    if( toString.call(event) != "[object Array]" ) return []; // Not an array;

    // Remove invalid elements.
    events.filter(function(el){

      if( el.start === undefined ) return false;

      if( el.end === undefined ) return false;

      if( el.start > view_height ) return false; //out of view

      if( el.start > el.end ) return false; //invalid time

    });
    // Returning Valid Events | @create a list of invalid.
    return events;
  }

  // Sort elements by start date and lenght, return formatted structure.
  function sortAndFormat(events){

    // sorting by start time.
    events.sort(function(a,b){
      if (a.value < b.value) return 1;
      return 0
    });

    // Set format for easy location.
    format_events = [];
    items.forEach(function(ev,i){

      var element =
        {
          start:    ev.start,
          end:      ev.end,
          duration: ev.end - ev.start,
          id:       i,
          level:    0,
          row:      0
        };

      format_events.push(element);

    });

    return format_events;
  }

  // Create Calendar Strucuture and Add Events to it
  function setEvents(events){

    function calendar(){
      var column = [] , events = [] , row = 0

      function add(event){
        event.level = whichColumn(event);
        event.row = row;
        events.push(level);
      }

      function getEvents(){
        return events;
      }

      function whichColumn(event){

        var i = 0;
        while(true){

          //new column.
          if(column[i] === undefined){
            column[i] = event.end;
            if(i == 0) ++row; //new row
            return i;
          }

          //event fits in current column
          if( event.start > column[i] && event.end > column[i] ){
            column[i] = event.end;
            return i;
          }

          //check next column.
          ++i
        }

      }

    }

    var cal = calendar();

    events.forEach(function(event){
        cal.add(event);
    });

    return cal.getEvents();
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

    // Return formated data to Render
    return render(calendar);
  };

})(600,720);
