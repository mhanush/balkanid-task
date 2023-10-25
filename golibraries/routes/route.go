package routes

import (
	"golibraries/controllers"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controllers.Register)
	app.Post("/api/login", controllers.Login)
	app.Get("/api/user", controllers.User)
	app.Post("/api/logout", controllers.Logout)
	app.Post("/api/manager", controllers.Manager)
	app.Post("/api/delete", controllers.Delete)
	app.Post("/api/data", controllers.Data)
}
