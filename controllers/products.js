const getAllProductsStatic = async (req, res) => {
    throw new Error('Custom errorCustom error');
    // res.sendStatus(200).json({msg: 'Static Products Fetched'});
}

const getAllProducts = async (req, res) => {
    res.status(200).json({msg: 'Products Fetched'});
}

module.exports = {getAllProducts, getAllProductsStatic};