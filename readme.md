# MLX90614 sensor for node.js
---
A node.js module for working with the infrared temperature sensor via i2c. Ported from 

## About the sensor
TThe MLX90614 is an infrared thermometer for non-contact temperature measurements. Both the IR sensitive thermopile detector chip and the signal conditioning ASIC are integrated in the same TO-39 can. Integrated into the MLX90614 are a low noise amplifier, 17-bit ADC and powerful DSP unit thus achieving high accuracy and resolution of the thermometer.
Datasheet available [ via from melexis](https://www.melexis.com/en/product/MLX90614/Digital-Plug-Play-Infrared-Thermometer-TO-Can#).

## Install
```
$ npm install mlx90614-driver
```
#### Raspberry PI
Enable [i2c on your Pi](https://github.com/kelly/node-i2c#raspberry-pi-setup) if you haven't done already. To avoid having to run the i2c tools as root add the ‘pi’ user to the i2c group:
```
sudo adduser pi i2c
```

## Usage

```
var MLX90614 = require('mlx90614-driver');

var sensor = new MLX90614();

function getTemp() {
  var temp = sensor.readObject();
  console.log(temp);
}


window.setInterval(getTemp, 1000);

```

