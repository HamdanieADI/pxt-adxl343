
enum ADXL343Register {
    //% block="Device ID"
    DEVID = 0x00, // Device ID
    //% block="Tap threshold"
    THRESH_TAP = 0x1D, // Tap threshold
    //% block="X-axis offset"
    OFSX = 0x1E, // X-axis offset
    //% block="Y-axis offset"
    OFSY = 0x1F, // Y-axis offset
    //% block="Z-axis offset"
    OFSZ = 0x20, // Z-axis offset
    //% block="Tap duration"
    DUR = 0x21, // Tap duration
    //% block="Tap latency"
    LATENT = 0x22, // Tap latency
    //% block="Tap window"
    WINDOW = 0x23, // Tap window
    //% block="Activity threshold"
    THRESH_ACT = 0x24, // Activity threshold
    //% block="Inactivity threshold"
    THRESH_INACT = 0x25, // Inactivity threshold
    //% block="Inactivity time"
    TIME_INACT = 0x26, // Inactivity time
    //% block="Axis enable control for activity and inactivity detection"
    ACT_INACT_CTL = 0x27, // Axis enable control for activity and inactivity detection
    //% block="Free-fall threshold"
    THRESH_FF = 0x28, // Free-fall threshold
    //% block="Free-fall time"
    TIME_FF = 0x29, // Free-fall time
    //% block="Axis control for single/double tap"
    TAP_AXES = 0x2A, // Axis control for single/double tap
    //% block="Source for single/double tap"
    ACT_TAP_STATUS = 0x2B, // Source for single/double tap
    //% block="Data rate and power mode control"
    BW_RATE = 0x2C, // Data rate and power mode control
    //% block="Power-saving features control"
    POWER_CTL = 0x2D, // Power-saving features control
    //% block="Interrupt enable control"
    INT_ENABLE = 0x2E, // Interrupt enable control
    //% block="Interrupt mapping control"
    INT_MAP = 0x2F, // Interrupt mapping control
    //% block="Source of interrupts"
    INT_SOURCE = 0x30, // Source of interrupts
    //% block="Data format control"
    DATA_FORMAT = 0x31, // Data format control
    //% block="X-axis data 0"
    DATAX0 = 0x32, // X-axis data 0
    //% block="X-axis data 1"
    DATAX1 = 0x33, // X-axis data 1
    //% block="Y-axis data 0"
    DATAY0 = 0x34, // Y-axis data 0
    //% block="Y-axis data 1"
    DATAY1 = 0x35, // Y-axis data 1
    //% block="Z-axis data 0"
    DATAZ0 = 0x36, // Z-axis data 0
    //% block="Z-axis data 1"
    DATAZ1 = 0x37, // Z-axis data 1
    //% block="FIFO control"
    FIFO_CTL = 0x38, // FIFO control
    //% block="FIFO status"
    FIFO_STATUS = 0x39 // FIFO status
}

enum ADXL343DataRate {
    //% block=1600Hz
    D3200_HZ = 0b1111, // 1600Hz Bandwidth   140??A IDD
    //% block=800Hz
    D1600_HZ = 0b1110, //  800Hz Bandwidth    90??A IDD
    //% block=400Hz
    D800_HZ = 0b1101, //  400Hz Bandwidth   140??A IDD
    //% block=100Hz
    D400_HZ = 0b1100, //  200Hz Bandwidth   140??A IDD
    //% block=16g
    D200_HZ = 0b1011, //  100Hz Bandwidth   140??A IDD
    //% block=50Hz
    D100_HZ = 0b1010, //   50Hz Bandwidth   140??A IDD
    //% block=25Hz
    D50_HZ = 0b1001, //   25Hz Bandwidth    90??A IDD
    //% block=12.5Hz
    D25_HZ = 0b1000, // 12.5Hz Bandwidth    60??A IDD
    //% block=6.25Hz
    D12_5_HZ = 0b0111, // 6.25Hz Bandwidth    50??A IDD
    //% block=3.13Hz
    D6_25HZ = 0b0110, // 3.13Hz Bandwidth    45??A IDD
    //% block=1.56Hz
    D3_13_HZ = 0b0101, // 1.56Hz Bandwidth    40??A IDD
    //% block=0.78Hz
    D1_56_HZ = 0b0100, // 0.78Hz Bandwidth    34??A IDD
    //% block=0.39Hz
    D0_78_HZ = 0b0011, // 0.39Hz Bandwidth    23??A IDD
    //% block=0.20Hz
    D0_39_HZ = 0b0010, // 0.20Hz Bandwidth    23??A IDD
    //% block= 0.10Hz
    D0_20_HZ = 0b0001, // 0.10Hz Bandwidth    23??A IDD
    //% block=0.05Hz
    D0_10_HZ = 0b0000  // 0.05Hz Bandwidth    23??A IDD (default value)
}

enum ADXL343Range {
    //% block=16g
    R16_G = 0b11,   // +/- 16g
    //% block=8g
    R8_G = 0b10,   // +/- 8g
    //% block=4g
    R4_G = 0b01,   // +/- 4g
    //% block=2g
    R2_G = 0b00    // +/- 2g (default value)
}

