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
    this.crust = crust;
    this.toppings = toppings;
    this.quantity = quantity;
}

/* OrderItem Methods   */

OrderItem.prototype.orderCost = function () {
    var costFactor;
    if (this.size === "small") {
        costFactor = 1;
    } else if (this.size === "medium") {
        costFactor = 1.5;
    } else if (this.size === "large") {
        costFactor = 1.8;
    }

    var crust = crusts.find((crust) => crust.name === this.crust);
    var crustCost = crust ? crust.cost : 0;
    var toppingsCost = 0;
    this.toppings.forEach((e) => {
        let cost = toppings.find((topping) => topping.name === e).cost;
        toppingsCost += cost;
    });

    return (crustCost + toppingsCost) * costFactor * this.quantity;
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
    /* Recalculate orderCost when any form input changes */
    $("#form-order .input").on("change", function () {
        var pizzaSize = $("#form-order .input[name=size]:checked").val();
        var crustType = $("#form-order .input[name=crust]").val();
        var toppings = [];
        $("#form-order .input[name=topping]:checked").each(function () {
            toppings.push(this.value);
        });
        var orderQty = $("#form-order .input[name=order-qty]").val();
        const orderItem = new OrderItem(
            pizzaSize,
            crustType,
            toppings,
            parseInt(orderQty)
        );

        console.log(orderItem.orderCost());
    });
});
