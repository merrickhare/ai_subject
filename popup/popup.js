// Author: Merrick Hare
// Date: 12/22/2022
// Overrides the submit button and adds a bit of extra functionality to the reset button. 
// The buttonSubmit function takes the information posted in the textarea and stores it as a prompt,
// which is then sent to the completions enpoint. 

// Store your api key from OpenAI as a string replace with your own key "YOUR API KEY"
const API_KEY = "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"
let form = document.getElementById('submit_form');
let textarea = document.getElementById("emailBody");

// create subject line 
form.addEventListener('submit', function(event) {
  event.preventDefault();
  let inputValue = document.getElementById('emailBody').value;
  if (inputValue == "") {
    document.getElementById("answer").innerHTML = "Paste your email body below..."
  }
  else {
   buttonSubmit(`I want you to act as a professional copywriter and create a very short tagline for an email. The tagline should be professional, very short, and eye catching. The audience has a short attention span and will need to see something that stands out in their inbox but remains factual. Create the tagline from the following text and do not include the word tagline: \n \n ${inputValue}`); 
  }
});

// reset form
form.addEventListener('reset', function() {
  document.getElementById("answer").innerHTML = "";
});



// button submit function 

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
          "temperature": 0.1,
          "max_tokens": 512,
          "top_p": 0.1,
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


