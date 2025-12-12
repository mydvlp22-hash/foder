// ===== Scroll Button =====
const scrollBtn=document.getElementById("scrollTop");
window.addEventListener("scroll",()=>scrollBtn.style.display=window.scrollY>200?"flex":"none");
scrollBtn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));

// ===== Side Menu =====
const menuBtn=document.getElementById("menuBtn");
const sideMenu=document.getElementById("sideMenu");
const overlay=document.getElementById("overlay");
menuBtn.onclick=()=>{sideMenu.classList.add("active");overlay.classList.add("active");};
overlay.onclick=()=>{sideMenu.classList.remove("active");overlay.classList.remove("active");};

// ===== Dark Mode =====
const darkToggle=document.getElementById("darkToggle");
darkToggle.addEventListener("click",()=>{
  document.body.classList.toggle("dark");
  darkToggle.textContent=document.body.classList.contains("dark")?"☀️":"🌙";
  localStorage.setItem("darkMode",document.body.classList.contains("dark")?"true":"false");
});
if(localStorage.getItem("darkMode")==="true"){document.body.classList.add("dark");darkToggle.textContent="☀️";}

// ===== Search Toggle =====
const searchIcon=document.getElementById("searchIcon");
const searchBoxContainer=document.getElementById("searchBoxContainer");
const searchClose=document.getElementById("searchClose");
const searchInput=document.getElementById("searchBox");
searchIcon.addEventListener("click",()=>{searchBoxContainer.classList.toggle("active"); if(searchBoxContainer.classList.contains("active")) searchInput.focus(); else searchInput.value="";});
searchClose.addEventListener("click",()=>{searchBoxContainer.classList.remove("active");searchInput.value="";});

// ===== Live Search & Continue Watching Hide =====
const cards = document.querySelectorAll(".card");
searchInput.addEventListener("keyup", () => {
  const query = searchInput.value.toLowerCase();
  let anyVisible = false;
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const desc = card.dataset.description.toLowerCase();
    const match = title.includes(query) || desc.includes(query);
    card.style.display = match ? "block" : "none";
    if(match) anyVisible = true;
  });

  // Hide Continue Watching if any search input
  if(searchInput.value.trim() !== "") {
  continueSection.style.display = "none";
} else {
  continueSection.style.display = "block";
}
});


// ===== Category Filter =====
document.querySelectorAll("#categoryList li").forEach(cat=>{
  cat.addEventListener("click",()=>{
    const category=cat.textContent.trim();
    cards.forEach(card=>{
      const matchesCategory=(category==="All" || card.dataset.category===category);
      const matchesSearch=(searchInput.value==="" || card.dataset.description.toLowerCase().includes(searchInput.value.toLowerCase()) || card.dataset.title.toLowerCase().includes(searchInput.value.toLowerCase()));
      card.style.display=(matchesCategory && matchesSearch)?"block":"none";
    });
    sideMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
});

// ===== Continue Watching Feature =====
const continueWatchContainer = document.getElementById("continueWatch");
let continueWatchList = JSON.parse(localStorage.getItem("continueWatch")) || [];
function renderContinueWatch(){
  continueWatchContainer.innerHTML = "";
  continueWatchList.forEach(item=>{
    const card = document.createElement("div");
    card.classList.add("watch-card");
    card.dataset.title = item.title;
    card.dataset.description = item.description;
    card.innerHTML = `<a href="${item.link}"><img src="${item.img}" alt="${item.title}"></a><h4>${item.title}</h4>`;
    continueWatchContainer.appendChild(card);
  });
}
renderContinueWatch();

cards.forEach(card=>{
  card.addEventListener("click", e=>{
    const imgElement = card.querySelector("img");
    const movieImage = imgElement.dataset.src || imgElement.src;
    const movie = { 
      title: card.dataset.title, 
      description: card.dataset.description, 
      link: imgElement.parentElement.href, 
      img: movieImage
    };
    continueWatchList = continueWatchList.filter(c=>c.link !== movie.link);
    continueWatchList.unshift(movie);
    if(continueWatchList.length>10) continueWatchList.pop();
    localStorage.setItem("continueWatch",JSON.stringify(continueWatchList));
    renderContinueWatch();
  });
});

// ===== Fullscreen Popup for gallery & continue-watch =====
function setupPopup(selector) {
  const container = document.querySelector(selector);
  container.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    e.preventDefault();
    const url = link.href;

    const popup = document.createElement("div");
    popup.classList.add("fullscreen-popup");

    const button = document.createElement("div");
    button.classList.add("wait-button");
    button.innerHTML = `Please Wait <span>.</span><span>.</span><span>.</span>`;

    popup.appendChild(button);
    document.body.appendChild(popup);

    setTimeout(() => { window.location.href = url; }, 1000); // redirect after 1s
    setTimeout(() => { popup.remove(); }, 5000); // remove popup after 5s
  });
}

// Attach popup to both gallery and continue-watch
setupPopup("#gallery");
setupPopup("#continueWatch");