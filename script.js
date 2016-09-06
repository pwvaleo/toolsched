
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) { 

  
  fields = {
    "name":0,
    "class":1,
    "date":2,
    "month":'',
    "day":'',
    "year":'',
    "startTime":3,
    "startHour":'',
    "startMinute":'',
    "startAmPm":'',
    "endTime":4,
    "endHour":'',
    "endMinute":'',
    "endAmPm":'',
    "location":5,
    "instructor":6,
    "assistant":7,
    "email":8,
    "phone":9,
    "department":10,
    "affiliation":11,
    "course":12,
    "description":13,
    "altDate":14,
    "numStudents":15,
    "addlDetails":16
}              
 var ids = {
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRCourse":"class", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRLocation":"location", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRMonth":"month", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRDay":"day", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRYear":"year",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartHour":"startHour", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartMinute":"startMinute", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartAM":"startAmPm", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndHour":"endHour", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndMinute":"endMinute", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndAM":"endAmPm", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRInstructor":"instructor", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRAssistant":"assistant", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRExpected":"numStudents",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRRequestor":"name",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRContact":"email",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRAffiliation":"department",
     "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRComments":"description"
 };     

 var selectids = [
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRCourse", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRLocation", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRMonth", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRDay", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRYear",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartHour", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartMinute", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRStartAM", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndHour", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndMinute", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSREndAM", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRInstructor", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRAssistant", 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRExpected"
 ];     

var inputids = [ 
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRRequestor",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRContact",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRAffiliation",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_chkSRConfirmed",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_chkSRPPTSent",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_chkSREvalSent",
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_btnUpdateSR"
];

var textareaid = [
    "ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_txtSRComments"
]


    // Create list of all selectable options in HTML dropdown menus and their corresponding database IDs
var selectItems = document.querySelectorAll('select');      
var values = {};
    for (i = 0; i < selectItems.length; i++) {
        var add = selectItems[i].id;
            values[add] = {};
        for (x = 0; x < selectItems[i].children.length; x++) {
            values[add][selectItems[i].children[x].value] = selectItems[i].children[x].text;
        }
    }

      // Get data from Chrome extension via 'request' message object, and split into array of usable data items, called items[]
      // Array will then be further broken 
    var rawData = request.data;
    items = rawData.split("\t");

//    console.log(items);

    for (field in fields) {
        fields[field] = items[fields[field]];
    }
      fields.description += "\n\n"+fields.addlDetails;
      
      
     // Split date value into year-day-month (incoming data should look like YYYY-MM-DD) 
    var dateArr = fields.date.split('-');
    fields.year = dateArr[0];
    fields.month = dateArr[1];
    fields.day = dateArr[2];

      // Convert Start Time into usable data (e.g. from "11:00AM" to ["11", "00", "AM"])
      // Convert am/pm designation into lowercase to register in field as expected

    var startArr = fields.startTime.split(' ');
    fields.startHour = startArr[0].split(':')[0]
    if (fields.startHour.length == 1) { fields.startHour = "0"+fields.startHour} 
    fields.startMinute = startArr[0].split(':')[1]
    fields.startAmPm = startArr[1];
    var x = fields.startAmPm.toLowerCase();
    fields.startAmPm = x;


      // Convert end time into array of usable data (e.g. from "11:00AM" to ["11", "00", "AM"])
      // Convert am/pm designation into lowercase to register in field as expected
      
      var endArr = fields.endTime.split(' ');
      fields.endHour = endArr[0].split(':')[0]
      if (fields.endHour.length == 1) { fields.endHour = "0"+fields.endHour} 
      fields.endMinute = endArr[0].split(':')[1]
      fields.endAmPm = endArr[1];
      var y = fields.endAmPm.toLowerCase();
      fields.endAmPm = y;

      
      // Loop through Instructor field data to match provided string to an existing instructor ID
    for (key in values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRInstructor"]) {
        if (fields.instructor == values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRInstructor"][key]) {
            fields.instructor = key;
//            console.log(fields.instuctor);
        }
    }

      // Loop through Assistant field data to match provided string to an existing instructor ID
      
    for (key in values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRAssistant"]) {
        if (fields.assistant == values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRAssistant"][key]) {
            fields.assistant = key;
//            console.log(fields.assistant);
        }
    }

      
      // Loop through Location field to match fields.location against name of existing field; 
    for (key in values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRLocation"]) {

        
        if (values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRLocation"][key].indexOf(fields.location) != -1 ) {
            fields.location = key;
            var loc = key;
        }
        
        else {
            loc ? loc : loc = '';
            continue;
        }
    }
//      console.log(loc);
      
      if (loc == '') {
          fields.description += "\n\nLocation: "+fields.location;
          fields.location = "1205";
          
      }

    for (key in values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRCourse"]) {
        if (values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRCourse"][key].indexOf(fields.class) != -1 ) {
            fields.class = key;
            var className = key;
        }
        else {
                className ? className : className = '';
        }
    }
      if (className == '') {
//          console.log(fields.description);
          fields.description = "Topic: "+fields.class+"\n\n"+fields.description;
            fields.class = "158";
          
      }
      
    for (key in values["ctl00_ctl00_ctl00_ContentPlaceHolder1_Main_ContentPlaceHolder_ddlSRExpected"]) {
        if (fields.numStudents > 24) {
            fields.numStudents = 25;
        }
    }

//    console.log(fields);



    var map = {};
    for (item in ids) {
        map[ids[item]] = fields[ids[item]]
    }
//        console.log(map);
        
    for (item in ids) { 
        if (document.getElementById(item) != '') {
            document.getElementById(item).value = fields[ids[item]]
        }
    }

    
    });