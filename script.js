
// Demo inspired by https://github.com/arvydas/blinkstick-node

const vendorId = 0x0403; // FTDI

document.querySelector('button').addEventListener('click', handleClick);

async function handleClick() {
    const device = await getOpenedDevice();
    writeVal(device)
}

async function getOpenedDevice() {
    const devices = await navigator.hid.getDevices();
    let device = devices.find(d => d.vendorId === vendorId);

    if (!device) {
        device = await navigator.hid.requestDevice({filters: [{ vendorId }],});
    }

    if (!device.opened) {
        await device.open();
    }

    return device;
}

async function writeVal(device) {
   
    const reportId = 0xF0;
    const len = 4
    const data = Int8Array.from([reportId, len, 0x55, 1, 2, 3]);
  
    try {
        await device.sendReport(reportId, data);
    } catch (error) {
        console.log("ERROR");
        console.error(error);
    }

    console.log("written");
}