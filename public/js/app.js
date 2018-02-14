const btnXhr=document.getElementById('submit-xhr');
const btnFetch=document.getElementById('submit-fetch');
const searchField= document.getElementById('search-keyword');
const responseContainer=document.getElementById('response-container');
let searchedForText;

btnXhr.addEventListener('click',function(e){
  e.preventDefault();
  responseContainer.innerHTML='';
  searchedForText=searchField.value;
  getNews();
});

function getNews() {
  const XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
    if (XHR.readyState === 4 && XHR.status === 200) {
      const data = JSON.parse(this.responseText);
      const response = data.response.docs;
      XHR.onload = addNews(response);
    }
  };
  XHR.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=67e2b2e80b4340dc9b9c27b472072dc7`);
  XHR.send();
}

function handleError(){
    console.log('Existe un error');
}

function addNews(response){
  if (response.length > 0) {
    response.forEach(function(element,i) {
      if (element.document_type === 'article') {
        const noticia = `<div class="noticias container"><div class = "col-md-10 col offset-md-1"><h5 class="title">${element.headline.main}</h5><p>${element.snippet}</p></div></div><br>`;
        responseContainer.innerHTML +=noticia;
      }
    });
  }
}


// Para AJAX  con fetch
btnFetch.addEventListener('click', function(e){
  e.preventDefault();
  responseContainer.innerHTML='';
  searchedForText=searchField.value;
  getNews();
    let uri = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=67e2b2e80b4340dc9b9c27b472072dc7`;
      fetch(uri)
      .then(function(response){
        //  console.log(response);
          return response.json();
      }).then(function(data){
        const article = data.response.docs[0];
        const title = article.headline.main;
        const snippet = article.snippet;
        let li = document.createElement('li');
        li.className = 'articleClass';
        li.innerText=snippet;
        responseContainer.appendChild(li);
      })
      .catch(function(error){
        console.log(error);
      });
});
