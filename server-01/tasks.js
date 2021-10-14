const request = require("request-promise");
const {middlewareURL} = require("../env");

// TASK 01.01
const getProduct = async (id) => {//Obtener un producto especifico por su ID
    try {
        const res = await request.get(`${middlewareURL}/product/${id}`);//Solicitamos datos del producto enviando su ID
        return res;//Devolvemos el producto recibido
    } catch (err) {
        return err;
    }
}

// TASK 01.02
const getProducts = async () => {//Obtener todos los productos de la BD
    try {
        const res = await request.get(`${middlewareURL}/products`);//Solicitamos los productos al middleware
        return res;//Deolvemos los productos recibidos
    } catch (err) {
        return err;
    } 
}

// TASK 01.03
const getCartProducts = async (cart) => {//Obtener los productos del carrito
    try {
        const res = [];
        for (var counter = 0; counter < cart.length; counter++) {
            var product = await getProduct(cart[counter].id);//Obtenemos el producto por su ID usando TAKS 01.01
            res.push(JSON.parse(product));//Agregamos datos del proudcto a un arreglo con formato JSON
        }

        return res;//Devolvemos el JSON con los datos de los productos
    } catch (err) {
        return err;
    }
}

// TASK 01.04
const deleteProduct = async (id) => {//Eliminar un producto usando su ID
    try {
        const res = await request.delete(`${middlewareURL}/product/${id}`);//Enviar solicitud para eliminar producto
        return res;//Retornamos resultado
    } catch (err) {
        return err;
    }
}

// TASK 01.05
const addProduct = async (product) => {//Agregar un producto
    try {
        const options = {//Datos para agregar producto
            method: "POST",
            uri: `${middlewareURL}/products`, 
            body: product, 
            json: true
        };
        const res = await request(options);//Enviar solicitud con el producto para agregarlo
        return res;//Retornamos resultado

    } catch (err) {
        return err;
    }
}

// TASK 01.06
const getCategories = async () => {//Obtener las categorias de los productos
    try {
        const res = await request.get(`${middlewareURL}/categories`);//Solicitar las categorias al middleware
        return res;//Retornamos las categorias
    } catch (err) {
        return err;
    }
}

// TASK 01.07
const updateProduct = async (product) => {//Actualizar producto
    try {
        console.log(product);
        const options = {//Datos para actualizar producto
            method: "PUT",
            uri: `${middlewareURL}/products`,
            body: product,
            json: true
        };
        const res = await request(options);//Enviar solicitud para actualizar producto
        return res;

    } catch (err) {
        return err;
    }
}

// TASK 02
const calcTotalProducts = (cart) => {//Obtener total de productos del carrito
    var value = 0;
    cart.map(item => (
        value += item.qty//Sumamos todas las cantidades
    ));
    return value;
}

// TASK 03
const calcTotalPrice = (cart) => {//Obtener precio todal del producto
    var price = 0;
    cart.map(item => {
        price += calcSubtotalPrice(item);//Sumamos todos los subtotales
    });
    return price;//Retornamos precio total
}

// TASK 04
const calcSubtotalPrice = (item) => {//Obtener precio subtotal de cada producto
    return item.qty * item.price;//Multiplicar precio por cantidad
}

// TASK 05
const isInStock = async (id) => {//Comprobamos si esta en existencia el producto o no
    var res = await getProduct(id);//Obtenemos el producto por su id
    if (JSON.parse(res).stockProduct <= 0) {//Comprobamos si el stock es inferior a 0
        return "Not in stock";//No hay
    }
    else {
        return "In stock";//Si hay
    }
}

module.exports = {
    getProduct, 
    getProducts, 
    deleteProduct, 
    addProduct, 
    getCartProducts,
    getCategories, 
    updateProduct, 
    calcTotalProducts, 
    calcTotalPrice, 
    calcSubtotalPrice, 
    isInStock
}
