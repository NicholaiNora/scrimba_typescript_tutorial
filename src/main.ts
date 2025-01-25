type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Status = "ordered" | "completed";

type Order = {
  id: number;
  pizza: Pizza;
  status: Status;
};

const menu: Pizza[] = [
  { id: 1, name: "Margherita", price: 8 },
  { id: 2, name: "Pepperoni", price: 10 },
  { id: 3, name: "Hawaiian", price: 10 },
  { id: 4, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let nextPizzaId = 1;
let nextOrderId = 1;

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  const pizza: Pizza = { id: nextPizzaId++, ...pizzaObj };
  menu.push(pizza);
  return pizza;
}

function placeOrder(pizzaName: string): Order | undefined {
  const pizzaOrdered = menu.find((pizzaObj) => pizzaName === pizzaObj.name);
  if (!pizzaOrdered) {
    console.error(`${pizzaName} does not exist in the menu`);
    return;
  }
  cashInRegister += pizzaOrdered.price;
  const newOrder: Order = {
    id: nextOrderId,
    pizza: pizzaOrdered,
    status: "ordered",
  };
  orderQueue.push(newOrder);
  nextOrderId++;
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => orderId === order.id);
  if (!order) {
    console.error(`${order} does not exist`);
    return;
  }
  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: string | number): Pizza | undefined {
  if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else if (typeof (identifier === "string")) {
    return menu.find(
      (pizza) =>
        pizza.name.toLocaleLowerCase() === identifier.toLocaleLowerCase()
    );
  } else {
    throw new Error("Invalid identifier type");
  }
}

addNewPizza({ name: "Chicken Bacon Ranch", price: 12 });
addNewPizza({ name: "BBQ Chicken", price: 12 });
addNewPizza({ name: "Spicy Sausage", price: 11 });

// placeOrder("Chicken Bacon Ranch");
// completeOrder(1);

// console.log("Menu:", menu);
// console.log("Cash in register:", cashInRegister);
// console.log("Order queue:", orderQueue);