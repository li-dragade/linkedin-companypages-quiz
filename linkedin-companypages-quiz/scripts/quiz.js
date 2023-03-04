// initialize the quiz when the extension loads

let question_count = 0;
let points = 0;
let quizData = {};

// only the content script can access DOM to get the company id :(
// companyId = document.getElementById("organization-debug-entity-urn-id").innerHTML.split('\n')[1].trim()
// console.log("companyId=" + companyId)

document.addEventListener("DOMContentLoaded", function(){
	chrome.tabs.query({active: true, currentWindow: true}, tabs => {
		let url = tabs[0].url;
		// use `url` here inside the callback because it's asynchronous!
		console.log("On URL " + url)
		companyName = url.split("/")[4]
		fetch(chrome.extension.getURL('data/data_' + companyName + '.json'))
				.then(response => response.json())
				.then(data => {
					quizData = data;
					console.log(quizData);
					show(question_count);
				});
	});
	}, false);

document.getElementById('btn-next').addEventListener('click',function(){
	if(question_count === quizData.quiz.length -1){
		location.href = "final.html";
	}
	question_count++;
	show(question_count);
}, false);


function show(count){
	let question = document.getElementById("questions");
	let[first, second, third, fourth] = quizData.quiz[count].answers;

	question.innerHTML = `<h5>Q${count + 1}. ${quizData.quiz[count].question}</h5>
    <ul class="option_group">
    <li class="option">${first}</li>
    <li class="option">${second}</li>
    <li class="option">${third}</li>
    <li class="option">${fourth}</li>
    </ul>`;
	bindClickValidationEvent();
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

function bindClickValidationEvent() {
	let questionOptions = document.querySelectorAll('li.option');
	console.log(questionOptions);
	questionOptions.forEach(item => {
		item.addEventListener("click", function () {

			let user_answer = document.querySelector("li.option.active");
			if (user_answer === null) {
				item.classList.add("active");
				user_answer = item;
				console.log(user_answer);
			}

			if(user_answer.innerHTML === quizData.quiz[question_count].answers[0]){
				user_answer.classList.add("correct-answer");
				points += 100/quizData.quiz.length;
				sessionStorage.setItem("points",points);
			} else {
				user_answer.classList.add("wrong-answer")
			}

			document.querySelectorAll('li:not(.correct-answer, .wrong-answer)').forEach(function(e){
				e.classList.add("disabled");
			});
		});
	});
}