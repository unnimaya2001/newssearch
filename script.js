const apiKey = 'a0640e33779f4dc7b04a38a5c0ff2009';

const blog = document.getElementById("news");
const searchBar = document.getElementById("search-input");
const searchButton = document.getElementById("search-button")
//this is to avoid showing a blank page to the user when they visit the site for first time

async function fetchRandomNews(){
    try{
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apiKey=${apiKey}`;
    const response = await fetch(apiUrl) ;
    const data = await response.json();
    return data.articles;
}
    catch(error){
    console.error("not able to fetch news",error)
    return []
    }
}

searchButton.addEventListener('click',async ()=>{
    const query = searchBar.value.trim();
if(query !== ""){
    try{
      const articles =await fetchNewsQuery(query)
      display(articles)
    }
    catch(error){
        console.log('error fetching news by query')
    }
}
})

async function fetchNewsQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`;
        const response = await fetch(apiUrl) ;
        const data = await response.json();
        return data.articles;
    }
        catch(error){
        console.error("not able to fetch news",error)
        return []
        }
    }

function display(articles){
    blog.innerHTML="";
    articles.forEach((article) =>{
    const blogCard = document.createElement("div");
    blogCard.classList.add("container");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h3");
    const truncatedTitle = article.title.length > 30 
    ? article.title.slice(0, 30) + "...." : article.title;
    title.textContent = truncatedTitle; 
    
    const description = document.createElement("p");
    const truncatedDescription = article.description.length > 120
    ? article.description.slice(0, 120) + "...." : article.description;
    description.textContent = truncatedDescription;
    
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener('click',()=>{
        window.open(article.url, "_blank")
    });
    blog.appendChild(blogCard);

    });
}

(async ()=>{
    try{
        const articles = await fetchRandomNews();
        display(articles);
    }
    catch(error){
        console.error("error in fetching",error)
    }
})();