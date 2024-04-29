function showContent(contentId) {
  // Hide all content divs
  var allContentDivs = document.querySelectorAll('.content-section');
  allContentDivs.forEach(function(div) {
    div.classList.remove('active');
  });

  // Show the selected content div
  var selectedContent = document.getElementById(contentId);
  if (selectedContent) {
    selectedContent.classList.add('active');
  }

  // Hide content buttons
  var contentButtons = document.getElementById('content-buttons');
  if (contentButtons) {
    contentButtons.style.display = 'none';
  }
}

function showContentButtons() {
  // Hide all content divs
  var allContentDivs = document.querySelectorAll('.content-section');
  allContentDivs.forEach(function(div) {
    div.classList.remove('active');
  });

  // Show the content buttons div
  var contentButtons = document.getElementById('content-buttons');
  if (contentButtons) {
    contentButtons.style.display = 'block';
  }
}


// Function to fetch CSV file and process data
    function fetchCSV(filePath, callback) {
      fetch(filePath)
        .then(response => response.text())
        .then(data => {
          // Split CSV data into rows
          var rows = data.split('\n');
          // Remove header row if present
          if (rows.length > 0 && rows[0].startsWith('chapter,System,Image')) {
            rows.shift();
          }
          // Process each row
          var cardData = rows.map(row => {
            var columns = row.split(',');
            return { chapter: columns[0], System: columns[1], Image: columns[2] };
          });
          callback(cardData);
        })
        .catch(error => console.error('Error fetching CSV:', error));
    }

    // Function to create a card element
    function createCard(chapter, System, Image) {
      var card = document.createElement("div");
      var imgUrl = "url(" + Image + chapter + ")";
      card.classList.add("col-md-12", "card");
      card.style.background = imgUrl;
      card.style.backgroundPosition = "center";
      card.style.backgroundSize = "cover";
      card.style.borderColor = "black";
      card.style.border = "5px";
      card.style.borderRadius = "10px";
      card.style.boxShadow = "inset 0 0 0 2px rgba(255, 255, 255, 1), 0px 5px 5px rgba(0, 0, 0, 0.4)";
      card.style.margin = "3%";
      card.style.padding = "3%";
      card.innerHTML = `
          <div class="card" style="min-width: 100%; min-height: 100%; background-color: transparent ; border: transparent; " >
          <div class="card-body">
            <h5 class="card-title" style="text-align: center; color: #FFFFFF; text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;">${chapter} ${System}</h5>
            </div>
        </div>
    `; 

          // Legg til klikkfunksjon på kortet
  card.addEventListener("click", function() {
    var pageTitle = chapter + " " + System;
    // Naviger til en ny side med samme navn som kortets tittel
    window.location.href = pageTitle + ".html";
  });
        
      return card;
    }

    // Function to populate the card grid
    function populateCardGrid(cardData) {
      var cardGrid = document.getElementById("cardGrid");
      cardData.forEach(function(card) {
        var cardElement = createCard(card.chapter, card.System, card.Image);
        cardGrid.appendChild(cardElement);
      });
    }

    // Call the function to fetch CSV data and populate the card grid
    fetchCSV("subject-list-csv.csv", populateCardGrid);
