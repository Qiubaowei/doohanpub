var dbhd  = require('doohanpub').dbhd;
var config = require('doohanpub').config;

var mongoConnParas = config.get('mongoConnParas');

var carModel = require('./models/carModel')


dbhd.connectDatabase(mongoConnParas);


carModel.createCarModel(dbhd.mongo)
var carInfo = {
    carSN      : "900001",
    carName    : "itank1"
};
//carModel.addCar(carInfo.carSN, carInfo)
//carModel.updateCarInfo(carInfo)

carModel.getCar("itank1", function (res) {
    console.log(res)
})

