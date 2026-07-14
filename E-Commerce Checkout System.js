const discountRates = {
  category: { 'Electronics': 0.10, 'Clothing': 0.20, 'Groceries': 0.05 },
  coupon: { 'SAVE20': 20.00, 'WELCOME10': 10.00 },
  payment: { 'Credit Card': 0.05, 'PayPal': 0.02 }
};
const VAT_RATE = 0.15;

function processCheckout(cart) {
  const { customerName, productCategory, productPrice, quantity, couponCode, paymentMethod } = cart;

  const subtotal = productPrice * quantity;
  let runningTotal = subtotal;
  
  console.log(`\n--- INVOICE FOR ${customerName.toUpperCase()} ---`);
  console.log(`Subtotal (${quantity}x ${productCategory}): $${subtotal.toFixed(2)}`);

  const catDiscountRate = discountRates.category[productCategory] || 0;
  if (catDiscountRate > 0) {
    const catDiscountAmount = runningTotal * catDiscountRate;
    runningTotal -= catDiscountAmount;
    console.log(`Category Discount (-${catDiscountRate * 100}%): -$${catDiscountAmount.toFixed(2)}`);
  }

  if (couponCode && discountRates.coupon[couponCode]) {
    const couponDiscount = discountRates.coupon[couponCode];
    runningTotal -= couponDiscount;
    console.log(`Coupon Discount (${couponCode}): -$${couponDiscount.toFixed(2)}`);
  } else if (couponCode) {
    console.log(`Coupon Code (${couponCode}): INVALID`);
  }

  const payDiscountRate = discountRates.payment[paymentMethod] || 0;
  if (payDiscountRate > 0) {
    const payDiscountAmount = runningTotal * payDiscountRate;
    runningTotal -= payDiscountAmount;
    console.log(`Payment Discount (${paymentMethod}): -$${payDiscountAmount.toFixed(2)}`);
  }

  const vatAmount = runningTotal * VAT_RATE;
  runningTotal += vatAmount;
  console.log(`VAT (${VAT_RATE * 100}%): +$${vatAmount.toFixed(2)}`);

  if (runningTotal < 0) {
    runningTotal = 0;
  }

  console.log(`---------------------------------`);
  console.log(`FINAL TOTAL: $${runningTotal.toFixed(2)}`);
  return runningTotal;
}

const customer1 = {
  customerName: "Alice Smith",
  productCategory: "Electronics",
  productPrice: 500,
  quantity: 2,
  couponCode: "SAVE20",
  paymentMethod: "Credit Card"
};

const customer2 = {
  customerName: "Bob Jones",
  productCategory: "Clothing",
  productPrice: 15,
  quantity: 1,
  couponCode: "SAVE20",
  paymentMethod: "Cash"
};

processCheckout(customer1);
processCheckout(customer2);
