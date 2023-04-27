const progress = document.getElementById('progress-div');
const loadData = url => {
    progress.classList.remove('hidden');
    fetch(url)
    .then(res => res.json())
    .then(data => showNews(data.data))
    .catch(err => console.log(err));
}

const changeUrl = id => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    loadData(url);
}

const showNews = news => {
    console.log(news);
    const entertainmentNews = document.getElementById('entertainment-section');
    const headingNews = document.getElementById('heading-carousel');
    const latestNews = document.getElementById('latest-news');
    const smallNews = document.getElementById('small-news');
    headingNews.innerHTML = ``;
    latestNews.innerHTML = ``;
    entertainmentNews.innerHTML = ``;
    smallNews.innerHTML = ``;
    const newsFound = document.getElementById('news-found');
    if(news.length > 0){
        newsFound.innerText = `${news.length} items found in this category.`;
    }
    else{
        newsFound.innerText = 'No news found.';
    }
    let cnt = 1;
    for(const data of news){
        const details = data.details.slice(0, 350);
        const divNews = document.createElement('div');
        const headingDiv = document.createElement('div');
        const latestDiv = document.createElement('div');
        const smallDiv = document.createElement('div');
        divNews.classList.add('card', 'lg:card-side', 'bg-base-100', 'shadow-xl', 'h-72', 'mb-3', 'hover:scale-[1.03]', 'transition-all', 'duration-300', 'ease-in-out','cursor-pointer');
        headingDiv.classList.add('carousel-item', 'w-full');
        latestDiv.classList.add('card', 'w-96','hover:shadow-xl');
        smallDiv.classList.add('card', 'w-64','h-1/4','hover:shadow-xl');
        divNews.innerHTML = `
            <figure class="w-2/5">
                <img class="h-72 object-fill"
                src="${data.image_url}"
                alt="Album"
                />
            </figure>
            <div class="card-body w-3/5">
                <h2 class="card-title">${data.title}</h2>
                <p class="text-sm text-gray-600">
                ${details+'...'}
                </p>
                <div class="flex justify-between">
                    <div class="flex gap-2">
                        <img class="w-12 h-12 rounded-full object-fill" src="${data.author.img}" alt="" />
                        <div>
                            <p>${data.author.name ? data.author.name: 'No name found'}</p>
                            <p>${data.author.published_date ? data.author.published_date : "Not mentioned"}</p>
                        </div>
                    </div>
                    <div class="flex justify-between w-96">
                        <div><i class="fa-regular fa-eye"></i> ${data.total_view ? data.total_view : '0'}</div>
                        <div>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                            </div>
                            <i class="fa-solid fa-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        headingDiv.innerHTML = `
        <div
          class="card w-full h-96 bg-base-100 shadow-xl image-full"
        >
          <figure>
            <img class="object-fill w-full"
              src="${data.image_url}"
            />
          </figure>
          <div class="card-body pt-72">
            <h2 class="card-title">${data.title}</h2>
            <p class="text-sm text-gray-300">${data.author.published_date ? data.author.published_date : "Not mentioned"}</p>
          </div>
        </div>
        `;
        latestDiv.innerHTML = `
        <figure>
          <img
            src="${data.image_url}"
          />
        </figure>
        <div class="card-body">
          <h2 class="card-title">${data.title}</h2>
          <div class="card-actions justify-start">
            <p class="text-sm text-gray-400">CNN Indonasia</p>
          </div>
        </div>
        `;
        smallDiv.innerHTML = `
        <figure class="h-24">
          <img
            src="${data.image_url}"
          />
        </figure>
        <div class="card-body">
          <h2 class="text-xl">${data.title.slice(0,60)+'...'}</h2>
          <div class="card-actions justify-start">
            <p class="text-sm text-gray-400">CNN Indonasia</p>
          </div>
        </div>
        `;
        entertainmentNews.appendChild(divNews);
        headingNews.appendChild(headingDiv);
        if(cnt <= 4){
            latestNews.appendChild(latestDiv);
            smallNews.appendChild(smallDiv);
        }
        cnt++;
    }
    progress.classList.add('hidden');
}

const changeVisibility = homeVisible =>{
    const newsSection = document.getElementById('news-section');
    const homeSection = document.getElementById('Home-section');
    if(homeVisible){
        homeSection.classList.remove('hidden');
        newsSection.classList.add('hidden');
    }
    else{
        homeSection.classList.add('hidden');
        newsSection.classList.remove('hidden');
    }
}

const worldNewsShow = news =>{
    const worldNews = document.getElementById('world-carousel');
    worldNews.innerHTML = ``;
    for(const data of news){
        const worldDiv = document.createElement('div');
        worldDiv.classList.add('carousel-item', 'w-1/3');
        worldDiv.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img
              src="${data.image_url}"
            />
          </figure>
          <div class="card-body">
            <h2 class="card-title">${data.title}</h2>
          </div>
        </div>
        `;
        worldNews.appendChild(worldDiv);
    }
}


const worldNewsLoad = () =>{
    url = 'https://openapi.programming-hero.com/api/news/category/03';
    fetch(url)
    .then(res => res.json())
    .then(data => worldNewsShow(data.data))
    .catch(err => console.log(err));
}


document.getElementById('breaking-news').addEventListener('click',function(){
    changeUrl('01');
    changeVisibility(false);
});

document.getElementById('Regular-news').addEventListener('click',function(){
    changeUrl('02');
    changeVisibility(false);
});

document.getElementById('International').addEventListener('click',function(){
    changeUrl('03');
    changeVisibility(false);
});

document.getElementById('Sports').addEventListener('click',function(){
    changeUrl('04');
    changeVisibility(false);
});

document.getElementById('Entertainment').addEventListener('click',function(){
    changeUrl('05');
    changeVisibility(false);
});

document.getElementById('Culture').addEventListener('click',function(){
    changeUrl('06');
    changeVisibility(false);
});

document.getElementById('Arts').addEventListener('click',function(){
    changeUrl('07');
    changeVisibility(false);
});

document.getElementById('All-news').addEventListener('click',function(){
    changeUrl('08');
    changeVisibility(false);
});

document.getElementById('Home').addEventListener('click',function(){
    changeUrl('08');
    changeVisibility(true);
    worldNewsLoad();
});

changeUrl('08');
changeVisibility(true);
worldNewsLoad();


