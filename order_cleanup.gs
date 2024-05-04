// import orders from ebay seller dashboard

function removeNonPCRows() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName('Orders'); // Targeting the "Orders" sheet
  const data = sheet.getDataRange().getValues(); // Get all data
  let newData = [];

  // Always include the header, only include specific columns
  newData.push([
    data[0][22], data[0][23], data[0][24], 
    data[0][49], data[0][50], data[0][51]
  ]);

  // Iterate over each row, starting from row 2 (index 1)
  for (let i = 1; i < data.length; i++) {
    let columnYValue = data[i][24]; // Column Y is index 24 (0-based)
    if (typeof columnYValue === 'string' && columnYValue.toLowerCase().startsWith('pc')) {
      // Keep row if column Y starts with 'pc', but only specific columns
      newData.push([
        data[i][22], data[i][23], data[i][24], 
        data[i][49], data[i][50], data[i][51]
      ]);
    }
    // Log progress every 100 rows
    if (i % 100 == 0) {
      Logger.log('Processed ' + i + ' rows.');
    }
  }

  // Clear the original sheet and set the new data
  sheet.clearContents(); // Clear existing data
  sheet.getRange(1, 1, newData.length, newData[0].length).setValues(newData); // Set new data
  Logger.log('Update complete. Total rows kept: ' + newData.length);
}
