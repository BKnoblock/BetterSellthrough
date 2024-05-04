// import your listings file from ebay

function removeNonMatchingRowsFast() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues(); // Get all data
  let newData = [];

  // Define a helper function to filter out unwanted columns
  function filterColumns(row) {
    let filteredRow = [];
    // Include only specific columns, here indices are zero-based
    filteredRow.push(row[0]); // Column A
    filteredRow.push(row[1]); // Column B
    filteredRow.push(row[3]); // Column D
    filteredRow.push(row[15]); // Column P
    filteredRow.push(row[17]); // Column R
    // Add any columns from AG onwards
    for (let j = 32; j < row.length; j++) {
      filteredRow.push(row[j]);
    }
    return filteredRow;
  }

  // Always include the header, filtered
  newData.push(filterColumns(data[0]));

  // Iterate over each row, starting from row 2 (index 1)
  for (let i = 1; i < data.length; i++) {
    if (data[i][18] == 262042) { // Keep rows where column S (index 18) matches 262042
      newData.push(filterColumns(data[i]));
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

function viewLogs() {
  // This function can be used to view the logs from the script editor
  const logs = Logger.getLog();
  Logger.log(logs);
}
