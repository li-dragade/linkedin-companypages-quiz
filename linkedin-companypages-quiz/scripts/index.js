
var companyLogoUrl = '';

document.addEventListener("DOMContentLoaded", function(){
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    let code = `document.getElementsByClassName('org-top-card-primary-content__logo-container')[0].querySelector('img').getAttribute('src')`;
    chrome.tabs.executeScript(tab.id, { code }, function (result) {
      console.log(code);
      console.log(result[0]);
      companyLogoUrl = result[0];
      let companyLogo = document.getElementsByClassName('company-logo')[0];
      let logoImage = document.createElement("img");
      logoImage.src = companyLogoUrl;
      companyLogo.appendChild(logoImage);
      let companyTitle = document.getElementById('company-title');
      companyTitle.innerText = tab.url.split("/")[4];
    });
  });
}, false);
