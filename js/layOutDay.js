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

    // sorting by start time and duration of event.
    events.sort(function(a,b){
      if((a.start - b.start) === 0) {
        return b.end - a.end;
      } else {
        return a.start - b.start;
      }
    });

    // Set format for easy location.
    return items.map(function(ev,i) {
        return {
          start:    ev.start,
          end:      ev.end,
          duration: ev.end - ev.start,
          id:       i,
          level:    0,
          row:      0
        };
    });
  }

  // Create Calendar Strucuture and Add Events to it
  function setEvents(events){

    function Calendar(){
      var column = [] , row = [], stack = -1;

      this.getRows =
      function(){
        return row;
      };

      this.getColumns =
      function(){
        return column
      };

      this.add =
      function(event){

        var i = 0;
        while(true){

          //new column.
          if(column[i] === undefined){
            column[i] = event;
            if(i == 0){
              ++stack;
              row[stack] = [event]; //new event stack;
            }else{
              row[stack].push(event);
            }
            return true;
          }

          //event fits in current column
          if( event.start >= column[i].end ){
            column[i] = event;  // column where its added.
            row[stack].push(event); // add to the stack (number of events)
            return true;
          }

          //check next column.
          ++i
        }

      };

    }

    var cal = new Calendar();

    events.forEach(function(event){
        cal.add(event);
    });

    return cal;
  }

  // Correctly format calendar and events to be rendered.
  function render(calendar){
    rows = calendar.getRows(), num_coumns = getColumns;

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
