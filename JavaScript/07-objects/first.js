const user = {
  name: "John Doe",
  age: 30,
  email: "Hbq0p@example.com",
  amount: 1000,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`,
    );
  },
};

// Iteration
console.log(Object.keys(user)); //[ 'name', 'age', 'email', 'amount', 'greet' ]

console.log(Object.values(user));
// [ 'John Doe', 30, 'Hbq0p@example.com', 1000, λ:greet ]

console.log(Object.entries(user));
/*
[
  [ 'name', 'John Doe' ],
  [ 'age', 30 ],
  [ 'email', 'Hbq0p@example.com' ],
  [ 'amount', 1000 ],
  [ 'greet', λ:greet ]
]
*/

for (const key of Object.keys(user)) {
  console.log(key, user[key]);
}

for(const [key, value] of Object.entries(user)){
  console.log(key, value)
}