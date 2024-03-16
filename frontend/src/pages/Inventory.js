import React, { useState, useEffect, useContext } from "react";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import AuthContext from "../AuthContext";

function Inventory() {
  const [showProductModal, setShowProductModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateProduct, setUpdateProduct] = useState([]);
  const [products, setAllProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState();
  const [updatePage, setUpdatePage] = useState(true);
  const [stores, setAllStores] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const authContext = useContext(AuthContext);
  console.log('====================================');
  console.log(authContext);
  console.log('====================================');

   useEffect(() => {
    fetchProductsData();
    fetchSalesData();
  }, [updatePage]); 

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching Data of Search Products
  const fetchSearchData = () => {
    fetch(`http://localhost:4000/api/product/search?searchTerm=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      })
      .catch((err) => console.log(err));
  };

  // Fetching all stores data
  const fetchSalesData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((data) => {
        setAllStores(data);
      });
  };

  // Modal for Product ADD
  const addProductModalSetting = () => {
    setShowProductModal(!showProductModal);
  };

  // Modal for Product UPDATE
  const updateProductModalSetting = (selectedProductData) => {
    console.log("Clicked: edit");
    setUpdateProduct(selectedProductData);
    setShowUpdateModal(!showUpdateModal);
  };

  const deleteItem = (id) => {
    console.log("Product ID: ", id);
    setItemToDelete(id);
    setShowConfirmationModal(true);
  };

  // Delete item
  const confirmDelete  = (id) => {
    console.log("Product ID: ", id);
    console.log(`http://localhost:4000/api/product/delete/${id}`);
    fetch(`http://localhost:4000/api/product/delete/${itemToDelete}`)
      .then((response) => response.json())
      .then((data) => {
        setUpdatePage(!updatePage);
        setShowConfirmationModal(false);
      });
  };

  const cancelDelete = () => {
    setShowConfirmationModal(false);
  };

  // Handle Page Update
  const handlePageUpdate = () => {
    setUpdatePage(!updatePage);
  };

  // Handle Search Term
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    fetchSearchData();
  };




  return (
    <div className="col-span-12 lg:col-span-10  flex justify-center">
      <div className=" flex flex-col gap-5 w-11/12">
        <div className="bg-white rounded p-3">
          <span className="font-bold px-4">Inventario General</span>
          <div className=" flex flex-col md:flex-row justify-center items-center  ">
            <div className="flex flex-col p-10  w-full  md:w-3/12  ">
              <span className="font-semibold text-blue-600 text-base">
                Total Products
              </span>
              <span className="font-semibold text-gray-600 text-base">
                {products.length}
              </span>
              <span className="font-thin text-gray-400 text-xs">
                Últimos 7 días
              </span>
            </div>
            <div className="flex flex-col gap-3 p-10   w-full  md:w-3/12 sm:border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-yellow-600 text-base">
                Puntos de Ventas
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    {stores.length}
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Últimos 7 días
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ganancia
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  sm:border-y-2 md:border-x-2 md:border-y-0">
              <span className="font-semibold text-purple-600 text-base">
                Top Ventas
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                  Últimos 7 días
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    $0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">Costo</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 p-10  w-full  md:w-3/12  border-y-2  md:border-x-2 md:border-y-0">
              <span className="font-semibold text-red-600 text-base">
                Stock Bajo
              </span>
              <div className="flex gap-8">
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Ordenado
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-600 text-base">
                    0
                  </span>
                  <span className="font-thin text-gray-400 text-xs">
                    Sin Stock
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showProductModal && (
          <AddProduct
            addProductModalSetting={addProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          />
        )}
        {showUpdateModal && (
           <UpdateProduct
            updateProductData={updateProduct}
            updateModalSetting={updateProductModalSetting}
            handlePageUpdate={handlePageUpdate}
          /> 
          )}

        {showConfirmationModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-5 rounded shadow-lg max-w-sm text-center">
              <p className="text-xl mb-3">¿Estás seguro que deseas eliminar este item?</p>
              <div className="flex justify-center gap-3">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded" onClick={confirmDelete}>Sí</button>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded" onClick={cancelDelete}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
        {/* Table  */}
        <div className="overflow-x-auto rounded-lg border bg-white border-gray-200 ">
          <div className="flex justify-between pt-5 pb-3 px-3">
            <div className="flex gap-4 justify-center items-center ">
              <span className="font-bold">Productos</span>
              <div className="flex justify-center items-center px-2 border-2 rounded-md ">
                <img
                  alt="search-icon"
                  className="w-5 h-5"
                  src={require("../assets/search-icon.png")}
                />
                <input
                  className="border-none outline-none focus:border-none text-xs"
                  type="text"
                  placeholder="Search here"
                  value={searchTerm}
                  onChange={handleSearchTerm}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 text-xs  rounded"
                onClick={addProductModalSetting}
              >
                {/* <Link to="/inventory/add-product">Add Product</Link> */}
                Agregar Producto
              </button>
            </div>
          </div>
          <table className="min-w-full divide-y-2 divide-gray-200 text-sm">
            <thead>
              <tr>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Producto
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Diseño
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Stock
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Costo/und
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                 Valor/total
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                Observación
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Disponible?
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Terminado?
                </th>
                <th className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {products.map((product, index) => {
                // Convertir los elementos del array 'stock' a números y sumarlos
                // const totalStock = product.stock.reduce((acc, curr) => acc + parseFloat(curr), 0);
                const totalStock = product.designs.reduce((acc, curr) => acc + parseFloat(curr.stock), 0);

                // Calcular el total multiplicando el total de stock por el precio
                const totalPrice = totalStock * parseFloat(product.price);

                // Formatear el total como moneda
                const formattedTotalPrice = totalPrice.toLocaleString('es-AR', {
                  style: 'currency',
                  currency: 'ARS'
                });

                return (
                  <tr key={product._id}>
                    <td className="whitespace-nowrap px-4 py-2  text-gray-900">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {product.designs.map(d => d.name).join(', ')}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {totalStock}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      ${product.price}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                        {formattedTotalPrice}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {product.description}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      {totalStock > 0 ? "Stock" : "Sin Stock"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {product.terminado === "no" ? "No" : "Si"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      <span
                        className="text-green-700 cursor-pointer"
                        onClick={() => updateProductModalSetting(product)}
                      >
                        Editar{" "}
                      </span>
                      <span
                        className="text-red-600 px-2 cursor-pointer"
                        onClick={() => deleteItem(product._id)}
                      >
                        Borrar
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
