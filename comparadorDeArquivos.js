module.exports = {
    comprarListas: comprarListas
}

function comprarListas(srcFolder, testFolder){

    var controllersSemTeste = []

    srcFolder.forEach(file => {

        let curr = file
    
        if(!testFolder.includes(curr += ".test")){
            controllersSemTeste.push(file);
        }

    });

    console.log("controllers sem teste", JSON.stringify(controllersSemTeste));

    return controllersSemTeste;

}