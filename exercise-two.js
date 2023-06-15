"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemAx: problemA,
  problemBx: problemB
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  let problem = module.exports["problem" + arg];
  if (problem) problem();
});

function problemA() {
  // callback version
  /* exerciseUtils.readFile("poem-two/stanza-01.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  });
  exerciseUtils.readFile("poem-two/stanza-02.txt", function (err, stanza) {
    exerciseUtils.blue(stanza);
  }); */

  // promise version
  // Tu código acá:
  /* const promiseOne = exerciseUtils.promisifiedReadFile(__dirname + '/poem-two/stanza-01.txt')
  const promiseTwo = exerciseUtils.promisifiedReadFile(__dirname + '/poem-two/stanza-02.txt')
  Promise.all([promiseOne,promiseTwo])
  .then(response => {
    exerciseUtils.blue(response)
  }) */
  /* Promise.all([promiseOne,promiseTwo])
  .then(response => exerciseUtils.blue(response))
  .catch((error) => exerciseUtils.magenta(new Error("done"))) */
  /* .catch(error => {
    const recibedError = new Error(error)
    exerciseUtils.magenta(recibedError)
  }) */
  /* exerciseUtils.readFile(__dirname + "poem-two/stanza-01.txt")
  .then(response => exerciseUtils.blue(response))
  exerciseUtils.readFile("poem-two/stanza-02.txt")
  .then(response => {
    exerciseUtils.blue(response)
    console.log('done');
  }) */
  const promiseOne = exerciseUtils.promisifiedReadFile(__dirname + '/poem-two/stanza-01.txt')
  const promiseTwo = exerciseUtils.promisifiedReadFile(__dirname + '/poem-two/stanza-02.txt')
  Promise.all([promiseOne,promiseTwo])
  .then(arrayResponse => {
    exerciseUtils.blue(arrayResponse[0])
    exerciseUtils.blue(arrayResponse[1])
    console.log('done');
  })
}


function problemB() {
  let filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return "poem-two/" + "stanza-0" + n + ".txt";
  });
  let randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = "wrong-file-name-" + (randIdx + 1) + ".txt";

  // callback version
  /* filenames.forEach((filename) => {
    exerciseUtils.readFile(filename, function (err, stanza) {
      exerciseUtils.blue(stanza);
      if (err) exerciseUtils.magenta(new Error(err));
    });
  }); */

  // promise version
  // Tu código acá:
  /* const promisesArr = filenames.map(file => exerciseUtils.promisifiedReadFile(__dirname + "/" + file))

  function resolvedPromises (promises) {
    if(promises.length === 0){
      return Promise.resolve([])
    }

    const[firstPromise,...anotherPromises] = promises

    return firstPromise.then(resultado => {
      return resolvedPromises(anotherPromises).then(anotherResults => {
        return [resultado, ...anotherResults]
      })
    }).catch(error => {
      const recibedError = new Error(error)
      return console.log(recibedError);
    })
  }

  resolvedPromises(promisesArr)
  .then(() => console.log('done'))
  .catch(error => {
    const recibedError = new Error(error)
    return console.log(recibedError)
  }) */
  let promise = exerciseUtils.promisifiedReadFile(filenames[0])
  for (let i = 1; i < filenames.length; i++) {
    promise = promise.then(response => {
      exerciseUtils.blue(response)
      return exerciseUtils.promisifiedReadFile(filenames[i])
    })
    .catch(error => {
      exerciseUtils.magenta(new Error(error))
      return exerciseUtils.promisifiedReadFile(filenames[i])
    })
  }
}

// EJERCICIO EXTRA
function problemC() {
  let fs = require("fs");
  function promisifiedWriteFile(filename, str) {
    // tu código acá:
  }
}
