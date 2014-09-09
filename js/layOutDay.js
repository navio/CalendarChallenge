
var layOutDay = (function(view_width,view_height){
  "use strict";

  // Check events to be Valid. Remove invalid.
  function validate(events){

    if( toString.call(events) != "[object Array]" ) return []; // Not an array;

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
    return events.map(function(ev,i) {
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

        var i = 0; //column 1;

        while(true){

          //new column.
          if(column[i] === undefined){
            column[i] = event;
            if(i == 0){
              event.column = 0;
              ++stack;
              row[stack] = [event]; //new event stack;
            }else{
              event.column = i;
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
    var columns = calendar.getColumns().length; //Schedule max Column
    var events = [];
    var events_size = (view_width/columns);

    rows.forEach(function(row,rowIt){
      row.forEach(function(event, eventIt){

        events.push(renderEvent(event));
      });
    });

    function renderEvent(event){
      var styles = [];
      var _ofElement = ( 100 / columns );
      styles.push('margin-top:'+event.start + "px");
      styles.push('height:'+event.duration + "px");
      styles.push('width:'+events_size + "px");
      styles.push('margin-left:'+(( event.column * _ofElement )) + "%");


      var style = styles.join(" ");

      var eventHTML = "<div style='"+style+"' class='event'>"+getRealTime(event.start)+"</div>";
      //eventHTML.setParam("style",style);

      return eventHTML;

    }

    function getRealTime(time){
      var _hour = Math.round((540 + time)/60) , _min = time % 60;
      if(_min == 0) _min = _min+'0';
      return _hour +':'+ _min;
    }

    return events;
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

console.log(layOutDay([{start:0,end:120},{start:10,end:120},{start:60,end:120},{start:120,end:220}]));
