//本模块参考wlanpub实现

node_modules下面的doohanpub才是一个封装好的库，他是一个公共模块，提供一些公共属性方法，包括dbhd和其他（暂未完成）等独立的子模块。
dbhd实现对数据库的访问，即提供连接数据库的操作；

使用：
1.加载doohanpub库：

var basic = require('doohanpub').basic,
    mqhd  = require('doohanpub').mqhd,（未实现）
    dbhd  = require('doohanpub').dbhd,
    monit = require('wlanpub').monitor;（未实现）
如果只使用其中的某个子模块，单独加载该子模块即可，不用全部加载。
一些系统调用、参数常量等使用basic子模块；MQ相关属性方法可以使用mqhd子模块（未实现）；数据库相关的请使用dbhd子模块；业务监控相关的请使用monitor子模块（未实现）。

2.如果使用dbhd子模块，请首先在模块入口处设置连接数据库参数，如果不设置，默认使用微软云上的环境：
如果需要同时使用redis和mongoose数据库，请调用以下接口：
dbhd.connectDatabase({'port':6379, 'host':'192.168.110.34'}, 'mongodb://admin:admin@192.168.110.33:40000/lyytest');
如果只使用redis数据库，请调用以下接口：
dbhd.connectRedis({'port':6379, 'host':'192.168.110.34'});
如果只使用mongoose数据库，请调用以下接口：
dbhd.connectMongoose('mongodb://admin:admin@192.168.110.33:40000/lyytest');（目前只写了这一个）

Dbhd

基于redis数据库和mongoose数据库进行封装。主要封装连接上述两个数据库的一些接口。

dbhd.connectRedis(redisPara)
函数功能：用来连接redis数据库。
参数介绍：redisPara为连接redis数据库的参数。为JSON格式，形如：{'port':6379, 'host':'192.168.110.34'}，其中port用来指定端口号，host用来指定数据库所在的主机名或IP地址。
默认情形：如果不携带redisPara参数，则默认连接到微软云上的redis数据库。

dbhd.connectMongoose(mongoosePara)
函数功能：用来连接mongoose数据库。
参数介绍：mongoosePara为连接mongoose数据库的参数。为字符串格式，形如：mongodb://admin:admin@192.168.110.33:40000/WLAN。
默认情形：如果不携带mongoosePara参数，则默认连接到微软云上的mongoose数据库。

dbhd.connectDatabase(redisPara, mongoosePara)
函数功能：用来连接redis数据库和mongoose数据库。
参数介绍：redisPara和mongoosePara分别见方法connectRedis和connectMongoose的介绍，不再赘述。
默认情形：同上。

dbhd.redisClient
该属性为连接redis数据库的句柄对象。

dbhd.mongo
该属性为连接mongoose数据库的句柄对象。

dbhd.Schema
该属性等同于require('mongoose').Schema，为mongoose的Schema句柄。若要使用Schema请务必使用该模块暴露出的Schema属性，不要自行require出。