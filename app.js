const os = require('os');

console.log(`
    Archi: ${os.arch()}
    CPUs: ${JSON.stringify(os.cpus())}
    Free Memory: ${os.freemem() / (1024 * 1024 * 1024)}
    Total Memory: ${os.totalmem() / (1024 * 1024 * 1024)}
`);
