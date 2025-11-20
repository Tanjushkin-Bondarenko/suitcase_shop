import { createPath } from "./main.js";
import { createSvgIcon } from "./product.js";
import {loadPage} from "./home.js";


export async function openCart(){

  const cart = document.querySelector("#main-content");
  document.querySelector("#home").style.display = "none";
  cart.style.display = "flex"
  await createPath("cart", cart)
  const cartProducts = document.querySelector("#product-in-cart");
  const subTotal = document.querySelector("#sub-total-sum");
  const emptyCart =  document.querySelector("#empty-cart-isnfo");
  const clearCartBtn =  document.querySelector("#clear-cart");
  document.querySelector("#continue-shopping").addEventListener("click",()=> loadPage("catalog"));
  let sum = 0

  let products = JSON.parse(localStorage.getItem("product"))
  const arrProd = products.map(prod=> buildProductInCart(prod));

  for(let el of arrProd){
    cartProducts.append(el)
  }

  arrProd.forEach(p=>{cartProducts.append(p)})  
  products.map(el=> sum+= el.total)
  if(sum == 0){
    emptyCart.style.display = "block";
    clearCartBtn.style.display = "none" 
  }
  showSumToPay(sum, subTotal)
  let container =  document.querySelectorAll(".prouct-container")
  clearCartBtn.addEventListener("click", ()=>{
    clearCart(container);
    emptyCart.style.display = "block"
  })
  
  document.querySelector("#checkout").addEventListener("click", ()=>{
    if( emptyCart.style.display == "block")return
    clearCart(container)
    document.querySelector("#thanks").style.display="block"
  })
}

function showSumToPay(val, node){
  
  const total = document.querySelector("#total-sum");
  const sumDiscont = document.querySelector("#discont-sum"); 
  const discont = document.querySelector("#discont");

  node.textContent = `$${val}`;
  let totalSum = 0
  let sumOfDiscont = (val*0.01).toFixed(2)
  if(val>3000){
    discont.style.display = "flex";
    sumDiscont.textContent = `$${sumOfDiscont}`
    totalSum = val + 30 - sumOfDiscont;
  }else{
    discont.style.display = "none";
    totalSum = val + 30
  }
  total.textContent = `$${totalSum}`
  if(val==0){
    total.textContent =""
    document.querySelector("#ship-sum").textContent = ""
    document.querySelector("#sub-total-sum").textContent = ""
  }
}


export function showError(element){
  const selected =  element.querySelectorAll("select")
  for(let el of selected){
    if(el.value == ""){
      el.nextElementSibling.style.display = "block";
        
    }else{
      el.nextElementSibling.style.display = "none"
    }
  }
}

export function changeQuantityInCardIcon(element, num){
  if(element.style.visibility == "hidden"){
    element.style.visibility = "visible"
    element.textContent= num  
  }else{
    let infoInCard = Number(element.textContent)
    element.textContent = infoInCard + +num
  }
}

function buildProductInCart(productData){
  let products = JSON.parse(localStorage.getItem("product"))
  const productContainer = document.createElement("div");
  let currentTotalPrice = +((productData.quantity * Number(productData.price)).toFixed(2))
  let quantityInCard = document.querySelector("#quantity-in-card")

  productContainer.classList.add("prouct-container");
  const productImg = document.createElement("img")
  productImg.src = `/src/assets/img/${productData.img}`;
  productImg.alt = productData.name;
  productImg.loading = "lazy"
  
  const productName = document.createElement("p");
 productName.classList.add("product-name")
 productName.textContent = productData.name
  const productPrice = document.createElement("p");
  productPrice.textContent = `$${productData.price}`;
  const quantityDiv = document.createElement("div");
  quantityDiv.classList.add("quantity-block")
  const productQuantity = document.createElement("span");
  productQuantity.textContent = productData.quantity;
  const buttonAdd = document.createElement("button");
  const total = document.createElement("span");
  total.classList.add("current-total-price")
  buttonAdd.textContent = "+";

  buttonAdd.addEventListener("click", ()=>{
    increase(productQuantity, total, quantityInCard, productData)}) 

  const buttonSub = document.createElement("button");
  buttonSub.textContent="-";
  buttonSub.addEventListener("click", ()=>{
    decrease(productQuantity, total, quantityInCard, productData)})
        
  quantityDiv.append(buttonSub);
  quantityDiv.append(productQuantity);
  quantityDiv.append(buttonAdd);
        
  total.textContent = `$${currentTotalPrice}`
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn")
  deleteBtn.innerHTML = createSvgIcon("trash-can");
       
  deleteBtn.addEventListener("click", ()=>{
    deleteItem(quantityInCard, productData,products, productContainer) })

  productContainer.appendChild(productImg)
  productContainer.appendChild(productName)
  productContainer.appendChild(productPrice)
  productContainer.appendChild(quantityDiv)
  productContainer.appendChild(total)
  productContainer.appendChild(deleteBtn)
  return productContainer
}

