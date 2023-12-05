/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  Transaction - an object like { itemName, category, price, timestamp }.
  Output - [{ category1 - total_amount_spent_on_category1 }, { category2 - total_amount_spent_on_category2 }]
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
