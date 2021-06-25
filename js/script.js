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
