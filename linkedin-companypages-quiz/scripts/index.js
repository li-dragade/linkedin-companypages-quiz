
var companyLogoUrl = '';

document.addEventListener("DOMContentLoaded", function(){
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    let code = `document.getElementsByClassName('org-top-card-primary-content__logo-container')[0].querySelector('img').getAttribute('src')`;
    let companyName = tab.url.split("/")[4]

    chrome.tabs.executeScript(tab.id, { code }, function (result) {
      console.log(code);
      console.log(result[0]);
      companyLogoUrl = result[0];
      let logoImage = document.getElementsByClassName('company-logo')[0];
      let companyTitle = document.getElementById('company-title');
      logoImage.setAttribute('src', companyLogoUrl);
      companyTitle.innerText = companyName;
    });

    fetch(chrome.extension.getURL('data/data_' + companyName + '.json'))
        .then(response => response.json())
        .then(data => {
          quizData = data;
          let companySummary = document.getElementsByClassName('company-info')[0];
          companySummary.innerHTML = quizData.summary;
        });

  });
}, false);
