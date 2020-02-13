let arr1=[{age:11},{age:12}]
let arr2=[...arr1]

arr2[1].age=15


console.log(arr1); // [ { age: 11 }, { age: 15 } ]
console.log(arr2); // [ { age: 11 }, { age: 15 } ]
