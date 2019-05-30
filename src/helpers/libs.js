const helpers={};
  helpers.randomNumber=()=>{
    const possible='abcdefghijkopqrstuwxyz0123456789';
    let randomNumber=0;
    for(let i=0;i<6;i++){//para 6 caracteres en la extension
      randomNumber+=possible.charAt(Math.floor(Math.random()*possible.length));//multiplico un valor aleatorio entre 0 y 1 por tamano de possible y redondeo
      //charAt elige caracter que esta en la posicion segun parametro de posible
      //se acumula por que vamos a almacenar todos los caracteres
    }
    return randomNumber;
  };
module.exports=helpers;
