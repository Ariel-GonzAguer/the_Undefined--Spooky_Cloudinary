// console.log(typeof ([] + []) === "string");

// console.log("false" == false);

// console.log(typeof null === "object");

// console.log(typeof NaN === "number");

// let a= Math.floor(Math.random() * 6.66);
// let b= Math.floor(Math.random() * 6.66);
// let c= Math.floor(Math.random() * 6.66);

// console.log(a, b, c)
function alimentar(nombre) {
  if (nombre === "Gatanás") {
    console.log("Come, Gatanás :3");
  } else {
    console.log("Hola", nombre.toUpperCase());
  }

  let edad = 25;

  edad = 66.6; // Error 3

  let arrayDeDemonios = ["Gatbaddón", "Miaulzebú", "Catsmoteo"];

  for (let i = 0; i < arrayDeDemonios.length; i++) {
    console.log(arrayDeDemonios[i]);
  }

  let ganarHackaton = "Haz ganado la Cloudinary Hackaton ";

  console.log(ganarHackaton + "yo, true");

  return ganarHackaton;
}

alimentar("Sundae");
