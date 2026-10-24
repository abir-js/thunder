class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hi ${this.name}`);
  }
}

// const user1 = new Person('Abir', 20);
// const user2 = new Person('Ram', 30);

// console.log(user1);
// console.log(typeof user1);

// user1.greet()

class Customer extends Person {
  constructor(name, age, balance, city) {
    super(name, age);
    this.balance = balance;
    this.city = city;
  }
}

const c1 = new Customer("Abir", 20, 100, "Noida");


