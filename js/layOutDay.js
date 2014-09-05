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
          column:    0,
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
            event.column = 0;
            if(i == 0){
              ++stack;
              row[stack] = [event]; //new event stack;
            }else{
              row[stack].push(event); // add to stack;
            }
            return i;
          }

          //event fits in current column
          if( event.start >= column[i].end ){
            column[i] = event;  // new last event of this column.
            event.column = i;
            row[stack].push(event); // add to the stack/row (number of events)
            return i;
          }

          //check next column.
          ++i
        }

      };

    }

    var cal = new Calendar();

    events.forEach(function(event){
        var eventDeep = cal.add(event);
    });

    return cal;
  }

  // Correctly format calendar and events to be rendered.
  function render(calendar){
    var rows = calendar.getRows(); //Events in the same line;
    var columns = getColumns.length + 1; //Schedule max Column
    var events = [];
    var events_size = (view_width/columns);

    rows.forEach(function(row,rowIt){
      // Place to identify current lenght, verify no collitions magicMethod()
      row.forEach(function(event, eventIt){
        events.push(renderEvent(event));
      });
    });

    function renderEvent(event){
      // "margin-top:120px; event.start
      //  width:50%; row.lenght
      //  height: 60px;
      //  margin-left:33%;
      //  "

      var margintop = event.start + "px";
      var height = event.duration + "px";
      var width = event_size + "px";
      var _ofElement = ( 100 / columns );
      var marginleft = (( event.column * _ofElement ) - _ofElement) + "%";

      var style = "elements";

      var eventHMTL = "<div class='event'>"getRealTime(event.start)"</div>";
      eventHTML.setParam("style",style);

      return eventHTML;

    }


    function getRealTime(time){
      return time;
    }

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