enum ADXL343Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2
}

//% weight=100 color=#00A654 icon="\uf085" block="I2C ADXL343"
namespace HamdanieADI {
    export class ADXL343 {
        private _address: number;
        private _range: ADXL343Range;

        //% blockId=ADXL343_constructor
        //% block="constructor$address|range$range"
        //% address.defl=0x53
        //% range.defl=ADXL343Range.R2_G
        public constructor(address: number = 0x53, range: ADXL343Range = ADXL343Range.R2_G) {
            this._address = address
            this._range = range;
        }

        //% blockId=ADXL343_begin2
        //% block="%adxl343|begin"
        public begin2() {
            this.begin()
        }

        //% blockId=ADXL343_begin
        //% block="%adxl343|begin"
        public begin(): boolean {
            /* Check connection */
            let deviceid: number = this.getDeviceID();
            if (deviceid != 0xE5) {
                return false;
            }

            // Enable measurements
            this.writeRegister(ADXL343Register.POWER_CTL, 0x08);

            this.setRange(this._range)

            return true;
        }

        //% blockId=ADXL343_setrange
        //% block="%adxl343|set range|$range"
        //% range.defl=ADXL343Range.R2_G
        public setRange(range: ADXL343Range = ADXL343Range.R2_G) {
            /* Read the data format register to preserve bits */
            let format = this.readRegister(ADXL343Register.DATA_FORMAT);

            /* Update the data rate */
            format &= ~0x0F;
            format |= range;

            /* Make sure that the FULL-RES bit is enabled for range scaling */
            format |= 0x08;

            /* Write the register back to the IC */
            this.writeRegister(ADXL343Register.DATA_FORMAT, format);

            /* Keep track of the current range (to avoid readbacks) */
            this._range = range;
        }

        //% blockId=ADXL343_getrange
        //% block="%adxl343|get range"
        public getRange(): ADXL343Range {
            /* Read the data format register to preserve bits */
            return this.readRegister(ADXL343Register.DATA_FORMAT) & 0x03;
        }

        //% blockId=ADXL343_setdatarate
        //% block="%adxl343|set datarate|$dataRate"
        //% dataRate.defl=ADXL343DataRate.D0_10_HZ
        public setDataRate(dataRate: ADXL343DataRate = ADXL343DataRate.D0_10_HZ) {
            this.writeRegister(ADXL343Register.BW_RATE, dataRate);
        }

        //% blockId=ADXL343_getdatarate
        //% block="%adxl343|get datarate"
        public getDataRate(): ADXL343DataRate {
            /* Read the data format register to preserve bits */
            return this.readRegister(ADXL343Register.BW_RATE) & 0x0F;
        }

        //% blockId=ADXL343_writeRegister
        //% block="%adxl343|write byte register $reg|value $value"
        //% reg.defl=ADXL343Register.DEVID
        //% value.defl=0
        public writeRegister(reg: ADXL343Register = ADXL343Register.DEVID, value: number = 0): void {
            let buf = pins.createBuffer(2)
            buf[0] = reg
            buf[1] = value
            pins.i2cWriteBuffer(this._address, buf, false)
        }

        //% blockId=ADXL343_readRegister
        //% block="%adxl343|read byte register $reg"
        //% reg.defl=ADXL343Register.DEVID
        public readRegister(reg: ADXL343Register = ADXL343Register.DEVID): number {
            pins.i2cWriteNumber(this._address, reg, NumberFormat.UInt8LE)
            return pins.i2cReadNumber(this._address, NumberFormat.UInt8LE)
        }

        //% blockId=ADXL343_readRegisterI16
        //% block="%adxl343|read word register $reg"
        //% reg.defl=ADXL343Register.DATAX0
        public readRegisterI16(reg: ADXL343Register = ADXL343Register.DATAX0): number {
            pins.i2cWriteNumber(this._address, reg, NumberFormat.UInt8LE)
            return pins.i2cReadNumber(this._address, NumberFormat.Int16LE)
        }

        //% blockId=ADXL343_getDeviceID
        //% block="%adxl343|deviceId"
        //% blockSetVariable=id
        public getDeviceID(): number {
            return this.readRegister(ADXL343Register.DEVID)
        }

        //% blockId=ADXL343_get
        //% block="%adxl343|get|$dim"
        //% dim.defl=ADXL343Dimension.X
        public get(dim: ADXL343Dimension = ADXL343Dimension.X): number {
            if (dim == ADXL343Dimension.X)
                return this.readRegisterI16(ADXL343Register.DATAX0)
            else if (dim == ADXL343Dimension.Y)
                return this.readRegisterI16(ADXL343Register.DATAX0)
            else if (dim == ADXL343Dimension.Z)
                return this.readRegisterI16(ADXL343Register.DATAZ0)
            return 0;
        }
    }

    //% blockId=ADXL343_new
    //% block="new address $address|range $range"
    //% address.defl=83
    //% range.defl=ADXL343Range.R2_G
    //% blockSetVariable=adxl343
    export function ADXL343New(address: number = 83, range: ADXL343Range = ADXL343Range.R2_G): ADXL343 {
        return new ADXL343(address, range)
    }
}
