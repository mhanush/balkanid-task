package database
import(
	"golibraries/models"
	"gorm.io/gorm"
	"gorm.io/driver/mysql"	
)
var DB *gorm.DB
var DBProject *gorm.DB
var DBDetails *gorm.DB
func Connect(){
	connection,err:=gorm.Open(mysql.Open("admin:balkanid@tcp(database-1.chjiunonn1ij.ap-south-1.rds.amazonaws.com:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"),&gorm.Config{})
	if err!=nil{
		panic("could not connect to database")
	}
	DB=connection

	connection.AutoMigrate(models.User{})
	connections,err:=gorm.Open(mysql.Open("admin:balkanid@tcp(database-1.chjiunonn1ij.ap-south-1.rds.amazonaws.com:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"),&gorm.Config{})
	if err!=nil{
		panic("could not connect to database")
	}
	DBProject=connections
	connections.AutoMigrate(models.Projectkeys{})

	connectiones,err:=gorm.Open(mysql.Open("admin:balkanid@tcp(database-1.chjiunonn1ij.ap-south-1.rds.amazonaws.com:3306)/users?charset=utf8mb4&parseTime=True&loc=Local"),&gorm.Config{})
	if err!=nil{
		panic("could not connect to database")
	}
	DBDetails=connectiones
	connectiones.AutoMigrate(models.Projectdetails{})
}