function doGet(req) {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = doc.getSheetByName("Configuration");
  var range =sheet.getRange(1,1,50,50);
  var values=range.getValues();
  
  var output = [];

  for (var i = 0; i < values.length; i++) {
    if (i == 0) {
      continue;
    }
    var row = {}; // Create a new row object for each row
    for (var j = 0; j < 100; j++) {
      if (!values[i][j]) {
        break;
      }
      if (['URL','Port',"CICD"].includes(values[0][j])){
        continue;
      }
      row[values[0][j]] = values[i][j];
      }
      output.push(row); // Push the row object to the output array
      delete row;
    }
    var json=JSON.stringify({ data: output })
    console.log(json)
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}