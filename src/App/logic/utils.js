export function UtilShuffleArray(arra1){
    let ctr = arra1.length;
    let temp;
    let index;

// While there are elements in the array
while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

export function PasarElementos(arreglo){
    let i = 0;
    let resultado = [];
    for(;i<arreglo.length;i++){
        resultado = resultado.concat(arreglo[i]);
    }

    return resultado;
}

export function ArrayIsDefined(arreglo){
    if(arreglo){
        let i = 0;
        for(;i<arreglo.length;i++){
            if(!arreglo[i]) return false;
        }   
        return true;
    }
    return false;
}

export function BuscaElementoArrayPorId(id,array){
    return;
}
