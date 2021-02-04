
// Demo inspired by https://github.com/arvydas/blinkstick-node

const vendorId = 0x0403; // FTDI
let device;

document.querySelector('button').addEventListener('click', handleClick);

async function handleClick() {
    const device = await getOpenedDevice();
    writeVal()
}

async function getOpenedDevice() {
    const devices = await navigator.hid.getDevices();
    device = devices.find(d => d.vendorId === vendorId);

    if (!device) {
        device = await navigator.hid.requestDevice({filters: [{ vendorId }],});
    }

    if (!device.opened) {
        await device.open();
    }

    return device;
}

async function writeVal() {
   
    const reportId = 0xF0;
    const len = 4
    const data = Int8Array.from([reportId, len, 0x55, 1, 2, 3]);
  
    try {
        // Request feature report.
        const dataView = await device.receiveFeatureReport(/* reportId= */ 0xE0);
        console.log(dataView);
    } catch (error) {
        console.log("ERROR");
        console.error(error);
    }

    console.log("READ");

/*
    try {
        await device.sendReport(reportId, data);
    } catch (error) {
        console.log("ERROR");
        console.error(error);
    }

    console.log("written");
    */
}