/**
 * Created by xaj on 2017/01/11.
 */
var dbhd = require('doohanpub').dbhd;
var Schema = dbhd.Schema;

var carSchema = new Schema({
    carSN:         String,
    carName:      String
});

carSchema.methods.setCarInfo = function(carSN, car) {
    this.carSN            = carSN;
    this.carName          = car.carName;
};

function CarModel() {
    this.car = null;
}

CarModel.prototype.createCarModel = function(mongoHandle) {
    this.car   = mongoHandle.model('carinfo', carSchema);
    return this.car;
};

CarModel.prototype.addCar = function(carSN, carInfo){
    var carInfoEntity = new carModel.car();
    carInfoEntity.setCarInfo(carSN, carInfo);
    console.log('add car information :' + carInfoEntity);
    carInfoEntity.save(function(err){
        if (!err){
            console.log('Add new car information success :' + JSON.stringify(carInfo));
        }else {
            console.log('Add new car information failed with error :'+ err);
        }
    });
};
CarModel.prototype.updateCarInfo = function(carInfo)
{
    var updateInfo = {
        carSN         : carInfo.carSN,
        carName        : carInfo.carName
    };
    var query = {carSN: carInfo.carSN};
    var option = {upsert:true};

    this.car.update(query, updateInfo, option,
        function(err)
        {
            if(err)
            {
                console.error("update car information [devSN:%s] with err %s",
                    carInfo.carSN, err);
            }
            else
            {
                console.log('update car information success '+ JSON.stringify(updateInfo));
            }

        }
    );
};

CarModel.prototype.getCar = function(carName, callback){
    this.car.find({carName:carName}, function(err, results){
        if (!err){
            if (results[0] != undefined){
                console.log('find car information success: ' + results[0]);
                callback(results);
            }else{
                console.log("can't find car information. carName: "+ carName);
                callback('');
            }
        }else {
            console.error('find car information from db failed with err:' + err);
            callback(err);
        }
    });
};

CarModel.prototype.deleteCar= function(carName, callback){
    this.car.remove({carName:carName}, function(err){
        if (!err){
            console.log('delete car information success. carName: '+ carName);
            callback();
        }else{
            console.error('delete client list information failed. carName: '+ carName);
        }
    });
};


var carModel = module.exports = new CarModel;