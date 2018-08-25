const buscador = require('./buscardorDeArquivos')
const comparador = require('./comparadorDeArquivos')

const getFiles = function(pasta){
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

const promises = [
    getFiles('./src'),
    getFiles('./tests')
  ];

Promise.all(promises)
    .then(data => {
      let arquivos = data;  
      //console.log("Dados", JSON.stringify(arquivos));
      comparador.comprarListas(arquivos[0], arquivos[1])
      return data;
    })
    .catch(err => 
        console.log("Não consegue né moisés", err));