export function showQuantityInCart(){
  let quantityProductsInCart = document.querySelector("#quantity-in-card");
  let saveProducts = JSON.parse(localStorage.getItem("product")) || [];
  let sum = saveProducts.reduce((acc, item)=>{
    return acc + Number(item.quantity)
  }, 0)

  if(quantityProductsInCart.style.visibility == "hidden" && sum>0){
    quantityProductsInCart.style.visibility = "visible"
    quantityProductsInCart.textContent = sum;
    document.querySelector("#open-cart").addEventListener("click", ()=>openCart())
  } 
   
}

export function deleteItem(cart, item,array, node){
  cart.textContent = cart.textContent - item.quantity;
  if(cart.textContent == 0)cart.style.visibility = "hidden" 
  let curentIndex = findIndexCurrentElem(array, item)
  array.splice(curentIndex, 1)
  localStorage.setItem("product", JSON.stringify(array))
  const subTotal = document.querySelector("#sub-total-sum");
  let updateSum = Number((subTotal.textContent).substring(1)) - item.total;
  showSumToPay(updateSum, subTotal)
  node.remove()
        
  if(document.querySelectorAll("#product-in-cart > div").length == 0){
    document.querySelector("#empty-cart-isnfo").style.display = "block";
  }
}

export function increase(nodeQuantity, nodeTotal, nodeCart, element){
  let updateQuantity = Number(nodeQuantity.textContent)+1
  nodeQuantity.textContent = updateQuantity;
  let updatePrice = updateQuantity*element.price
  nodeTotal.textContent = `$${updatePrice}`
  updateLocalStorige(element, updateQuantity, updatePrice)
  nodeCart.textContent = Number(nodeCart.textContent) +1

  const subTotal = document.querySelector("#sub-total-sum");
  let updateSum = Number((subTotal.textContent).substring(1)) + +element.price;
  showSumToPay(updateSum, subTotal)
}

export function decrease(nodeQuantity, nodeTotal, nodeCart, element){
  if(nodeQuantity.textContent == 1)return
  else{ let updateQuantity = nodeQuantity.textContent = nodeQuantity.textContent - 1;
    let updatePrice = updateQuantity * element.price
    nodeTotal.textContent = `$${updatePrice}`
    updateLocalStorige(element, updateQuantity, updatePrice)
    nodeCart.textContent = nodeCart.textContent -1
    const subTotal = document.querySelector("#sub-total-sum");
    let updateSum = (subTotal.textContent).substring(1) - element.price;
    showSumToPay(updateSum, subTotal)

  }
}

export  function clearCart(elements) {
  localStorage.removeItem("product");
  for(let el of elements)el.remove()
  localStorage.removeItem("product");
  
  document.querySelector("#sub-total-sum").textContent = "";
  document.querySelector("#discont").style.display = "none"
  document.querySelector("#ship-sum").textContent = "";
  document.querySelector("#total-sum").textContent = ""
  document.querySelector("#quantity-in-card").style.visibility="hidden"
  if(document.querySelector("#thanks").style.display == "block"){
    document.querySelector("#thanks").style.display ="none"}
    
}

function getCurrenElmentInLocalStorige(item, data){
  let current =  data.filter(element => 
    element.id  ===item.id  &&
    element.size  === item.size  && 
    element.color  === item.color &&
    element.category  === item.category)
  return current
}

 function updateLocalStorige(item, newVal1, newVal2){
  let saveProducts = JSON.parse(localStorage.getItem("product")) || []
  let updateEl = getCurrenElmentInLocalStorige(item, saveProducts)[0]
  let index = findIndexCurrentElem(saveProducts, item)
  
  if(index !== -1){
    updateEl.total = newVal2;
    updateEl.quantity = newVal1;
    
    localStorage.setItem("product", JSON.stringify(saveProducts))
  }
}

 export function findIndexCurrentElem(array, item){
  let index= array.findIndex(el=>
    el.id  === item.id &&
    el.size  === item.size  && 
    el.color  === item.color &&
    el.category  === item.category)
  return index
}