const account = {
  userPin: "1234",
  currentBalance: 1500.00,
  failedAttempts: 0,
  isLocked: false
};

function performAtmOperation(enteredPin, selectedOperation, transactionAmount = 0) {
  if (account.isLocked) {
    return "Error: Account is locked due to too many incorrect PIN attempts. Please contact your bank.";
  }

  if (enteredPin !== account.userPin) {
    account.failedAttempts++;
    if (account.failedAttempts >= 3) {
      account.isLocked = true;
      return "Error: Incorrect PIN. Maximum attempts reached. Account is now locked.";
    }
    return `Error: Incorrect PIN. You have ${3 - account.failedAttempts} attempt(s) remaining.`;
  }

  account.failedAttempts = 0;

  switch (selectedOperation) {
    case 'CHECK_BALANCE':
      return `Success: Your current balance is $${account.currentBalance.toFixed(2)}.`;

    case 'WITHDRAW':
      if (transactionAmount <= 0) {
        return "Error: Withdrawal amount must be greater than zero.";
      }
      if (transactionAmount > account.currentBalance) {
        return "Error: Insufficient funds. You cannot withdraw more than your current balance.";
      }
      account.currentBalance -= transactionAmount;
      return `Success: You have withdrawn $${transactionAmount.toFixed(2)}. New balance is $${account.currentBalance.toFixed(2)}.`;

    case 'DEPOSIT':
      if (transactionAmount <= 0) {
        return "Error: Deposit amount must be greater than zero.";
      }
      account.currentBalance += transactionAmount;
      return `Success: You have deposited $${transactionAmount.toFixed(2)}. New balance is $${account.currentBalance.toFixed(2)}.`;

    case 'CHANGE_PIN':
      const newPinStr = transactionAmount.toString();
      if (!/^\d{4}$/.test(newPinStr)) {
         return "Error: New PIN must be exactly 4 digits long.";
      }
      account.userPin = newPinStr;
      return "Success: Your PIN has been successfully changed.";

    default:
      return "Error: Invalid operation selected.";
  }
}

console.log("--- ATM SYSTEM TESTS ---");
console.log(performAtmOperation("1234", "CHECK_BALANCE"));
console.log(performAtmOperation("1234", "WITHDRAW", 2000));
console.log(performAtmOperation("1234", "WITHDRAW", 500));
console.log(performAtmOperation("1234", "DEPOSIT", -50));
console.log(performAtmOperation("1234", "CHANGE_PIN", "987"));
console.log(performAtmOperation("1234", "CHANGE_PIN", "9999"));

console.log(performAtmOperation("1111", "CHECK_BALANCE"));
console.log(performAtmOperation("2222", "CHECK_BALANCE"));
console.log(performAtmOperation("3333", "CHECK_BALANCE"));
console.log(performAtmOperation("9999", "CHECK_BALANCE"));
