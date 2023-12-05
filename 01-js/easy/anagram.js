/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let str1Len = str1.length
  let str2Len = str2.length

  if(str1Len != str2Len) return false

  let str1Lst = str1.toLowerCase().split("")
  let str2Lst = str2.toLowerCase().split("")

  for(let i = 0; i < str1Len; i++){
    if(!str2Lst.includes(str1Lst[i])){
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
