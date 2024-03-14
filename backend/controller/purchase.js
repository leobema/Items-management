const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

// Add Purchase Details
const addPurchase = (req, res) => {
  const addPurchaseDetails = new Purchase({
    userID: req.body.userID,
    ProductID: req.body.productID,
    design: req.body.design,
    stock: req.body.stock,
    PurchaseStock: req.body.purchaseStock,
    PurchaseDate: req.body.purchaseDate,
    
    TotalPurchaseAmount: req.body.totalPurchaseAmount,
    description: req.body.description,
  });

  addPurchaseDetails
    .save()
    .then((result) => {
      purchaseStock(req.body.productID, req.body.stock);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err)
      res.status(402).send("error acá en compra");
    });
};

// Get All Purchase Data
const getPurchaseData = async (req, res) => {
  const findAllPurchaseData = await Purchase.find({"userID": req.params.userID})
    .sort({ _id: -1 })
    .populate("ProductID"); // -1 for descending order
  res.json(findAllPurchaseData);
};

// Delete Selected Purchase
const deleteSelectedPurchase = async (req, res) => {
  const deletePurchase = await Purchase.deleteOne(
    { _id: req.params.id }
  );
  res.json({ deletePurchase });
};

// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  let totalPurchaseAmount = 0;
  const purchaseData = await Purchase.find({"userID": req.params.userID});
  purchaseData.forEach((purchase) => {
    totalPurchaseAmount += purchase.TotalPurchaseAmount;
  });
  res.json({ totalPurchaseAmount });
};


// Update Selected Purchase
const updateSelectedPurchase = async (req, res) => {
  try {
    const updatedResult = await Purchase.findByIdAndUpdate(
      { _id: req.body.purchaseID },
      {
        ProductID: req.body.productID,
        design: req.body.design,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
      },
      { new: true }
    );
    console.log(updatedResult);
    res.json(updatedResult);
  } catch (error) {
    console.log(error);
    res.status(402).send("Error");
  }
}; 


module.exports = { addPurchase, getPurchaseData, getTotalPurchaseAmount, updateSelectedPurchase, deleteSelectedPurchase };
