function sayHello(name) {
    console.log(`Hello ${name}`)
}

sayHello('Nuwan');

/**
 *
 * console.log(window); window, document objects are not found here
 * Those are found in browser environment
 *  */



let x = 100;
console.log('z: ', global.x)