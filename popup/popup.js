// Author: Merrick Hare
// Date: 12/22/2022
// Overrides the submit button and adds a bit of extra functionality to the reset button. 
// The buttonSubmit function takes the information posted in the textarea and stores it as a prompt,
// which is then sent to the completions enpoint. 

// Store your api key from OpenAI as a string replace with your own key "YOUR API KEY"
const API_KEY = "YOUR API KEY"

// Get a reference to the form element
var form = document.getElementById('submit_form');

// Add a submit event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting (default action)
  event.preventDefault();

  // Get the value of the input field
  var inputValue = document.getElementById('emailBody').value;
 
  // Pass the input value to the buttonSubmit function 
  buttonSubmit(inputValue);
});

form.addEventListener('reset', function() {
  document.getElementById("answer").innerHTML = "Paste your email body in the box below.";
});
// function that handles the request and response to the open ai endpoint
function buttonSubmit(promptText){
      fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          "model": "text-davinci-003",
          "prompt": `Create a subject line for an email from the following text: ${promptText}`,
          "temperature": 0,
          "max_tokens": 20
        }),
      })
      // format the response in json
      .then((response) => response.json())
      // clear the answer element and populate with the returned subject
      .then((data) => {
           document.getElementById("answer").innerHTML = " "
           document.getElementById("answer").innerHTML = "Subject Line: " + data['choices'][0]['text']
      })
      .catch((error) => {
        document.getElementById("answer").innerHTML = " "
        document.getElementById("answer").innerHTML = error;
      });
    };


