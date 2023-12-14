/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let totalSpendByCategory = []
  
  for(let i of transactions){
    let category = i['category']
    let price = i['price']

    let index = totalSpendByCategory.findIndex(item => item['category'] == category)
    if(index === -1){
      let myObject = {category: category, totalSpent: price}
      
      totalSpendByCategory.push(myObject)
    }else{
      let item = totalSpendByCategory[index]
      item['totalSpent'] += price
      totalSpendByCategory[index] = item
    }
  }

  return totalSpendByCategory;
}

module.exports = calculateTotalSpentByCategory;
