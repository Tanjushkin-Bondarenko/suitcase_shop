import { createPath } from "./main.js";
import { createButton, buildCard } from "./product.js";

const slides = document.querySelector("#goods-block");
let position =0
let direction = 1

const mainContent = document.querySelector("#main-content");
const homePage = document.querySelector("#home");


document.querySelector("#logo").addEventListener("click", ()=>logohendler(mainContent, homePage))
document.querySelector("#login").addEventListener("click", showLoginWindow)
    
   
document.querySelector("#about-us-from-footer").addEventListener("click", ()=>{
    loadPage("about")
    showActivePage("about")})
    
document.querySelector("#contact-from-footer").addEventListener("click", ()=>{
    loadPage("contact")
    showActivePage("contact")})

document.querySelector("#view-all").addEventListener("click", ()=>{
  loadPage("catalog");
  showActivePage("catalog")
});
 
export async function loadPage(page) {  
  if(page === "home"){
    mainContent.style.display = "none";
    homePage.style.display = "block";
  }else{
    mainContent.style.display = "block";
    homePage.style.display = "none";
    await createPath(page, mainContent)
    
  }
//   if(page=="catalog")showProducts()
  if(page =="about"){
    document.querySelector("#see-all").addEventListener("click", ()=>{
      loadPage("catalog")
      showActivePage("catalog")
    }) }
//   if(page=="contact")checkValidityEmail()
  
}
function showActivePage(val){
  let menuItems = document.querySelectorAll("#header-menu a")
  for(let item of menuItems)item.classList.remove("active-menu");
  document.querySelector(`#${val}`).classList.add("active-menu")
}

export function setNavigation() {
  const pages = document.querySelectorAll("a[data-page]")
  const menu = document.querySelector("#header-menu")
  if(!menu.querySelector(".active-menu"))menu.querySelector("#home-page").classList.add("active-menu")
  for(let item of pages){item.addEventListener("click", (e) => {
    for(let p of pages)p.classList.remove("active-menu")
    e.target.classList.add("active-menu")
    if (e.target.matches("a[data-page]")) e.preventDefault();
    let page = e.target.dataset.page;
    globalThis.location.hash = page;
    loadPage(page)
  })
  }
}

function logohendler(elment1,element2 ){   
  elment1.style.display = "none";
  element2.style.display = "block";
  showActivePage("home-page")    
} 

function showLoginWindow(){
  const popup = document.querySelector("#popup");
  popup.style.display = (popup.style.display == "none") ? "block" :  "none";
  document.querySelector("#togle-password").addEventListener("click", toglePassword)
}

function toglePassword(){
  const passwordInput = document.querySelector("#password");
  const isVisible = passwordInput.type === "text";
  passwordInput.type = isVisible ? "password" : "text"
}


function showNextSlide() {
  position += direction * 10;
  if (position >= 90) direction = -1; 
  if (position <= -100) direction = 1;
  slides.style.transform = `translateX(${position}%)`;
  
}

setInterval(showNextSlide, 1000)

export function buildProducts(url){
    fetch(url)
    .then(res => res.json())
    .then(result => {      
      result.data.map(item => {
        if (item.blocks.includes("Selected Products")) {
          const addToCardBtn = createButton()
          addToCardBtn.textContent = "Add to card";
          let productCard = buildCard(item)
          productCard.append(addToCardBtn)
          document.querySelector("#selected").append(productCard);
        //   addToCardBtn.addEventListener("click", (e)=>viewProduct(e.target.parentElement.dataset.id))
        }
        if (item.blocks.includes("New Products Arrival")) {
          const addToCardBtn = createButton()
          addToCardBtn.textContent = "View Product";
          addToCardBtn.classList.add("view");
          let productCard = buildCard(item)
          productCard.append(addToCardBtn)
          document.querySelector("#new").append(productCard);
        //   addToCardBtn.addEventListener("click", (e)=>{
        //     viewProduct(e.target.parentElement.dataset.id)})
        }
      });  
    })

}