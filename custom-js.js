// custom-js.js

window.onload = function() {
  // Fetch and parse the CSV data
  fetchCSV("yourdata.csv", function(data) {
    var dropdown = document.getElementById("dropdown-menu");

    // Populate the dropdown menu with options from the CSV data
    data.forEach(function(item) {
      var option = document.createElement("option");
      option.value = item.chapter;
      option.text = item.chapter + " - " + item.subject;
      dropdown.appendChild(option);
    });
  });
};

// Function to fetch CSV file and process data
function fetchCSV(filePath, callback) {
  fetch(filePath)
    .then(response => response.text())
    .then(data => {
      // Split CSV data into rows
      var rows = data.split('\n');
      // Remove header row if present
      if (rows.length > 0 && rows[0].startsWith('chapter,subject,image')) {
        rows.shift();
      }
      // Process each row
      var csvData = rows.map(row => {
        var columns = row.split(',');
        return { chapter: columns[0], subject: columns[1], image: columns[2] };
      });
      callback(csvData);
    })
    .catch(error => console.error('Error fetching CSV:', error));
}
