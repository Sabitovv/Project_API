const API_KEY = `0c4b90f48556cdec12e2d46f470b4a92` 
const BASE_URL = `https://api.themoviedb.org/3`
const API_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`
const API_GENR= `https://api.themoviedb.org/3/genre/movie/list`

const IMAGE_URL= `https://image.tmdb.org/t/p/w500`
const search = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`
const year_release_api = `${BASE_URL}/discover/movie?include_adult=false&include_video=false&sort_by=popularity.desc&page=1&api_key=${API_KEY}&`
const year_release = `primary_release_year=`
const top_rated=`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`


const mainEl=document.querySelector(".wrapper")


getMovies(API_URL);

async function ganrApi(){
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
    return await res.json()
}

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        ganrApi().then(ganr=>{
            if(data.results.length!=0){
                Movies(data.results, ganr.genres)
            }
            else{
                ShowEmpty()
            }
        })
    })
}

function Movies(data, ganres){
    data.forEach(element => {
        const mainEl=document.querySelector(".wrapper")
        const movieEl=document.createElement("div")
        const Id=element.genre_ids
        let ganr_1=null
        ganres.forEach(ganr=>{
            if(ganr.id==Id[0]){
                ganr_1=ganr.name
            }
        })
        let ganr_2=null
        ganres.forEach(ganr=>{
            if(ganr.id==Id[1]){
                ganr_2=ganr.name
            }
        })
        movieEl.classList.add("card")
        mainEl.appendChild(movieEl)
        let star=element.vote_average
        let len=0
        if(star>=0 && star<2 ){
            len=1
        }
        else if(star>=2 && star<4){
            len=2
        }
        else if(star>=4 && star<6){
            len=3
        }
        if(star>=6 && star<8){
            len=4
        }
        else if(star>=8 && star<=10){
            len=5
        }
        movieEl.innerHTML=`
        <div class="poster"><img src="${IMAGE_URL+element.poster_path}" alt=""></div>
            <div class="details">
                <h1>${element.title}</h1>
                <h2>${element.release_date}</h2>
                <div class="rating">
                    <span>${element.vote_average}</span>
                </div>
                <div class="tags">
                    <span class="tag">${element.original_language}</span>
                    <span class="tag">${ganr_1}</span>
                    <span class="tag">${ganr_2}</span>
                </div>
                <p class="desc">
                    ${element.overview}
                </p>
            </div>
        `
        const ratingEl = movieEl.querySelector(".rating");
        for (let i = 0; i < len; i++) {
            const starIcon = document.createElement("i");
            starIcon.classList.add("fas", "fa-star");
            ratingEl.appendChild(starIcon);
        }
        mainEl.appendChild(movieEl);
    });
}


function deletepast(){
    while(mainEl.firstChild){
        mainEl.removeChild(mainEl.firstChild)
    }
}

function ShowEmpty(){
    mainEl.innerHTML=`<h1 class="title">NO RESULT!</h1>`
}

const input=document.querySelector(".text")
const form= document.querySelector(".form")
form.addEventListener('submit' ,(e)=>{
    e.preventDefault()
    if(input){
        if (input.value!=""){
            deletepast()
            getMovies(search + encodeURIComponent(input.value));
            input.value=""
        }
        else{
            getMovies(API_URL)
        }
    }
})

const filter=document.querySelector(".button_icon")
const windows=document.querySelector(".windows")
const by_year=document.querySelector(".by_year")
const year_options=document.querySelector(".year_options")
const years=year_options.querySelectorAll("div")
const raiting=document.querySelector(".raiting")
const popularity=document.querySelector(".popularity")
console.log(years)
// const x=document.createElement("img")
let num=0
let num_1=0


filter.addEventListener('click', (e)=>{
    const filt=e.target
    if(num==0){
        windows.style.display="flex"
        num=1
    }
    else if(num==1){
        windows.style.display="none"
        year_options.style.display="none"
        by_year.style.backgroundColor ="transparent"
        num=0
    }
})
by_year.addEventListener('click', (e)=>{
    if(num_1==0){
        year_options.style.display="block"
        by_year.style.backgroundColor ="green"
        num=1
    }
    else if(num_1==1){
        year_options.style.display="none"
        by_year.style.backgroundColor ="transparent"
        num=0
    }
})

years.forEach(el=>{
    el.addEventListener('click', (e)=>{
        deletepast();
        getMovies(`${year_release_api}${year_release}${e.target.textContent}`);
    })
})

raiting.addEventListener('click', (e)=>{
    deletepast()
    getMovies(top_rated)
})

popularity.addEventListener('click', (e)=>{
    deletepast()
    getMovies(API_URL)
})
