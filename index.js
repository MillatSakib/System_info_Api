const express = require('express');
const os = require('os');
const osu = require('node-os-utils');
const cpu = osu.cpu;
const mem = osu.mem;
const sysOs = osu.os;


const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
    res.send("Hello")
})

app.get('/', async (req, res) => {
    // Get total memory in bytes
    const totalMemory = os.totalmem();

    // Get free memory in bytes
    const freeMemory = os.freemem();

    // Calculate used memory in bytes
    const usedMemory = totalMemory - freeMemory;

    // Get CPU information
    const cpus = os.cpus();


    // Get the number of CPU cores
    const totalCores = cpus.length;

    // Get system uptime in seconds
    const uptime = os.uptime();

    // Get platform information
    const platform = os.platform();

    const cpuUsage = await cpu.usage()

    // Get system architecture
    const arch = os.arch();

    res.json({
        totalMemory: totalMemory / (1024 * 1024), // Convert from bytes to MB
        freeMemory: freeMemory / (1024 * 1024), // Convert from bytes to MB
        usedMemory: usedMemory / (1024 * 1024), // Convert from bytes to MB
        totalCores: totalCores,
        cpuUsage,
        uptime: uptime, // in seconds
        platform: platform,
        architecture: arch
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});


