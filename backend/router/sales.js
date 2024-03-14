const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales  
app.post("/add", sales.addSales);

// Get All Sales
app.get("/get/:userID", sales.getSalesData);
app.get("/getmonthly", sales.getMonthlySales);

// Delete Selected Sales Item
app.get("/delete/:id", sales.deleteSelectedSales);

// Update Selected Sales
app.post("/update", sales.updateSelectedSales);



app.get("/get/:userID/totalsaleamount", sales.getTotalSalesAmount);

module.exports = app;



// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
