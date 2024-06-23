#! /usr/bin/env node
// import inquirer from 'inquirer';
// const usdRate: number = 278.81;
// const gbpRate: number = 354.56;
// const eurRate: number = 298.98;
// const audRate: number = 183.83;
// const cadRate: number = 202.37;
// let exitConfirmation;
// do {
//   exitConfirmation = await inquirer.prompt({
//     type: 'confirm',
//     name: 'exit',
//     message: 'Do you want to convert the PKR amount?'
//   });
//   if (!exitConfirmation.exit) {
//     break;
//   }
//   const currencyAmount = await inquirer.prompt([
//     {
//       name: 'currency',
//       type: 'list',
//       choices: ['US Dollar', 'Pound', 'EURO', 'Australian Dollar', 'Canadian Dollar'],
//       message: 'Please Select any Currency',
//     },
//     {
//       name: 'amount',
//       type: 'number',
//       message: 'Please enter PKR amount to convert',
//     },
//   ]);
//   if (currencyAmount.currency === 'US Dollar') {
//     console.log("Here are your converted US dollars $", currencyAmount.amount / usdRate);
//   } else if (currencyAmount.currency === 'Pound') {
//     console.log("Here are your converted Pounds £", currencyAmount.amount / gbpRate);
//   } else if (currencyAmount.currency === 'EURO') {
//     console.log("Here are your converted Euros €", currencyAmount.amount / eurRate);
//   } else if (currencyAmount.currency === 'Australian Dollar') {
//     console.log("Here are your converted Australian dollars $", currencyAmount.amount / audRate);
//   } else {
//     console.log("Here are your converted Canadian dollars $", currencyAmount.amount / cadRate);
//   }
// } while (exitConfirmation.exit);
// currency converter
import inquirer from 'inquirer';
import axios from 'axios'; // Assuming you've installed axios
// Replace with your actual Currencylayer API key
const apiKey = 'https://api.currencylayer.com/';
async function fetchExchangeRate(sourceCurrency, targetCurrency) {
    const url = `https://api.currencylayer.com/live?access_key=${apiKey}&currencies=${targetCurrency}`;
    try {
        const response = await axios.get(url);
        const data = response.data;
        if (data.success) {
            const rate = data.quotes[`${sourceCurrency}${targetCurrency}`];
            if (rate) {
                return rate;
            }
            else {
                throw new Error('Invalid currency pair');
            }
        }
        else {
            throw new Error(data.error.info);
        }
    }
    catch (error) {
        console.error('Error fetching exchange rate:', error);
        throw error; // Re-throw for further handling
    }
}
let exitConfirmation;
do {
    exitConfirmation = await inquirer.prompt({
        type: 'confirm',
        name: 'exit',
        message: 'Do you want to convert the PKR amount?'
    });
    if (!exitConfirmation.exit) {
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
        const targetCurrency = currencyAmount.currency.split(' ')[0]; // Extract the currency code (USD, GBP, etc.)
        try {
            const exchangeRate = await fetchExchangeRate('PKR', targetCurrency);
            const convertedAmount = currencyAmount.amount * exchangeRate;
            console.log(`Here are your converted ${targetCurrency}: ${convertedAmount.toFixed(2)}`); // Display with 2 decimal places
        }
        catch (error) {
            console.error('Error:');
        }
    }
} while (exitConfirmation.exit);
