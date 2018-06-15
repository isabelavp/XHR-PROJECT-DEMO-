const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit',function(e){
	e.preventDefault();
	responseContainer.innerHTML = '';
	searchedForText = searchField.value;
	getNews();
});

function getNews ()  {
	const articleRequest = new XMLHttpRequest();
	/* con el link que aparece en el lms no me funcionaba, utilice el link del slack*/
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=61f9e978872048a59a734ba738d0878f`);
	articleRequest.onload = addNews;
	articleRequest.onerror =handleError;
	articleRequest.send();
}

function handleError () {
	console.log('Se ha presentado un erro');
};


function addNews(){
	const data = JSON.parse(this.responseText);
	const article = data.response.docs[0];
	const title = article.headline.main;
	const snippet = article.snippet;
	
	let li = document.createElement('li');
	li.className = 'articleClass';
	li.innerText = snippet;

	responseContainer.appendChild(li);
}