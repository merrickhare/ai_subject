// Author: Merrick Hare
// Date: 12/22/2022
// Overrides the submit button and adds a bit of extra functionality to the reset button. 
// The buttonSubmit function takes the information posted in the textarea and stores it as a prompt,
// which is then sent to the completions enpoint. 

// Store your api key from OpenAI as a string replace with your own key "YOUR API KEY"
const API_KEY = "YOUR_API_KEY"

// Get a reference to the form element
var form = document.getElementById('submit_form');

// Add a submit event listener to the form
form.addEventListener('submit', function(event) {
  // Prevent the form from submitting (default action)
  event.preventDefault();

  // Get the value of the input field
  var inputValue = document.getElementById('emailBody').value;
  if (inputValue == "") {
    document.getElementById("answer").innerHTML = "Paste your email body below..."
  }
  else {

   buttonSubmit(`Write a powerful subject line relating to the following email body, without the words subject line: ${inputValue}`); 
  }
  // Pass the input value to the buttonSubmit function 
  
});

form.addEventListener('reset', function() {
  document.getElementById("answer").innerHTML = "";
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
          "prompt": promptText,
          "temperature": 0.7,
          "max_tokens": 256,
          "top_p": 1,
          "frequency_penalty": 0.5,
          "presence_penalty": 0
        }
        )
      })
      // format the response in json
      .then((response) => response.json())
      // clear the answer element and populate with the returned subject
      .then((data) => {
           document.getElementById("answer").innerHTML = " "
           document.getElementById("answer").innerHTML = data['choices'][0]['text']
      })
      .catch((error) => {
        document.getElementById("answer").innerHTML = " "
        document.getElementById("answer").innerHTML = error;
      });
    };
