const mysql = require('mysql');
const async = require('async');

//local mysql db connection
const con = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'root',
    database : 'pizzadb'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("the base is connected");
    async.series([
        // function(callback) {
        //     con.query("CREATE DATABASE IF NOT EXISTS  pizzadb", function (err) {
        //         if (err) throw err;
        //     });
        // },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`users` (\n" +
                "  `idusers` INT NOT NULL AUTO_INCREMENT,\n" +
                "  `login` VARCHAR(45) NULL,\n" +
                "  `pass` VARCHAR(65) NULL,\n" +
                "  `token` VARCHAR(45) NULL,\n" +
                "  PRIMARY KEY (`idusers`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`cook` (\n" +
                " `idcook` int(11) NOT NULL AUTO_INCREMENT,\n" +
                " `name` varchar(45) DEFAULT NULL,\n" +
                " `isFree` tinyint(1) DEFAULT NULL,\n" +
                "  PRIMARY KEY (`idcook`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`ingredients` (\n" +
                " `idingredients` INT NOT NULL AUTO_INCREMENT,\n" +
                " `name` VARCHAR(45) NULL,\n" +
                " `timeCook` INT NULL,\n" +
                " `imageSrc` VARCHAR(100) NULL,\n" +
                "  PRIMARY KEY (`idingredients`));", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`clientOrder` (\n" +
                "`idclientOrder` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "`userId` int(11) DEFAULT NULL,\n" +
                "`cookId` int(11) DEFAULT NULL,\n" +
                "`orderDone` tinyint(4) DEFAULT NULL,\n" +
                "`timeCooking` varchar(45) DEFAULT NULL,\n" +
                "PRIMARY KEY (`idclientOrder`),\n" +
                "KEY `fk_user_idx` (`userId`),\n" +
                "KEY `fk_cook_idx` (`cookId`),\n" +
                "CONSTRAINT `fk_cook` FOREIGN KEY (`cookId`) REFERENCES `cook` (`idcook`) ON DELETE NO ACTION ON UPDATE NO ACTION,\n" +
                "CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`idusers`) ON DELETE NO ACTION ON UPDATE NO ACTION)", function (err) {
                if (err) throw(err)
            })
        },
        function() {
            con.query("CREATE TABLE IF NOT EXISTS `pizzadb`.`clientIngredients` (\n" +
                "`idclientIngredients` int(11) NOT NULL AUTO_INCREMENT,\n" +
                "`orderId` int(11) DEFAULT NULL,\n" +
                "`ingredientId` int(11) DEFAULT NULL,\n" +
                "PRIMARY KEY (`idclientIngredients`),\n" +
                "KEY `fk_clientIngredients_1_idx` (`orderId`),\n" +
                "KEY `fk_clientIngredients_2_idx` (`ingredientId`),\n" +
                "KEY `fk_clientIngredient_1_idx` (`orderId`),\n" +
                "KEY `fk_inredient_idx` (`ingredientId`),\n" +
                "CONSTRAINT `fk_clientIngredients` FOREIGN KEY (`ingredientId`) REFERENCES `ingredients` (`idingredients`) ON DELETE NO ACTION ON UPDATE NO ACTION,\n" +
                "CONSTRAINT `fk_orderIngredients` FOREIGN KEY (`orderId`) REFERENCES `clientOrder` (`idclientOrder`) ON DELETE NO ACTION ON UPDATE NO ACTION )", function (err) {
                if (err) throw(err)
            })
        },
        function () {
            con.query(
                "INSERT IGNORE INTO `ingredients` VALUES (1,'Carbonara',5,'karb.png')," +
                "(2,'Pepperoni',3,'peperony.png'),(3,'Venice',4,'vene.png')," +
                "(4,'Four cheeses',2,'4chees.png'),(5,'Capricciosa',5,'kaprich.png')," +
                "(6,'Margarita',3,'margarita.png'),(7,'Roman',4,'rime.png')," +
                "(8,'Hawaiian',3,'gava.png'),(9,'With cervelat',2,'servelat.png')," +
                "(10,'Assorted',5,'asorty.png');", function (err, res) {
                    if (err) throw (err);
                    console.log(res)
                })
        }
    ]);

});

module.exports = con;
