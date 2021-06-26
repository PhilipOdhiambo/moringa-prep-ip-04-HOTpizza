/* ==================== BUSINESS LOGIC ============================= */

/* ---------- Order ------------- */

// Order Constucter
function Order() {
    this.orderDate = "";
    this.orderItems = [];
    this.delivery = {
        deliveryContact: null,
        deliveryAdress: null,
        deliveryPhone: null,
        deliveryCost: 0,
    };
}

/* Order Methods  */

Order.prototype.orderSummary = function () {
    let itemsTotal = this.orderItems.reduce(
        (sum, item) => sum + item.orderItemCost()
    );

    let deliveryCost = this.delivery.deliveryCost
        ? this.delivery.deliveryCost
        : 0;

    let orderTotal = itemsTotal + deliveryCost;
    let deliveryAdress = "";
    if (this.deliveryPhone) {
        deliveryAdress = `To: ${this.delivery.deliveryContact}
             Phone: ${this.delivery.deliveryPhone}
             Address: ${this.delivery.deliveryAdress}
            `;
    }
    return {
        itemsTotal: itemsTotal,
        orderTotal: orderTotal,
        deliveryAdress: deliveryAdress,
    };
};

/* ---------- orderItem (PIZZA) ------------- */

// OrderItem Constructor
function OrderItem(size, crust, toppings, quantity = 1) {
    this.size = size;
    this.crust = crust;
    this.toppings = toppings;
    this.quantity = quantity;
}

/* OrderItem Methods   */

OrderItem.prototype.orderItemCost = function () {
    var costFactor = 1;
    if (this.size === "medium") {
        costFactor = 1.5;
    } else if (this.size === "large") {
        costFactor = 1.8;
    }

    var crust = crusts.find((crust) => crust.name === this.crust);
    var crustCost = crust ? crust.cost : 0;
    var toppingsCost = 0;
    if (this.toppings) {
        this.toppings.forEach((e) => {
            let cost = toppings.find((topping) => topping.name === e).cost;
            toppingsCost += cost;
        });
    }

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
    { name: "sausage", cost: 300 },
];

/* ================================= FRONTEND ======================= */

/* Helper Functions */

function orderSummary(order) {}

/* -------------------- Frontend Logic -------------------------- */

$(document).ready(function () {
    var order = new Order();
    var orderItem;
    /* update orderItem when any form input change*/
    $("#form-order .input").on("change", function () {
        var pizzaSize = $("#form-order .input[name=size]:checked").val();
        var crustType = $("#form-order .input[name=crust]").val();
        var toppings = [];
        $("#form-order .input[name=topping]:checked").each(function () {
            toppings.push(this.value);
        });
        var orderQty = $("#form-order .input[name=order-qty]").val();
        const newOrderItem = new OrderItem(
            pizzaSize,
            crustType,
            toppings,
            parseInt(orderQty)
        );
        //display orderItem cost
        $("#price").val(newOrderItem.orderItemCost());
        // Point order Item to newOrderItem
        orderItem = newOrderItem;
    });

    /* Add orderItem to cart when button is clicked */
    $("#add-to-cart").click(function (e) {
        e.preventDefault();
        order.orderItems.push(orderItem);
        $("table tbody")
            .append(
                ` <tr>
                    <th scope="row">${order.orderItems.length}</th>
                    <td><button class="remove btn">remove</button></td>
                    <td>
                        Pizza ${orderItem.crust}
                        LARGE,Topping:[${orderItem.toppings.join(", ")}]
                    </td>
                    <td><input class="qty" type="number" min="1" value="${
                        orderItem.quantity
                    }" /></td>
                    <td class="cost">${orderItem.orderItemCost()}</td>
                </tr>
            `
            )
            .ready(function () {
                const removeBnt = $("tbody tr").last().find(".btn.remove");
                const itemQty = $("tbody tr").last().find(".qty");
                const itemCost = $("tbody tr").last().find(".cost");

                let unitCost =
                    parseInt(itemCost.text()) / parseInt(itemQty.val());

                removeBnt.click(function () {
                    $("tbody tr").last().remove();
                });
                itemQty.on("change", function () {
                    itemCost.text($(this).val() * unitCost);
                });
            });
    });
});
