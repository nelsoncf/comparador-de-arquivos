const buscador = require('./buscardorDeArquivos')


var controllers = [];



const getControllers = function(pasta){

    return new Promise((resolve, reject) => {
       
        buscador.buscador("./src", function(err, data){
            if(err){
                reject()
            } else {
                resolve(data)
            }
           
        });

    }) 
}



getControllers('./src')
    .then(arquivos => console.log(arquivos))







