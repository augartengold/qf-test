
// Demo inspired by https://github.com/arvydas/blinkstick-node

const vendorId = 0x0403; // FTDI, Apple: 0x05ac


document.querySelector('button').addEventListener('click', handleClick);

async function handleClick() {
    const device = await getOpenedDevice();
    writeVal(device)
}

async function getOpenedDevice() {
    //const devices = await navigator.hid.getDevices();
    //device = devices.find(d => d.vendorId === vendorId);

    //if (!device) {
        device = await navigator.hid.requestDevice({filters: [{ vendorId }],});
    //}

    console.log(device)
    device = device[0]

    if (!device.opened) {
        console.log("OPENING")
        await device.open();
    }

    console.log(device)
    console.log(device.collections)
    return device;
}

async function writeVal(device) {
   
    const reportId = 0xF0;
    const len = 4
    const data = Int8Array.from([reportId, len, 0x55, 1, 2, 3]);

    try {
        // Request feature report.
        console.log("sending feature request")
        const dataView = await device.receiveFeatureReport(/* reportId= */ 0xA0);
        console.log(dataView);


        console.log("0: ", dataView.getInt8(0));
        console.log("1: ", dataView.getInt8(1));
        console.log("2: ", dataView.getInt8(2));
        console.log("3: ", dataView.getInt8(3));

        var view = new Uint8Array(dataView);
        console.log(view);



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