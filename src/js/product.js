
import { showError, openCart, changeQuantityInCardIcon, findIndexCurrentElem } from "./cart.js";

import { viewProduct } from "./product-card.js";


export function buildCard(item) {     
   
  const div = document.createElement("div"); 
  div.dataset.id = item.id;   
  div.className = "product";
  const photoSaleBlock = document.createElement("div");
  photoSaleBlock.className ="photo-sale-block"
  photoSaleBlock.addEventListener("click", ()=>viewProduct(item.id))
  const photo = document.createElement("img")
  photo.src = `assets/img/${item.imageUrl}`
  photo.alt = item.name;
  photo.loading = "lazy"
  const nameTag = document.createElement("h6");
  nameTag.textContent = item.name;
  nameTag.addEventListener("click", ()=>viewProduct(item.id))
  const priceTag = document.createElement("p")
  priceTag.className = "price";
  priceTag.textContent = `$${item.price}`
  photoSaleBlock.append(photo);
  div.append(photoSaleBlock)
  div.append(nameTag);
  div.append(priceTag)
  if (item.salesStatus) {
    const sale = document.createElement("span");
    sale.textContent = "Sale";
    sale.className = "sale";
    photoSaleBlock.append(sale)
  }
  return div
}

export function createButton() {
  const addToCardBtn = document.createElement("button");
  addToCardBtn.className = "add-to-cart"
  return addToCardBtn
}


export function createSvgIcon(val){
  return `<svg>
<use href='/src/assets/sprite.svg#${val}'>
</use></svg>` 
}

export function addProductToCart(element){
  
  const price = element.querySelector("#price").textContent;
  const size = document.querySelector("#size");
  const color = document.querySelector("#color");
  const category = document.querySelector("#category");
  const priceNumber = price.slice(1)
  let quantity = Number(element.querySelector("#quantity").textContent)
  let quantityInCard = document.querySelector("#quantity-in-card")

  showError(element);

  if(size.value == ""||color.value == ""||category.value ==""){
    return;
  }

  const product = {
    id: element.dataset.id,
    name: element.querySelector("#product-details-title").textContent,
    img: element.querySelector("#main-img").dataset.info,
    quantity: quantity,
    price: priceNumber,
    size: size.value,
    color: color.value,
    category: category.value,
    total: quantity * priceNumber,
   
  }
 
  const cartItems = JSON.parse(localStorage.getItem("product")) || [];
  const existingProductIndex = findIndexCurrentElem(cartItems, product)

  if(existingProductIndex > -1){
    let carentQuantity = Number(cartItems[existingProductIndex].quantity)
    cartItems[existingProductIndex].quantity = carentQuantity + quantity
  }else{
    cartItems.push(product)
  }

  localStorage.setItem("product", JSON.stringify(cartItems))
  changeQuantityInCardIcon(quantityInCard, quantity);
  document.querySelector("#open-cart").addEventListener("click", ()=>{
    openCart()
  })
}


export function buildBestSetsProducts(item) {

  const bestSetsSection = document.querySelector("#best-sets");
  if(item.category === "luggage sets") {
 if(bestSetsSection.querySelectorAll(".best-set-card").length == 5)return    

      const card = document.createElement("div");
      card.classList.add("best-set-card");
      bestSetsSection.append(card);
      const img = document.createElement("img");
      img.alt = item.name;
      img.loading = "lazy"
      img.classList.add("best-set-img")
      img.src = `assets/img/best-set-${item.color}.png`
      card.append(img);
      const descriptionTag = document.createElement("p");
      descriptionTag.className = "best-set-description"
      descriptionTag.textContent = item.description;    
      const priceTag = document.createElement("p");
      priceTag.classList.add("best-set-price")
      priceTag.textContent = `$${item.price}`;
      const rating = document.createElement("div");
      rating.classList.add("best-set-rating")
      card.append(descriptionTag);
      card.append(showProductRating(item, rating));
      card.append(priceTag);
       
     card.addEventListener("click", ()=>{viewProduct(item.id)})
    } 
} 

function showProductRating(item, rating){
  
  for(let i=0;i<item.rating; i++){
        let span = document.createElement("span")
        span.innerHTML = createSvgIcon("ful-star")
        rating.append(span)
        span.querySelector("svg").classList.add("rating-icon")
         
      }
      if(item.rating<5){
        for(let i = item.rating; i<=5;i++){
          let span = document.createElement("span");
          span.innerHTML = createSvgIcon("empty-star")
          rating.append(span)
          span.querySelector("svg").classList.add("rating-icon")
        }
}
return rating
  }