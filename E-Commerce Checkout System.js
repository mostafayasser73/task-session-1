// --- CHECKOUT DATA CONFIGURATION ---
const discountRates = {
  category: { 'Electronics': 0.10, 'Clothing': 0.20, 'Groceries': 0.05 }, // Percentages
  coupon: { 'SAVE20': 20.00, 'WELCOME10': 10.00 }, // Flat amounts
  payment: { 'Credit Card': 0.05, 'PayPal': 0.02 } // Percentages
};
const VAT_RATE = 0.15; // 15% Tax

// --- CHECKOUT FUNCTION ---
function processCheckout(cart) {
  const { customerName, productCategory, productPrice, quantity, couponCode, paymentMethod } = cart;

  // 1. Calculate Subtotal
  const subtotal = productPrice * quantity;
  let runningTotal = subtotal;
  
  console.log(`\n--- INVOICE FOR ${customerName.toUpperCase()} ---`);
  console.log(`Subtotal (${quantity}x ${productCategory}): $${subtotal.toFixed(2)}`);

  // 2. Apply Category Discount
  const catDiscountRate = discountRates.category[productCategory] || 0;
  if (catDiscountRate > 0) {
    const catDiscountAmount = runningTotal * catDiscountRate;
    runningTotal -= catDiscountAmount;
    console.log(`Category Discount (-${catDiscountRate * 100}%): -$${catDiscountAmount.toFixed(2)}`);
  }

  // 3. Apply Coupon Code Discount
  if (couponCode && discountRates.coupon[couponCode]) {
    const couponDiscount = discountRates.coupon[couponCode];
    runningTotal -= couponDiscount;
    console.log(`Coupon Discount (${couponCode}): -$${couponDiscount.toFixed(2)}`);
  } else if (couponCode) {
    console.log(`Coupon Code (${couponCode}): INVALID`);
  }

  // 4. Apply Payment Method Discount
  const payDiscountRate = discountRates.payment[paymentMethod] || 0;
  if (payDiscountRate > 0) {
    const payDiscountAmount = runningTotal * payDiscountRate;
    runningTotal -= payDiscountAmount;
    console.log(`Payment Discount (${paymentMethod}): -$${payDiscountAmount.toFixed(2)}`);
  }

  // 5. Calculate VAT
  const vatAmount = runningTotal * VAT_RATE;
  runningTotal += vatAmount;
  console.log(`VAT (${VAT_RATE * 100}%): +$${vatAmount.toFixed(2)}`);

  // 6. Bonus: Prevent Negative Total
  if (runningTotal < 0) {
    runningTotal = 0;
  }

  console.log(`---------------------------------`);
  console.log(`FINAL TOTAL: $${runningTotal.toFixed(2)}`);
  return runningTotal;
}

// --- TEST CASES: CHECKOUT ---
const customer1 = {
  customerName: "Alice Smith",
  productCategory: "Electronics",
  productPrice: 500,
  quantity: 2, // Subtotal: 1000
  couponCode: "SAVE20",
  paymentMethod: "Credit Card"
};

const customer2 = {
  customerName: "Bob Jones",
  productCategory: "Clothing",
  productPrice: 15,
  quantity: 1, // Subtotal: 15
  couponCode: "SAVE20", // Coupon will push total negative before failsafe
  paymentMethod: "Cash"
};

processCheckout(customer1);
processCheckout(customer2);
