
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
          column:   0,
          row:      0
        };
    });
  }

  // Create Calendar Strucuture and Add Events to columns.
  function setEvents(events){

    function Calendar(){
      var column = [] , row = [], stack = 0;

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

            if(i == 0){
              ++stack;
              event.column = i;
              event.row = stack;
              row[stack] = [event]; //new event stack;

            }else{
              event.row = stack;
              event.column = i;
              row[stack].push(event); // add to stack;
            }

            column[i] = event;
            return i;
          }

          //event fits in current column
          if( event.start >= column[i].end ){

            if( i == 0 ){
              ++stack;
              event.column = i;
              event.row = stack;
              row[stack] = [event]; //new event stack;
            }else{
              event.row = stack;
              event.column = i;
              row[stack].push(event); // add to the stack/row (number of events)
            }

            column[i] = event;  // new last event of this column.
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

  // Loop thru events and HTML rendered.
  function render(calendar){
    var rows = calendar.getRows(); //Events in the same line;
    var max_columns = calendar.getColumns().length; //Schedule max Column
    var events = [];
    // var events_size = (view_width/columns);
    // var events_inRow;
    var deep = [{start:-1,end:-1}];

    rows.forEach(function(row,rowIt){
      var events_inRow = row.length;

      //if( row[events_inRow-1].column > events_inRow ){ events_inRow = row[events_inRow-1].column }

    //  if(checkForCollision(row,deep)){ events_inRow = max_columns; }

      deep.push({start:row[0].start, end:row[0].end});

      row.forEach(function(event, eventIt){

        if(deep[rowIt].end < event.end) deep[rowIt].end = event.end;
        console.log()
        events.push(renderEvent(event,events_inRow));

      });
    });

    function checkForCollision(row,deep){
      console.log('cfc r d',row,deep);
      for(var i=0;i<deep.length;i++){
        for(var b=0;b<row.length;b++){

          if(deep[i].end > row[b].end){   // if prev row ends after our current row.
             console.log(deep[i] , row[b]);
             return true;
          }


          if(deep[i].end > row[b].start ){ //if current row start before prev is complete.
             console.log(deep[i] , row[b]);
             return true;
          }

        }
      }

      return false;
    }

    function renderEvent(event,realSize){
      var styles = [], _colWidth = ( 100 / realSize );
      var event_size = (view_width/realSize); // change for higher column value + 1

      styles.push('margin-top:'+event.start + "px");
      styles.push('height:'+event.duration + "px");
      styles.push('width:'+ ( event_size ) + "px");
      styles.push('margin-left:'+(( event.column * _colWidth )) + "%");

      styles = styles.join("; ");

      var eventHTML = "<div style='"+styles+"' class='event'>"
                      //  + getRealTime(event.start)
                       +"</div>";
      return eventHTML;

    }

    function getRealTime(time){
      var _hour = Math.round((540 + time)/60) , _min = time % 60;
      if(_min === 0) _min = _min+'0';
      if( _hour > 12) _hour = _hour - 12;
      return _hour +':'+ _min;
    }

    return events.join("");
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
