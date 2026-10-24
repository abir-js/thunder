const obj1 = {
    name: "Abir",
    age: 22,
    city: "Noida",
    greet: function() {
        console.log("Hello, my name is " + this.name);
    }
}

const obj2 = {
    balance: 1000,
}

obj2.__proto__ = obj1;

// console.log(obj1.name);
// obj1.greet();

// console.log(obj2.name);
// obj2.greet();

console.log(Function.prototype.__proto__ == Object.prototype)
