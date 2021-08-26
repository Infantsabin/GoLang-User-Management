package middlewares

import "github.com/gin-gonic/gin"

func basicAuth(c *gin.Context) {
	// Get the Basic Authentication credentials
	user, password, hasAuth := c.Request.BasicAuth()
	if hasAuth && user == "testuser" && password == "testpass" {
		// log.WithFields(log.Fields{
		// 	"user": user,
		// }).Info("User authenticated")
		return
	} else {
		c.Abort()
		c.Writer.Header().Set("WWW-Authenticate", "Basic realm=Restricted")
		return
	}
}
