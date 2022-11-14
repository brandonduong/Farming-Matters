const shop_items_list = [
  {
    name: "Corn",
    price: 100,
    // from https://www.flaticon.com/free-icons/corn
    image: "./corn.png",
  },
  {
    name: "Mushroom",
    price: 200,
    // from https://www.flaticon.com/free-icons/mushroom
    image: "./mushroom.png",
  },
  {
    name: "Lavender",
    price: 150,
    // from https://www.flaticon.com/free-icons/flower
    image: "./lavender.png",
  },
  {
    name: "Bamboo",
    price: 150,
    // from https://www.flaticon.com/free-icons/bamboo
    image: "./bamboo.png",
  },
  {
    name: "Wheat",
    price: 125,
    // from https://www.flaticon.com/free-icons/rice
    image: "./wheat.png",
  },
  {
    name: "Potato",
    price: 175,
    // from https://www.flaticon.com/free-icons/potato
    image: "./potato.png",
  },
];

const shop_button = document.getElementById("shop-button");
const shop_items_div = document.getElementById("shop-items");
shop_items = null;

shop_button.addEventListener("click", function () {
  shop_background = document.getElementById("shop");
  if (getComputedStyle(shop_background).visibility === "visible") {
    shop_background.style.visibility = "hidden";
    shop_button.textContent = "Shop";
  } else if (getComputedStyle(shop_background).visibility === "hidden") {
    shop_background.style.visibility = "visible";
    shop_button.textContent = "Close";

    // Creating the items in the div
    if (document.getElementsByClassName("shop-item").length === 0) {
      shop_items_div.style.display = "grid";
      shop_items_div.style.gridTemplateColumns = "repeat(3, 1fr)";
      shop_items_div.style.gap = "30px";
      for (let i = 0; i < 6; i++) {
        // Creating an item div for each shop item
        let shop_item = document.createElement("div");
        shop_item.style.textAlign = "center";
        shop_item.style.border = "1px solid transparent";
        shop_item.style.borderRadius = "15px";
        shop_item.style.justifyContent = "center";
        shop_item.className = "shop-item";

        // creating image and cost elements
        let img = document.createElement("img");
        img.src = shop_items_list[i]["image"];
        img.style.width = "80px";
        img.style.border = "1px solid white";
        img.style.borderRadius = "60px";
        img.style.padding = "5px";
        img.style.marginTop = "10px";
        shop_item.appendChild(img);

        let cost = document.createElement("p");
        cost.textContent =
          shop_items_list[i]["name"] + " - $" + shop_items_list[i]["price"];
        cost.style.color = "white";
        cost.style.margin = "5px";
        shop_item.appendChild(cost);

        // for quantity stuff
        let quantity = document.createElement("label");
        quantity.setAttribute("for", "quantity");
        quantity.style.color = "white";
        quantity.textContent = "Quantity:";
        shop_item.appendChild(quantity);

        let quantity_input = document.createElement("input");
        quantity_input.setAttribute("type", "number");
        quantity_input.name = "quantity";
        quantity_input.id = "quantity";
        quantity_input.style.width = "15%";
        quantity_input.style.margin = "0 2%";
        quantity_input.defaultValue = 1;
        quantity_input.setAttribute("min", "1");
        // will need to change this so it can only buy how much money you have avail or give an error when they press the buy button
        quantity_input.setAttribute("max", "5");
        shop_item.appendChild(quantity_input);

        let buy_button = document.createElement("button");
        buy_button.textContent = "Buy";
        shop_item.appendChild(buy_button);

        shop_items_div.appendChild(shop_item);
      }
    }
  }
  shop_items = document.querySelectorAll(".shop-item");

  shop_items.forEach((item) => {
    item.addEventListener("mouseover", () => {
      item.style.boxShadow = "1px 1px 5px white";
    });
    item.addEventListener("mouseout", () => {
      item.style.boxShadow = "1px 1px 5px transparent";
    });
  });

  // for creating a request of buying an item
  // need to check how many they want
  // and it they have enough money
  // need to correspond which button is with what item
  // send request for that item
  // need to have something come up when buy is pressed
  //   item.addEventListener("click", () => {});
});
