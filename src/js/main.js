import { loadPage, setNavigation } from "./home.js";
import { buildProducts } from "./home.js";

function router() {
  const hash = location.hash.replace("#", "");
  const hashPage = hash || "home";
  if(document.querySelectorAll("#header-menu > a")){
    let menuItem = document.querySelectorAll("#header-menu > a")
    for(let item of menuItem){
      item.classList.remove("active-menu");
      if(item.dataset.page == hashPage)item.classList.add("active-menu")
    }}
  loadPage(hashPage);
}

window.addEventListener("hashchange", ()=>{
  router();
  globalThis.scrollTo(0, 0);
}
);

export async function createPath(pageName, element){
  const response = await fetch(`/fundamentals-project-template/src/html/${pageName}.html`)
  const data = await response.text()
  element.innerHTML = data
}



window.scrollTo(0, 0)
setNavigation()
buildProducts("/fundamentals-project-template/src/assets/data.json")
    //   showQuantityInCart()















