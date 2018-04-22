

const i2c = require('i2c-bus');

var MLX90614 = function (addr=0x5A) {

        // MLX90614 Default I2C Address //
    if (addr % 2 == 0 && addr <= 0xFF) {
        this.MLX_I2CADDR = addr;
        this.i2cBus = i2c.openSync(1);
    }
    else {
        err = "Bad i2c device address"
        console.error(err);
    }

}

MLX90614.prototype.register = {
    // MLX90614 RAM and EEPROM Addresses //
    'DEVICE_ID'     : 0xd0,
    'RESET'         : 0xe0,
    'CTRL_MEAS'     : 0xf4,
    'ADC_OUT_MSB'   : 0xf6,
    'ADC_OUT_LSB'   : 0xf7,
    'ADC_OUT_XLSB'  : 0xf8,

    'RAW_IR1'       : 0x04,
    'RAW_IR2'       : 0x05,
    'TA'            : 0x06,
    'TOBJ1'         : 0x07,
    'TOBJ2'         : 0x08,

    'TOMAX'         : 0x20,
    'TOMIN'         : 0x21,
    'PWMCTRL'       : 0x22,
    'TARANGE'       : 0x23,
    'KE'            : 0x24,
    'CONFIG'        : 0x25,
    'ADDRESS'       : 0x2E,
    'ID0'           : 0x3C,
    'ID1'           : 0x3D,
    'ID2'           : 0x3E,
    'ID3'           : 0x3F,

    'REG_SLEEP'     : 0xFF
}


MLX90614.prototype.readAmbient = function (cb) {
    this.i2cBus.readWord(this.MLX_I2CADDR, this.register.TA, function(err, data) {
        if (err) {
            console.error(err);
            cb(err);
        }
        else {
            var temp = data * 0.02;
            temp -= 273.15;
            cb(err, temp);
        }
    });  
}

MLX90614.prototype.readAmbientSync = function () {
    var temp = this.i2cBus.readWordSync(this.MLX_I2CADDR, this.register.TA);
    temp *= 0.02;
    temp -= 273.15;
    console.log(temp.toString());
    return temp;
}

MLX90614.prototype.readObject = function (cb) {
    this.i2cBus.readWord(this.MLX_I2CADDR, this.register.TOBJ1, function(err, data) {
        if (err) {
            console.error(err);
            cb(err);
        }
        else {
            var temp = data * 0.02;
            temp -= 273.15;
            cb(err, temp);
        }
    });  
}

MLX90614.prototype.readObjectSync = function () {
    temp = this.i2cBus.readWordSync(this.MLX_I2CADDR, this.register.TOBJ1);
    temp *= 0.02;
    temp -= 273.15;
    console.log(temp.toString());
    return temp;
}

MLX90614.prototype.close = function () {
    this.i2cBus.closeSync()
}

module.exports = MLX90614;