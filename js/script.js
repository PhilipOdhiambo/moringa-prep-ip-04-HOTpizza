/* ==================== BUSINESS LOGIC ============================= */

/* ---------- Order ------------- */

// Order Constucter
function Order() {
    this.orderDate = new Date();
    this.orderDetails = [];
    this.delivery = {
        deliveryContact: "",
        deliveryAdress: "",
        deliveryCost: 0,
    };
}

/* ---------- Order Methods ------------- */

// orderDetails cost summary
Order.prototype.orderDetailsCost = function () {};

// Order grand total
Order.prototype.grandTotal = function () {};

/* ---------- orderDetail (PIZZA) ------------- */

// Pizza Constructor
function Pizza(size, crust, toppings, quantity) {
    this.size = size;
    this.crust = {
        crustName: crust.name,
        crustCost: crust.name,
    };
    this.toppings = toppings;
    this.quantity = quantity;
}

// Pizza methods

Pizza.prototype.cost = function () {
    var costFactor;
    if (this.size === "small") {
        costFactor = 1;
    } else if (this.size === "medium") {
        costFactor = 1.5;
    } else {
        costFactor = 1;
    }

    var crustCost = this.crust.crustCost * costFactor * this.quantity;
    var toppingsCost =
        this.toppings.reduce((sum, topping) => sum + topping.cost) *
        costFactor *
        this.quantity;
    return crustCost + toppingsCost;
};
