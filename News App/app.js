const API_key = "487a18439c27483383fee890efcf2792"
const url = "https://newsapi.org/v2/everything?q="

window.addEventListener ('load' , () => fetchnews("India"));

function reload() {
    window.location.reload();
}
async function fetchnews(query){
    const response = await fetch(`${url}${query}&apiKey=${API_key}`)
    const data = await response.json();
    bindData(data.articles);
    
};

function bindData(articles) {
    const newsContainer = document.getElementById("news-container");
    const newsCardTemplate = document.getElementById("news-template"); // Corrected typo here
    
    newsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
         
        const cardClone = newsCardTemplate.content.cloneNode(true); // Corrected variable name
        fillDataInCard(cardClone, article);
        newsContainer.appendChild(cardClone);
    });
}

 
function fillDataInCard(cardClone , article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    }); 

    newsSource.innerHTML = `${article.source.name} . ${date}`;
    
    cardClone.firstElementChild.addEventListener("click", () =>{
     window.open(article.url , "_blank");       
    });
}
 const curSelectNav = null;
function onNavItem(id){
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectNav?.classList.remove('active');
    curSelectNav = navItem;
    curSelectNav.classList.add('avtive');
}

const searchButton = document.querySelector(".search-button");
const searchInput = document.querySelector(".news-input");
 searchButton.addEventListener("click" , ()=>{
    const query = searchInput.value;
    if(!query) return;
    fetchnews(query); 
    curSelectNav?.classList.remove('active');
    curSelectNav = null;
});


//  