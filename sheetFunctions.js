export function create(title, callback) {
    try {
      gapi.client.sheets.spreadsheets.create({
        properties: {
          title: title,
        },
      }).then((response) => {
        if (callback) callback(response);
        console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
      });
    } catch (err) {
      document.getElementById('content').innerText = err.message;
      return;
    }
  } 
  
export function tester() {
    console.log("Online");
}
