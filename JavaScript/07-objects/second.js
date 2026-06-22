const customer = {
  name: "Abir Bhattacharjee",
  age: 10,
  marks: 90,
  address: {
    city: "Kolkata",
  },
};

// const { age, marks, ...rest } = customer;

// console.log(age, marks, rest);

// const customer2 = { ...customer };
const customer2 = structuredClone(customer) ;


customer2.marks = 100;
customer2.address.city = "Mumbai"

console.log(customer);
console.log(customer2);

