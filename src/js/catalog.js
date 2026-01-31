import { createButton, buildCard, buildBestSetsProducts} from "./product.js";

import { viewProduct } from "./product-card.js";

let page = 1;
let itemsOnPage = 12;
let products = [];
let prodList = []
let sortedProd = [];

export function showProducts(){

  const sorting = document.querySelector("#sorting");
  const searching =  document.querySelector("#searching");
  const filters = document.querySelector("#filters");
  const filterBtn = document.querySelector("#filter-button");
  const hideBtn =  document.querySelector("#hide-btn")
  const categoryInput = document.querySelector("#category-filter");
  const colorInput = document.querySelector("#color-filter");
  const sizeInput = document.querySelector("#size-filter");
  const sale= document.querySelector("#sale");

  fetch("./src/assets/data.json")
    .then(res => res.json())
    .then(result => {
      products = prodList= result.data;
      renderPage(prodList, page, );
      for(let item of products)buildBestSetsProducts(item)
    })
 
  filterBtn.addEventListener("click", (e)=>{
    sorting.style.display = "none";
    searching.style.display = "none";
    filters.style.display = "flex";
    e.target.style.display = "none"
  })

  hideBtn.addEventListener("click", ()=>{
    sorting.style.display = "flex";
    searching.style.display = "flex";
    filterBtn.style.display = "block"
    filters.style.display = "none";
  })
   
  sale.addEventListener("click",(e)=>{
    prodList = []
    if(sale.checked){
      prodList = products.filter(item =>{
      return item.salesStatus 
    })
      renderPage(prodList, page)
      e.stopPropagation()
    }else{sale.checked=false
      renderPage(products, page)
    }}, true)

  let dropDownElements =  document.querySelectorAll(".dropdown li")
  for(let item of dropDownElements){
    item.addEventListener("click", (e)=>{
      dropDownElements.forEach(el=>el.classList.remove("active"))
      e.target.classList.add("active")
      prodList = products.toSorted(compareProductsByPrice);
      sortedProd = prodList

      if(e.target.dataset.sort=="price-asc"){
        renderPage(prodList, page) }

      if(e.target.dataset.sort=="price-desc"){
        prodList= sortedProd.toReversed()
        renderPage(prodList, page)}

      if(e.target.dataset.sort=="popularity"){
        prodList = products.toSorted(compareProductsByPopularity)
        renderPage(prodList, page)}

      if(e.target.dataset.sort=="rating"){
        prodList = products.toSorted(compareProductsByRating)
        renderPage(prodList, page)}
    })
  }

  document.querySelector("#search").addEventListener("keydown", (e)=>{
    if(e.key == "Enter"){
      products.forEach(item => {
        if(e.target.value == "")return
        if(e.target.value == item.name){
        viewProduct(item.id)
      }
      })
    }
  })

  colorInput.addEventListener("input", ()=>{
    filterProducts(categoryInput, colorInput, sizeInput)
  });
  categoryInput.addEventListener("input", ()=>{
   filterProducts(categoryInput, colorInput, sizeInput)
  })
  sizeInput.addEventListener("input", ()=>{
  filterProducts(categoryInput, colorInput, sizeInput)
  })


  document.querySelector("#clear-btn").addEventListener("click", ()=>{
    colorInput.value = "";
    categoryInput.value = "";
    sizeInput.value ="";
    sale.checked=false;
    renderPage(products, page)
  })
}

 function renderPage(list, page) {

  const container = document.querySelector("#list");
  const currentPage = document.querySelector("#page");
  const prevPage = document.querySelector("#prev-page")
  const nextPage = document.querySelector("#next-page"); 
  const prevBtn = document.querySelector("#previous-page-btn");
  const nextBtn = document.querySelector("#next-page-btn");  

  container.innerHTML = "";
  if(list.length < itemsOnPage){ 
      itemsOnPage = list.length
  }else{ itemsOnPage = 12}
  const start = (page - 1) * itemsOnPage;
  const end = start + itemsOnPage;
  const currentItems = list.slice(start, end);
  if (currentItems.length === 0) {
      container.innerHTML = "<p>No products found.</p>";
      return;
    }

  for(let cur of currentItems){
    const addToCardBtn = createButton()
    addToCardBtn.textContent = "View Product";
    addToCardBtn.addEventListener("click", ()=>{
    viewProduct(cur.id)
      })
    const item = buildCard(cur)
    item.append(addToCardBtn)
    container.appendChild(item);
    };

    currentPage.textContent = page;
    currentPage.classList.add("active-page")
    if(page > 1 ){
      prevPage.style.display = "inline-flex"
      prevPage.textContent = page-1
    }
    if(list.length > currentItems.length){
      nextPage.style.display = "inline-flex"
      nextPage.textContent = page + 1
    }
    if(end>= list.length)nextPage.style.display = "none"
    toggleButtons(prevBtn, prevPage, nextBtn)
    document.querySelector("#showing-pages").textContent = `Showing 1-${currentItems.length} Of ${list.length} Results`
  }

function toggleButtons(prevButton, prevPage, nextButton) {
    if(page === 1){
      prevButton.style.visibility = "hidden"; 
      prevPage.style.display = "none"
    }

    prevButton.addEventListener("click", ()=>{
      if(page > 1){
        page--;
        renderPage(prodList, page)
      }})

    nextButton.addEventListener("click", ()=>{
      if(page*itemsOnPage <prodList.length){
        page++
        renderPage(prodList, page)
        prevButton.style.visibility = "visible"
      }
    })
  }

function filterProducts(categoryData, colorData, sizeData ){
    let category = categoryData.value.trim().toLowerCase();
    let color = colorData.value.trim().toLowerCase();
    let size = sizeData.value.trim().toLowerCase();
        
    const filtered = products.filter(prod=>{
      const matchesCategory = !category || prod.category.toLowerCase() == category
      const matchesColor = !color || prod.color.toLowerCase() == color;
      const matchesSize = !size || prod.size.toLowerCase() == size;
      return matchesCategory && matchesColor && matchesSize
    })
     renderPage(filtered, page)
  }


function compare(a, b){
  if(a>b) return 1
  if(a==b) return 0
  if(a<b)return -1
}
 function compareProductsByPrice(a, b){
  return compare(a.price, b.price)
};

 function compareProductsByPopularity(a,b){
  return compare(a.popularity, b.popularity)
};

 function compareProductsByRating(a, b){
  return compare(a.rating, b.rating)
}



