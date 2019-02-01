var express = require('express');
var router = express.Router();
const axios = require('axios');



router.get('/items', function(req, res){  //voy a buscar todos los productos a la API
  const q = req.query.q;
  axios
  .get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + q )
  .then(function (theResult) {
    
    const apiCategories = theResult.data.available_filters.find(p => p.id === 'category') //hacemos find para hallar el array de categoria
    const theCategories = apiCategories ? apiCategories.values : [] ; //aqui tomamos la propiedad values.
    
    theCategories.sort(function (a,b){ //aca organizamos en orden descendente.
      if (a.results > b.results) {
        return -1;
      }
      if (a.results < b.results) {
        return 1;
      }
      return 0
    })
    
    const apidata = theResult.data.results.map(function (p) { //traemos la informacio de la API. y la organizamos en un nuevo array de objeto.
      return {           
          id: p.id,
          title: p.title,
          price: {
              currency: p.currency_id,
              amount: String(p.price).split('.')[0],
              decimals: String(p.price).split('.') [1] || '0',
          },
            picture: p.thumbnail,
            condition: p.condition,
            free_shipping: p.shipping.free_shipping,
            location: p.address.state_name         
        };               
    })  
    
    res.json({
      categories: theCategories[0],
      items: apidata
    });  
      
  })
  .catch(function(err){ // es un Fail, cuando explota algo.
    console.log ('houston we got a problem '+ err)
  })  
})

  router.get('/items/:id', function (req, res) {
    const idProductos= req.params.id;//aqui tomammos el id 

    axios.get('https://api.mercadolibre.com/items/' + idProductos)
      .then(resultProduct => {
      //recuperamos la data y realizamos un array de objetos.
        const categoryCode = resultProduct.data.category_id;
        const productOutcome = resultProduct.data
  
        axios.get('https://api.mercadolibre.com/items/' + idProductos +'/description')
          .then(resultDescription => {

            axios.get('https://api.mercadolibre.com/categories/' + categoryCode)
              .then(resultCategory => {
                const CategoryMap = resultCategory.data.path_from_root.map(a => {return a.name}) //aqui mapeamos para sacar todas la categorias.
                const myProducts = {

                  categories: CategoryMap,
                  item: { 
                    id:  productOutcome.id,
                    title: productOutcome.title,
                    price: {
                      currency: productOutcome.currency_id,
                      amount: String(productOutcome.price).split(".")[0],
                      decimal: String(productOutcome.price).split(".")[1] || "0"
                    },
                    picture: productOutcome.thumbnail,
                    condition: productOutcome.condition,
                    sold: productOutcome.sold_quantity,
                    free_shipping: productOutcome.shipping.free_shipping
                   
                  },
                  categoryId: categoryCode,
                  description: resultDescription.data.plain_text,
    
                }
                  console.log(myProducts)  
                
                  res.json(myProducts)
              })
              
          })
          .catch(function(err){ // aqui cuando no se cumple la condicion.
            console.log ('houston we got a problem '+ err)
          })
      })
  })


  

module.exports = router;
