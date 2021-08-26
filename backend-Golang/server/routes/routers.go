package routes

import (
	"go_realtime/server/controllers"
	"os"

	"github.com/gin-gonic/gin"
)

func basicAuth(c *gin.Context) {
	// Get the Basic Authentication credentials
	user, password, hasAuth := c.Request.BasicAuth()

	envUsername := os.Getenv("BASICAUTH_USERNAME")
	envPassword := os.Getenv("BASICAUTH_PASSWORD")

	if hasAuth && user == envUsername && password == envPassword {
		// log.WithFields(log.Fields{
		// 	"user": user,
		// }).Info("User authenticated")
		return
	} else {
		c.Abort()
		c.Writer.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
		c.JSON(500, gin.H{
			"message": "Unauthorized..!",
		})
		// return
	}
}

func UserAuth(router *gin.RouterGroup) {
	router.POST("/register", controllers.UsersRegistration)
	router.POST("/login", controllers.UsersLogin)
}

func UserAction(router *gin.RouterGroup) {
	router.GET("/", basicAuth, controllers.UserRetrieve)
	// router.POST("/upload", controllers.UserProfile)
	router.PUT("/:id", basicAuth, controllers.UserUpdate)
	router.DELETE("/:id", basicAuth, controllers.UserDelete)
	router.POST("/reports", controllers.UsersReport)
}
