
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
        const devInterfaces = await navigator.hid.requestDevice({filters: [{ vendorId }],});
    //}

    console.log(devInterfaces)
    const interface1 = devInterfaces[1];

    if (!interface1.opened) {
        console.log("OPENING")
        await interface1.open();
    } else {
		await interface1.close();
		await interface1.open();
	}

    console.log(interface1)
    console.log(interface1.collections)
	
    return interface1;
}

async function writeVal(device) {
   
    const reportId = 0xF0;
    const len = 4
    //const data = Int8Array.from([reportId, len, 0x55, 1, 2, 3]);
	//const data = Int8Array.from([len, 0x55, 1, 2, 3]);
	
	const data = [len, 0, 1, 2, 3];
	var vals = new Uint8Array(data);
	console.log(vals)
	

    try {
        await device.sendReport(reportId, vals);
    } catch (error) {
        console.log("ERROR");
        console.error(error);
    }

    console.log("written");
    
}