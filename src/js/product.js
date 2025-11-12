import { createPath } from "./main.js";
import { addProductToCart } from "./cart.js";

export function buildCard(item) {     
  const div = document.createElement("div"); 
  div.dataset.id = item.id;   
  div.className = "product";
  const photoSaleBlock = document.createElement("div");
  photoSaleBlock.className ="photo-sale-block"
  const photo = document.createElement("img")
  photo.src = `/fundamentals-project-template/src/assets/img/${item.imageUrl}`
  photo.alt = item.name;
  photo.loading = "lazy"
  const nameTag = document.createElement("h6");
  nameTag.textContent = item.name;
  const priceTag = document.createElement("p")
  priceTag.className = "price";
  priceTag.textContent = `$${item.price}`
  photoSaleBlock.append(photo);
  div.append(photoSaleBlock)
  div.append(nameTag);
  div.append(priceTag)
  if (item.salesStatus) {
    const salesBtn = document.createElement("button");
    salesBtn.textContent = "Sale";
    salesBtn.className = "sale-button";
    photoSaleBlock.append(salesBtn)
  }
  return div
}

export function createButton() {
  const addToCardBtn = document.createElement("button");
  addToCardBtn.className = "add-to-cart"
  return addToCardBtn
}

export async function viewProduct(id){
  
  let prodCartPage = document.querySelector("#main-content")
  document.querySelector("#home").style.display = "none";
  prodCartPage.style.display="block"
  await createPath("components","product-card", prodCartPage)
   
  showProductDetail(id)
  const addBtn = document.querySelector("#add");
  const subBtn = document.querySelector("#subtract");
  const quantity = document.querySelector("#quantity");
  
  addBtn.addEventListener("click", ()=>{
    quantity.textContent = Number(quantity.textContent) +1
  });
  subBtn.addEventListener("click", ()=>{
    if(quantity.textContent == 1)return
    quantity.textContent = Number(quantity.textContent) -1
  }) 

}

function showProductDetail(id){  
  const prodDetailsBtns = document.querySelectorAll("#product-detais-btns > button");
  const prodDetailsInfo = document.querySelectorAll(".prod-info");
  const rating = document.querySelector("#stars-rating")
  const sizeOption = document.querySelectorAll("#size > option")
  const addToCart = document.querySelector("#add-to-cart");
  const img = document.querySelector("#main-img")
  addToCart.addEventListener("click", (event)=>{
    addProductToCart(event.target.parentElement)
  })

  fetch("/src/assets/data.json")
    .then(res => res.json())
    .then(response =>{
      let prod = response.data
      let current = prod.find(item=>{
        return item.id == id
      })

      if(current.size.length == 1){
        for(let item of sizeOption){
          item.disabled = item.value !== current.size;
        }
      }
      img.src=`/fundamentals-project-template/src/assets/img/${current.imageUrl}`
      img.dataset.info = current.imageUrl
      document.querySelector("#product-details-title").textContent = current.name;
      document.querySelector("#product").dataset.id = current.id
      
      for(let i=0;i<current.rating; i++){
        let span = document.createElement("span")
        span.innerHTML = createSvgIcon("ful-star")
        rating.append(span)
        span.querySelector("svg").classList.add("rating-icon")
         
      }
      if(current.rating<5){
        for(let i = current.rating; i<=5;i++){
          let span = document.createElement("span");
          span.innerHTML = createSvgIcon("empty-star")
          rating.append(span)
          span.querySelector("svg").classList.add("rating-icon")
        }
      }
      document.querySelector("#clients-review").textContent = `(${current.popularity} clients reviw)`
      document.querySelector("#price").textContent = `$${current.price}`

      for(let i =0; i<4; i++){
        let randomId = Math.floor(Math.random()* prod.length);
        let product =  buildCard(prod[randomId]);
        let button = createButton();
        button.textContent = "Add To Card";
        button.addEventListener("click", (e)=>viewProduct(e.target.parentElement.dataset.id))
        product.append(button)
        document.querySelector("#also-like-products").append(product)
      }
    });  

  for(let btn of prodDetailsBtns){
    btn.addEventListener("click", (e)=>{
      if(e.target.classList.value == "active-button")return
      for(let item of prodDetailsBtns)item.classList.remove("active-button");
      for(let item of prodDetailsInfo)item.style.display="none"
      e.target.classList.add("active-button")
      document.querySelector(`#${e.target.id}-block`).style.display = "flex"  
    })
  }    
}

export function createSvgIcon(val){
  return `<svg>
<use href='/src/assets/sprite.svg#${val}'>
</use></svg>` 
 
}
