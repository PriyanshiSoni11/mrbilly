const userModel = require("../models/user-model")
const orderModel = require("../models/order-model")

module.exports.takeOrder = async function (req, res) {
    let error = req.flash("error")
    let user = await userModel.findOne({ email: req.user.email }).select('-password').populate('selectedMenu')
    let order = await orderModel.findOne({ orderid: req.params.orderId })
    res.render("takeorders", { selectedMenu: user.selectedMenu, tableCount: req.user.tablecount, orderId: req.params.orderId, order: order || null })
}

module.exports.saveOrder = async function (req, res) {
    try {
        let { orderstatus, orderType, tableNumber, placedAt, items, isPaid, total, orderId } = req.body;

        const formattedItems = Object.values(items).map(item => ({
            calories: item.calories,
            description: item.description,
            isenabled: item.isenabled,
            isveg: item.isveg,
            itemname: item.itemname,
            price: item.price,
            quantity: item.quantity,
            status: 'ordered' // Default status can be 'ordered' or as per your need
            
        }));
        let order = await orderModel.findOne({ orderid: req.params.orderId });

        if (!order) {
            let createOrder = await orderModel.create({
                table: tableNumber,
                orderid: orderId,
                ispaid: isPaid,
                total,
                ordertype: orderType,
                items: formattedItems,
                orderstatus
            });
            req.flash("success", `Order for Table ${tableNumber} saved`);
            return res.redirect("/order/view"); // Redirect to the saved order page
        } else {
            let updatedOrder = await orderModel.findOneAndUpdate(
                { orderid: req.params.orderId },
                {
                    table: tableNumber,
                    orderid: orderId,
                    ispaid: isPaid,
                    placedAt,
                    total,
                    ordertype: orderType,
                    items: formattedItems,
                    orderstatus: 'modified'
                },
                { new: true }
            );

            req.flash("success", `Order for Table ${tableNumber} updated`);
            return res.redirect("/order/view"); // Redirect to the updated order page
        }
    }
    catch (err) {
        console.error("something went wrong " + err.message)
    }

};

module.exports.completeOrder = async function (req, res) {
    try{
        let { orderId } = req.params; // Get orderId from URL
        let isPaid = req.body.isPaid === 'true' ? true : false;
        let order = await orderModel.findOneAndUpdate(
            { orderid: orderId },
            {
                orderstatus: 'completed',
                ispaid: isPaid
            }, // Mark the order as completed
            { new: true }
        );
        req.flash("success", `Order marked as completed`);
        res.status(200)
        res.redirect('/order/view'); // Redirect to the orders page
    }
    catch(err){
        console.log(err.message)
    }
    
};

module.exports.viewOrder = async function (req, res) {
    let success = req.flash("success")
    let orders = await orderModel.find({ orderstatus: { $ne: 'completed' } });
    res.render("orderView", { orders, success })
}

module.exports.kitchenView = async function (req, res) {
    let success = req.flash("success")
    let error = req.flash("error")
    let orders = await orderModel.find({ orderstatus: { $ne: 'completed' } });
    
    const items = orders.flatMap(order => order.items.map(item => ({
        ...item._doc,
        table: order.table,
        orderId: order.orderid,
    })))
    res.render("kitchenView", {
        items,
        success,
        error,
    });
}

module.exports.kitchenUpdate = async (req, res) => {
    const { itemId, newStatus } = req.body;
    try {
        await orderModel.updateOne(
            { "items._id": itemId }, // Match the item by its ID
            { $set: { "items.$.status": newStatus } } // Update the status
        );
        req.flash("success", "item status updated")
        res.redirect("/order/kitchen")
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong")
        res.redirect("/order/kitchen")
        }
}
module.exports.orderHistory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const recordsPerPage = 5;
    const skip = (page - 1) * recordsPerPage;

    try {
        // Fetch the orders with pagination and sort by placedAt (newest first)
        const orders = await orderModel.find({})
            .skip(skip)
            //.limit(recordsPerPage)
            .sort({ placedAt: -1 });

        // Get the total count of orders to calculate the total pages
        const totalOrders = await orderModel.countDocuments();
        const totalPages = Math.ceil(totalOrders / totalOrders);

        // Render the page and send the orders and pagination data
        res.render("history", {
            order: orders,
            currentPage: page,
            totalPages
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        //res.status(500).send("Internal Server Error");
    }
};


module.exports.filterHistory = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const recordsPerPage = 20;
    const skip = (page - 1) * recordsPerPage;

    try {
        const orders = await orderModel.find({})
            .skip(skip)
            .limit(recordsPerPage)
            .sort({ placedAt: -1 });

        const totalOrders = await orderModel.countDocuments();
        const totalPages = Math.ceil(totalOrders / recordsPerPage);

        // Send the orders and pagination data as JSON
        res.json({
            orders: orders,
            totalPages: totalPages
        });
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).send("Internal Server Error");
    }
};


