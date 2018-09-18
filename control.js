
console.log(getMonday(new Date()).getTime()/1000); // Mon Nov 08 2010
var unixtime = parseInt(getMonday(new Date()).getTime()/1000);
//var unixtime = Date.parse("23-8-2018").getTime()/1000
var unixtime1 = parseInt(getSunday(new Date()).getTime()/1000);
//var unixtime1 = Date.parse("26-8-2018").getTime()/1000;
//var unixtime1 = "453959"
console.log(unixtime);
console.log(UnixToTime(unixtime));
console.log(UnixToTime(unixtime1));
var Message = `https://nsg.zportal.nl/api/v3/appointments?user=~me&start=${unixtime}&end=${unixtime1}&access_token=e3tub6a2ai8g18uq77b2p6tc8g`
get(Message, "");
console.log(Message);

function post(message, data){
    $.ajax({
                method: "POST", // Vul hier POST of GET in
                url: message,
                cache: false,
                data: data
            })
            .done(function(result) {
                
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("ajax fail: " + textStatus + " error: " + errorThrown);
            });
}

function get(message, data){
    $.ajax({
                method: "GET", // Vul hier POST of GET in
                url: message
                //cache: false,
                //data: data
            })
            .done(function(result) {
                var list = [];
                for(let data of result.response.data)
                {
                    let i = new Date(data.start*1000);
                    //console.log(date.start);
                    //console.log(/*UnixToTime(data.start)*/i.getDate() + " -=-=- " + data.subjects[0]);'let'
                    let k = i.getHours();
                    let l = i.getMinutes();
                    if(i.getHours().toString().length == 1) k = '0' + i.getHours();
                    if(i.getMinutes().toString().length == 1) l = '0' + i.getMinutes();
                    //list.push(i.getDate() + ":" + k + ":" + l + ":" + " -=-=- " + data.subjects[0])
                    list.push({
                        date: i.getDate(),
                        hour: k,
                        minutes: l,
                        subject: data.subjects[0]
                    })
                    var para = document.createElement("p");
                    var node = document.createTextNode(`Lesson: ${ data.subjects[0]} at: ${i.getDate()}`);
                    para.appendChild(node);
                    var element = document.getElementById("div1");
                    element.appendChild(para);
                }
                list.sort();
                console.log(list);
                //console.log(result.response.data[0].start);
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                alert("ajax fail: " + textStatus + " error: " + errorThrown);
            });
}
//console.log(new Date(1535017500*1000).toString());
/* http://www.convert-unix-time.com/api?timestamp=453959&returnType=jsonp&callback=convertUnixTimeCallback

var baseUri = 'http://www.convert-unix-time.com/api?';
    $.getScript(baseUri+'timestamp=now&returnType=jsonp&callback=convertUnixTimeCallback');
*/
var data;
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
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + " - " + date.getDate() + ':' + date.getMonth() + ':' + date.getFullYear();;
return formattedTime;
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + 7 + (day == 0 ? -6:1); // adjust when day is sunday
      d.setDate(diff);
      d.setHours(01);
  return new Date(d);
}
function getSunday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() + 7 +  (7- day);// + (day == 0 ? -6:1); // adjust when day is sunday
      d.setDate(diff)
      d.setHours(23);
  return new Date(d);
}
var date1;
date1 = parseDate("23/8/2018");

function parseDate(input) {
  var parts = input.match(/(\d+)/g);
  // new Date(year, month [, date [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // months are 0-based
}

////////////////////////////////////////zorg er voor dat je vroeg de tijd krijgt op maandag

//////////Add json reader