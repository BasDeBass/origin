var eventListStart = [];
var eventListEnd = [];
var eventList = [];


function calandarsetter(){
  $('#calendar').fullCalendar({
    defaultView: 'agendaWeek',
      themeSystem: 'bootstrap3',
      //contentHeight: 6000,
      //defaultDate: '2018-08-05',
      slotDuration:'00:15:00',
      editable: false,
      eventLimit: true, // allow "more" link when too many events
      header: {
        left:   'title',
        center: '',
        right:  'today, prev,next'
      },
      buttonText: {
        today:    'today',
        month:    'month',
        week:     'week',
        day:      'day',
        list:     'list',
        prev: 'prev',
        next: 'next'
      },
      events: (start, end, timezone, callback) => {
        var events = [];
        for(let data of eventList){
          events.push(data);
        }
        //events.push();
        callback(events);
      },
      eventClick: function(calEvent, jsEvent, view) {

        alert('Event: ' + calEvent.subject);
        alert(calEvent.teacher);
        alert(calEvent.location);
        alert(calEvent.locationst);

        // change the border color just for fun
        $(this).css('border-color', 'red');
      }
    });
  
  console.log(eventList);
}

function getZermelo(){
  console.log(getMonday(new Date()).getTime()/1000); // Mon Nov 08 2010
  var unixtime = parseInt(getMonday(new Date()).getTime()/1000);
  //var unixtime = Date.parse("23-8-2018").getTime()/1000
  var unixtime1 = parseInt(getSunday(new Date()).getTime()/1000);
  //var unixtime1 = Date.parse("26-8-2018").getTime()/1000;
  //var unixtime1 = "453959"
  console.log(unixtime);
  console.log(UnixToTime(unixtime));
  console.log(UnixToTime(unixtime1));
  console.log(moment.unix(parseInt(getMonday(new Date()).getTime()/1000)).format('d, M, Y h:mm:ss A'));//////////////////////dit!!!!!!
  console.log(moment.unix(parseInt(getSunday(new Date()).getTime()/1000)).format('dddd, MMMM Do, YYYY h:mm:ss A'));
  var Message = `https://nsg.zportal.nl/api/v3/appointments?user=~me&start=${unixtime}&end=${unixtime1}&access_token=e3tub6a2ai8g18uq77b2p6tc8g`
  get(Message, "");
  console.log(Message);
  //calandarsetter();
}

function post(message, data){
  $.ajax({
    method: "POST", // Vul hier POST of GET in
    url: message,
    cache: false,
    data: data
  })
    .done(function(result) {
      return result;
  })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("ajax fail: " + textStatus + " error: " + errorThrown);
  });
}

function get(message, data){
  $.ajax({
    method: "GET", // Vul hier POST of GET in
    url: message
              //cache: false
    })
    .done(function(result) {
      //'2018-03-06T12:00:00'  //subject: data.subjects[0]
      for(let data of result.response.data)
                {
                  //startDate
                  let i;
                  let k;
                  let l;
                  let m;
                  let n;
                  let o;
                    i = new Date(data.start*1000);
                    k = i.getHours();
                    if(i.getHours().toString().length == 1) k = '0' + i.getHours();
                    l = i.getMinutes();
                    if(i.getMinutes().toString().length == 1) l = '0' + i.getMinutes();
                    m = i.getDate();
                    if(i.getDate().toString().length == 1) m = '0' + i.getDate();
                    n = i.getMonth();
                    if(i.getMonth().toString().length == 1) n = '0' + i.getMonth();
                    o = i.getFullYear();
                    eventListStart.push(`${o}-${n}-${m}T${k}:${l}:00`);  
                    let quicksave = `${o}-${n}-${m}T${k}:${l}:00`;
                    //EndDate
                    i = new Date(data.end*1000);
                    k = i.getHours();
                    if(i.getHours().toString().length == 1) k = '0' + i.getHours();
                    l = i.getMinutes();
                    if(i.getMinutes().toString().length == 1) l = '0' + i.getMinutes();
                    m = i.getDate();
                    if(i.getDate().toString().length == 1) m = '0' + i.getDate();
                    n = i.getMonth();
                    if(i.getMonth().toString().length == 1) n = '0' + i.getMonth();
                    o = i.getFullYear();
                    eventListEnd.push(`${o}-${n}-${m}T${k}:${l}:00`);  

                    /*eventList.push({
                      title: data.subjects[0],
                      start: quicksave,
                      end: `${o}-${n}-${m}T${k}:${l}:00`   #ff0000
                    });*/
                    var blockColor = '#0051c4';
                    if(data.modified == true) blockColor = '#00e5e5';
                    if(data.type == "exam") blockColor = '#ffd800';
                    //if(data.type !== "exam") blockColor = '#ffd8ff';
                    if(data.cancelled == true) blockColor = '#ff0000';
                    eventList.push({
                      title: data.subjects[0] + `\n ${data.locations[0]}`,
                      start: data.start * 1000,
                      end: data.end * 1000,
                      color: blockColor,
                      teacher: data.teachers[0],
                      location: data.locations[0],
                      subject: data.subjects[0],
                      remark: data.remark,
                      branch: data.branch
                    });
                }

      calandarsetter();
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("ajax fail: " + textStatus + " error: " + errorThrown);
  });
}

function prepare(){


}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + 7 + (day == 0 ? -6:1) /*add prev week ->*/ - 14; // adjust when day is sunday
      d.setDate(diff);
      d.setHours(01);
  return new Date(d);
}

function getSunday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate()  +  (7- day) /*add prev week ->*/+ 7;// + (day == 0 ? -6:1); // adjust when day is sunday
      d.setDate(diff)
      d.setHours(23);
  return new Date(d);
}

function UnixToTime(Timestamp){
  date = new Date(Timestamp*1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  var seconds = "0" + date.getSeconds();

  var day = "0" +date.day();

  var month ="0" +date.month();

  var year ="0" + date.year();
  //console.log(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}- `);
  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + " - " + (date.getDate()-1) + ':' + date.getMonth() + ':' + (date.getFullYear()-1);
  return formattedTime;
}
/*
        {
          title: 'All Day Event',
          start: '2018-03-01'
        },
        {
          title: 'Long Event',
          start: '2018-03-07',
          end: '2018-03-10'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-09T16:00:00'
        },
        {
          id: 0,
          title: 'al Repeating Event',
          start: '2018-03-06T12:00:00',
          end: '2018-03-06T16:00:00'
        },
        {
          id: 999,
          title: 'Repeating Event',
          start: '2018-03-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2018-03-11',
          end: '2018-03-13'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T10:30:00',
          end: '2018-03-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2018-03-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2018-03-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2018-03-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2018-03-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2018-03-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2018-03-28'
        }
      */


    /*  $('#calendar').fullCalendar({
  events: function(start, end, timezone, callback) {
    $.ajax({
      url: 'myxmlfeed.php',
      dataType: 'xml',
      data: {
        // our hypothetical feed requires UNIX timestamps
        start: start.unix(),
        end: end.unix()
      },
      success: function(doc) {
        var events = [];
        $(doc).find('event').each(function() {
          events.push({
            title: $(this).attr('title'),
            start: $(this).attr('start') // will be parsed
          });
        });
        callback(events);
      }
    });
  }
});*/