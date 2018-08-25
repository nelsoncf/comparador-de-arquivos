const buscador = require('./buscardorDeArquivos')


var controllers = [];



const getControllers = function(pasta){

    return new Promise((resolve, reject) => {
       
        buscador.buscador(pasta, function(err, data){
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
           
        });

    }) 
}

const getTestes = function(pasta){

    return new Promise((resolve, reject) => {
       
        buscador.buscador(pasta, function(err, data){
            if(err){
                reject(err)
            } else {
                resolve(data)
            }
           
        });

    }) 
}



// getControllers('./src')
//     .then(arquivos => console.log(arquivos))
//     .catch(err => console.log(err))



const promises = [
    getControllers('./src'),
    getTestes('./tests')
  ];


  Promise.all(promises)
    .then(data => {
      let arquivos = data;  
      console.log("Dados", JSON.stringify(arquivos));
      return data;
    });




