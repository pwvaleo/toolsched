document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {

        var text = document.getElementById("textbox").value;        
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {data: text}, function(response) {
                console.log(response.farewell);
            });
        });
    });
    
    var infoDiv = document.getElementById('info');
    var textBox = document.getElementById("textbox");
    

    textBox.addEventListener('blur', function() {
        var checkPageButton = document.getElementById('checkPage');
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
  var rawData = textBox.value;
items = rawData.split("\t");
infoDiv.innerHTML = '';
    for (field in fields) {
//        fields[field] = items[fields[field]];
        console.log(field);
        var insertItem = document.createElement('p');
        var insertField = document.createElement('span');
        if (items[fields[field]] != undefined || fields[field] != '') {
            insertField.innerHTML=field+": "+items[fields[field]];
            infoDiv.appendChild(insertItem).appendChild(insertField);
        }
    }
      fields.description += "\n\n"+fields.addlDetails;
      
  
        

//        textBox.value="What";
        checkPageButton.innerHTML = "Changed";
    });
});