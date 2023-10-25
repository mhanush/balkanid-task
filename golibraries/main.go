package main

import (
	"golibraries/database"
	"golibraries/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()
	// Add CORS middleware here
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
		AllowMethods: "GET, POST",
		AllowCredentials: true, // Change to true if needed
	}))//front and back end run on differnt port so not added it throws error
	database.Connect()
	routes.Setup(app)
	app.Listen(":8000")
}
