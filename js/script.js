/* ==================== BUSINESS LOGIC ============================= */

/* ---------- Order ------------- */

// Order Constucter
function Order() {
    this.orderDate = "";
    this.orderItems = [];
    this.delivery = {
        deliveryContact: "",
        deliveryAdress: "",
        deliveryPhone: null,
        deliveryCost: 200,
    };
}

/* Order Methods  */

Order.prototype.orderSummary = function () {
    let orderItemsTotal = 0;
    if (this.orderItems.length > 0) {
        this.orderItems.forEach((item) => {
            orderItemsTotal += item.orderItemCost();
        });
    }

    let deliveryCost = !(this.delivery.deliveryCost === null)
        ? this.delivery.deliveryCost
        : 0;
    let orderTotal = orderItemsTotal + deliveryCost;

    let deliveryAdress = "";
    if (!(this.delivery.deliveryPhone === null)) {
        deliveryAdress = `To: ${this.delivery.deliveryContact} Phone: ${this.delivery.deliveryPhone} Address: ${this.delivery.deliveryAdress}`;
    }
    return {
        itemsTotal: orderItemsTotal,
        deliveryCost: deliveryCost,
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

    var crustCost = this.crust
        ? crusts.find((crust) => crust.name === this.crust).cost
        : 0;
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

function showOrderSummary(order) {
    $("#orders-cost").val(order.orderSummary().itemsTotal);
    $("#delivery-cost").val(order.orderSummary().deliveryCost);
    $("#total-cost").val(order.orderSummary().orderTotal);
}

function createTableRow(data) {
    $("tbody").append(
        ` <tr>
                    <th scope="row">$</th>
                    <td><button class="remove btn">remove</button></td>
                    <td>
                        Pizza ${data.crust}
                        ${data.size},Topping:[${data.toppings.join(", ")}]
                    </td>
                    <td><input class="qty" type="number" min="1" value="${
                        data.quantity
                    }" /></td>
                    <td class="cost">${data.orderItemCost()}</td>
                </tr>
            `
    );
}

/* -------------------- Logic -------------------------- */

$(document).ready(function () {
    // Inputs
    var crustInput = $("#form-order .input[name=crust]");
    var quantityInput = $("#form-order .input[name=order-qty]");

    // Outputs
    var priceDispay = $("#price");

    // Data
    const order = new Order();
    const orderItems = order.orderItems;
    let activeItem;

    /* update orderItem when any form input change*/

    $("#form-order .input").on("change", function () {
        var toppings = [];        

        $("#form-order .input[name=topping]:checked").each(function () {
            let topping = $(this).val()
            toppings.push(topping)
        });

        var orderQty = parseInt(quantityInput.val());
        var sizeInput = $("#form-order .input[name=size]:checked").val();
        const changedItem = new OrderItem(
            sizeInput,
            crustInput.val(),
            toppings,
            orderQty
        );
        // Update price display
        priceDispay.val(changedItem.orderItemCost());
        // update active item
        activeItem = changedItem;
    });

    /* Add orderItem to cart when button is clicked */

    $("#add-to-cart").click(function (e) {
        e.preventDefault();

        // Logic to clear inputs will go here

        // Update data
        orderItems.push(activeItem);
        showOrderSummary(order);
        // Create row
        createTableRow(activeItem);
        // Row objects created
        const removeRowButton = $("tbody tr").last().find(".btn.remove");
        const itemQty = $("tbody tr").last().find(".qty");
        const itemCost = $("tbody tr").last().find(".cost");
        // Delete a row when remove button is clicked
        removeRowButton.click(function () {
            let rowIndex = $(this).parents("tr").index();
            $("tbody tr").get(rowIndex).remove();
            // update data
            orderItems.splice(rowIndex, 1);
            // Refresh order summary
            showOrderSummary(order);
        });
        // Change line total when quantity is changed
        let unitCost = parseInt(itemCost.text()) / parseInt(itemQty.val());
        itemQty.on("change", function () {
            let cost = unitCost * parseInt($(this).val());
            itemCost.text(cost);
            // update data
            let rowIndex = $(this).parents("tr").index();
            orderItems[rowIndex].quantity = parseInt($(this).val());
            // Refresh order summary
            console.log(order.orderSummary())
            showOrderSummary(order);
        });
    });
});
