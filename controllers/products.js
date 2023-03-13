const getAllProductsStatic = async (req, res) => {
    res.send(200).json({msg: 'Static Products Fetched'});
}

const getAllProducts = async (req, res) => {
    res.send(200).json({msg: 'Products Fetched'})
}

module.exports = {getAllProducts, getAllProductsStatic};