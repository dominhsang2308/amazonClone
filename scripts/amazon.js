import { products } from "../data/products.js"
import { cart } from "../data/cart.js"

let productHTML = ''

products.forEach((product) => {
    productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select class = "product-quantity js-cart-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-to-cart-msg-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `
})

//Show the html to website
document.querySelector('.js-products-grid').innerHTML = productHTML
//------------------------------------------------------------------//
//Logic

function addToCart(productId){
  const quantityProduct = document.querySelector(`.js-cart-quantity-${productId}`).value
  const numberQuantityProduct = Number(quantityProduct)
  let matchingItem 

  cart.forEach((item) => {
    if(productId === item.productId){
      matchingItem = item
    }
  })

  if(matchingItem){
    matchingItem.quantity = matchingItem.quantity + numberQuantityProduct
  }
  else{
    cart.push({
      productId : productId,
      quantity : 1
    })
  }
  let cartTotal = 0
    cart.forEach((item => {
      cartTotal += item.quantity
    }))
  document.querySelector('.js-cart-quantity').innerHTML = cartTotal
}

document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    
    const productId = button.dataset.productId
   
    const add_to_cart = document.querySelector(`.js-add-to-cart-msg-${productId}`)
    add_to_cart.classList.add('added-to-cart')
    add_to_cart.style.opacity = 1
    setTimeout(() => {
      add_to_cart.style.opacity = 0
    },2000)

    addToCart(productId)
    console.log(cart)
  })
})

