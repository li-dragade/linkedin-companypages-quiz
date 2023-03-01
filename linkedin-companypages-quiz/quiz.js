// initialize the quiz when the extension loads

// get the company id from the page
console.log("hi from quiz.js")

// only the content script can access DOM to get the company id :(
// companyId = document.getElementById("organization-debug-entity-urn-id").innerHTML.split('\n')[1].trim()
// console.log("companyId=" + companyId)

// if we can't get companyid then an option is to get the name from the URL...
chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    console.log("On URL " + url)
    companyName = url.split("/")[4]
    console.log("company name is " + companyName)

    document.getElementById("company").innerHTML = "Quiz about " + companyName
	    fetch(chrome.extension.getURL('data/data_' + companyName + '.json'))
	  .then(response => response.json())
	  .then(data => {
	    document.getElementById("question").innerHTML = data[0].question
	    document.getElementById("answer1").innerHTML = data[0].answers[0]
	    document.getElementById("answer2").innerHTML = data[0].answers[1]
	    document.getElementById("answer3").innerHTML = data[0].answers[2]
	    document.getElementById("answer4").innerHTML = data[0].answers[3]
  });

});
