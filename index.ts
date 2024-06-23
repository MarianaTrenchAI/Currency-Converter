#! /usr/bin/env node
import inquirer from 'inquirer';

const usdRate: number = 278.81;
const gbpRate: number = 354.56;
const eurRate: number = 298.98;
const audRate: number = 183.83;
const cadRate: number = 202.37;

let exitConfirmation;

do {
  exitConfirmation = await inquirer.prompt({
    type: 'confirm',
    name: 'exit',
    message: 'Do you want to convert the PKR amount?'
  });

  if (!exitConfirmation.exit) {
    break;
  }

  const currencyAmount = await inquirer.prompt([
    {
      name: 'currency',
      type: 'list',
      choices: ['US Dollar', 'Pound', 'EURO', 'Australian Dollar', 'Canadian Dollar'],
      message: 'Please Select any Currency',
    },
    {
      name: 'amount',
      type: 'number',
      message: 'Please enter PKR amount to convert',
    },
  ]);

  if (currencyAmount.currency === 'US Dollar') {
    console.log("Here are your converted US dollars $", currencyAmount.amount / usdRate);
  } else if (currencyAmount.currency === 'Pound') {
    console.log("Here are your converted Pounds £", currencyAmount.amount / gbpRate);
  } else if (currencyAmount.currency === 'EURO') {
    console.log("Here are your converted Euros €", currencyAmount.amount / eurRate);
  } else if (currencyAmount.currency === 'Australian Dollar') {
    console.log("Here are your converted Australian dollars $", currencyAmount.amount / audRate);
  } else {
    console.log("Here are your converted Canadian dollars $", currencyAmount.amount / cadRate);
  }

} while (exitConfirmation.exit);






