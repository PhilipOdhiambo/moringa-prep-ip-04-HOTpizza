/* ==================== BUSINESS LOGIC ============================= */

/* ---------- Order ------------- */

// Order Constucter
function Order() {
    this.orderDate = new Date();
    this.orderItems = [];
    this.delivery = {
        deliveryContact: "",
        deliveryAdress: "",
        deliveryCost: 0,
    };
}

/* Order Methods  */

Order.prototype.orderItemsCost = function () {};

Order.prototype.orderTotal = function () {};

/* ---------- orderItem (PIZZA) ------------- */

// OrderItem Constructor
function OrderItem(size, crust, toppings, quantity = 1) {
    this.size = size;
    this.crust = {
        crustName: crust.name,
        crustCost: crust.name,
    };
    this.toppings = toppings;
    this.quantity = quantity;
}

/* OrderItem Methods   */

OrderItem.prototype.cost = function () {
    var costFactor;
    if (this.size === "small") {
        costFactor = 1;
    } else if (this.size === "medium") {
        costFactor = 1.5;
    } else {
        costFactor = 1;
    }

    var crustCost = this.crust.cost * costFactor * this.quantity;
    var toppingsCost =
        this.toppings.reduce((sum, topping) => sum + topping.cost) *
        costFactor *
        this.quantity;
    return crustCost + toppingsCost;
};

/* ----------------------------------- Data  ----------------------------- */

var crusts = [
    { name: "crispy", cost: 200 },
    { name: "stuffed", cost: 200 },
    { name: "gluten-free", cost: 200 },
];

var toppings = [
    { name: "chicken", cost: 300 },
    { name: "mushroom", cost: 300 },
    { name: "cucumber", cost: 300 },
    { name: "tomato", cost: 300 },
];

/* ================================= FRONTEND ======================= */

/* Helper Functions */

/* -------------------- Frontend Logic -------------------------- */

$(document).ready(function () {
    $("#form-order .input").on("change", function () {
        // Calculate orderItem cost
        var pizzaSize = $("#form-order .input[name=size]:checked").val();
        var crustType = $("#form-order .input[name=crust]").val();
        var orderQty = $("#form-order .input[name=order-qty]").val();
    });
});
