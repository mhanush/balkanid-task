package controllers

import (
	"fmt"
	"golibraries/database"
	"golibraries/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

const secretkey = "secret"

func Register(c *fiber.Ctx) error {
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		return err
	}
	/*sendstring*/
	Password, err := bcrypt.GenerateFromPassword([]byte(data["Password"]), 14)
	/*Uid, err := strconv.ParseUint(data["Uid"], 10, 64)
	if err != nil {
		return err
	}*/
	existingUser := models.User{}
	if err := database.DB.Where("email = ?", data["Email"]).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"message": "Email is already in use",
		})
	}
	user := models.User{
		Uid:         data["Uid"],
		Name:        data["Name"],
		Designation: data["Designation"],
		Email:       data["Email"],
		Password:    Password,
	}
	database.DB.Create(user)
	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		return err
	}
	var user models.User
	database.DB.Where("Email=?", data["Email"]).First(&user)
	if user.Uid == "0" {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{"Message": "User Not Found"})
	}
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["Password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{"Message": "password Not Matching"})
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Uid,
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(), //1 day
	})
	token, err := claims.SignedString([]byte(secretkey))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{"Message": "Could Not Login"})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true, //important so front end can't access
		SameSite: "None",
		Secure:   true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"Message": token,
	})
}

func User(c *fiber.Ctx) error {
	cookie := c.Cookies("jwt")
	token, err := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(secretkey), nil //error is nil
	})
	if err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{"Message": "Unauthenticated"})
	}
	claims := token.Claims.(*jwt.StandardClaims)
	//claims does not have issuer function bcoz they are interface so converting into standard
	var user models.User
	database.DB.Where("Uid=?", claims.Issuer).First(&user)
	return c.JSON(user)
}

func Manager(c *fiber.Ctx) error {
	type Userss struct {
		Email  string
		Work   string
		Status string
	}
	type Project struct {
		Topic string
		Email string
		Users []Userss
	}
	var project Project
	err := c.BodyParser(&project)
	if err != nil {
		return err
	}
	projectkeys := models.Projectkeys{
		Email: project.Email,
		Topic: project.Topic,
	}
	database.DBProject.Create(&projectkeys)
	for _, user := range project.Users {
		//var Deleted string
		result := database.DB.Table("users").Select("Email").Where("Email=?", user.Email).First(&user)
		if result.Error != nil {
			database.DBProject.Unscoped().Table("projectkeys").Where("Email=? AND Topic=?", project.Email, project.Topic).Delete(&user)
			return c.JSON(fiber.Map{
				"Message": "Mangers Or invalid user cannot be addded",
			})
		}
		if result.RowsAffected == 0 {
			database.DBProject.Unscoped().Table("projectkeys").Where("Email=? AND Topic=?", project.Email, project.Topic).Delete(&user)
			return c.JSON(fiber.Map{
				"Message": "Mangers Or invalid user cannot be addded",
			})
		}
		type DesignationResult struct {
			Designation string
		}
		var designationResult DesignationResult
		results := database.DB.Table("users").Select("Designation").Where("Email=?", user.Email).Find(&designationResult)
		if results.Error != nil {
			database.DBProject.Unscoped().Table("projectkeys").Where("Email=? AND Topic=?", project.Email, project.Topic).Delete(&user)
			return c.JSON(fiber.Map{
				"Message": "Mangers Or invalid user cannot be addded",
			})
		}
		designation := designationResult.Designation
		if designation == "Manager" {
			database.DBProject.Unscoped().Table("projectkeys").Where("Email=? AND Topic=?", project.Email, project.Topic).Delete(&user)
			return c.JSON(fiber.Map{
				"Message": "Mangers Or invalid user cannot be addded",
			})
		}
		if results.RowsAffected == 0 {
			database.DBProject.Unscoped().Table("projectkeys").Where("Email=? AND Topic=?", project.Email, project.Topic).Delete(&user)
			return c.JSON(fiber.Map{
				"Message": "Mangers Or invalid user cannot be addded",
			})
		}
		projecdetails := models.Projectdetails{
			ProjectId: projectkeys.ID,
			Email:     user.Email,
			Work:      user.Work,
			Status:    user.Status,
		}
		database.DBDetails.Create(&projecdetails)
	}
	return c.JSON(fiber.Map{
		"Message": "Added",
	})
}
func Data(c *fiber.Ctx) error {
	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		return err
	}
	var user models.User
	result := database.DB.Select("Designation").Where("Email=?", data["Email"]).First(&user)
	if result.Error != nil {
		fmt.Println("Error fetching user data:", result.Error)
		return result.Error
	} else if result.RowsAffected == 0 {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"Message": "Data",
		})
	} else {
		Designation := user.Designation
		var projects []struct {
			Topic string
			Id    string
		}
		if Designation == "Manager" || Designation == "User" {
			result := database.DBProject.Table("projectkeys").Select("Topic", "Id").Where("Email=?", data["Email"]).Find(&projects)
			if result.Error != nil {
				fmt.Println("Handling Manager/User case")
				return result.Error
			} else if result.RowsAffected == 0 {
				return c.JSON(fiber.Map{
					"Message": "No Data",
				})
			}
			return c.JSON(projects)
		} else {
			fmt.Println("Handling other case")
			var projects []struct {
				Work      string
				Status    string
				ProjectId string
			}
			result := database.DBDetails.Table("projectdetails").Select("Work", "Status").Where("Email=?", data["Email"]).Find(&projects)
			if result.Error != nil {
				return result.Error
			} else if result.RowsAffected == 0 {
				return c.JSON(fiber.Map{
					"Message": "No Data",
				})
			}
			return c.JSON(projects)
		}
	}
}
func Delete(c *fiber.Ctx) error {

	var data map[string]string
	err := c.BodyParser(&data)
	if err != nil {
		return err
	}
	var user models.User
	database.DB.Where("Email=? AND Uid=?", data["Email"], data["Uid"]).First(&user)
	if (user.Uid == "0") || (user.Email == "0") {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{"Message": "User Not Found"})
	}
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["Password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{"Message": "password Not Matching"})
	}
	database.DB.Where("Uid=? AND Email=?", data["Uid"], data["Email"]).Delete(&user)
	database.DBDetails.Table("projectkeys").Where("Email=?", data["Email"]).Delete(&user)
	database.DBDetails.Table("projectdetails").Where("Email=?", data["Email"]).Delete(&user)

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		SameSite: "None",
		Secure:   true,
	}
	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"Message": "Successfull",
	})
}

func Logout(c *fiber.Ctx) error {
	//for logout we need to remove cookies
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
		SameSite: "None",
		Secure:   true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"Message": "Successfull",
	})
}
