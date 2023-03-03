// initialize the quiz when the extension loads

let question_count = 0;
let points = 0;
let questions = [];

// only the content script can access DOM to get the company id :(
// companyId = document.getElementById("organization-debug-entity-urn-id").innerHTML.split('\n')[1].trim()
// console.log("companyId=" + companyId)

document.addEventListener("DOMContentLoaded", function(){
	chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
		let url = tabs[0].url;
		// use `url` here inside the callback because it's asynchronous!
		console.log("On URL " + url)
		companyName = url.split("/")[4]
		fetch(chrome.extension.getURL('data/data_' + companyName + '.json'))
				.then(response => response.json())
				.then(data => {
					questions = data;
					show(question_count, companyName);
				});
	});
	}, false);

document.getElementById('btn-next').addEventListener('click',function(){
	if(question_count === questions.length -1){
		location.href = "final.html";
	}
	console.log(question_count);

	let user_answer = document.querySelector("li.option.active").innerHTML;

	if(user_answer == questions[question_count].answers[0]){
		points += 10;
		sessionStorage.setItem("points",points);
	}
	console.log(points);

	question_count++;
	show(question_count);
}, false);

function show(count, companyName){
	let question = document.getElementById("questions");
	let[first, second, third, fourth] = questions[count].answers;

	question.innerHTML = `<h2>Q${count + 1}. ${questions[count].question}</h2>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
	toggleActive();
}

function toggleActive(){
	let option = document.querySelectorAll("li.option");
	for(let i=0; i < option.length; i++){
		option[i].onclick = function(){
			for(let i=0; i < option.length; i++){
				if(option[i].classList.contains("active")){
					option[i].classList.remove("active");
				}
			}
			option[i].classList.add("active");
		}
	}
}
