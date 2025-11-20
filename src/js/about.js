import { loadPage, showActivePage } from "./home.js"


document.querySelector("#about-us-from-footer").addEventListener("click", ()=>{
    loadPage("about")
    showActivePage("about")})

export function aboutHandler(){
      loadPage("catalog")
      showActivePage("catalog")

}