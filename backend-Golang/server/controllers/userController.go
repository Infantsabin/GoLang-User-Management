package controllers

import (
	"fmt"
	"go_realtime/server/common"
	"go_realtime/server/db_connection"
	"go_realtime/server/models"

	"github.com/gin-gonic/gin"
)

func UsersRegistration(c *gin.Context) {
	db := db_connection.GetDB()

	// data, _ := ioutil.ReadAll(c.Request.Body)
	// fmt.Printf("ctx.Request.body: %v", string(data))
	// fmt.Printf("%v", string(data["username"]))
	// user := models.User{}
	// json.Unmarshal(data, &user)

	// POSTMAN POST CALL
	username := c.PostForm("username")
	email := c.PostForm("email")
	password := c.PostForm("password")

	user := models.User{Username: username, Email: email, Password: password}

	result := db.Create(&user)

	c.JSON(200, gin.H{
		"message": "Registered..!",
		"data":    result,
	})
}

func UsersLogin(c *gin.Context) {
	db := db_connection.GetDB()

	user := models.User{}

	// data, _ := ioutil.ReadAll(c.Request.Body)
	// username := gjson.Get(string(data), "username").String()
	// password := gjson.Get(string(data), "password").String()

	// POSTMAN POST CALL
	username := c.PostForm("username")
	password := c.PostForm("password")

	// result := db.Where("username =? AND password = ?", username, password).First(&user)
	result := db.Where("username = ? AND password = ?", username, password).Or("email = ? AND password = ?", username, password).First(&user)

	if result.RowsAffected > 0 {
		c.JSON(200, gin.H{
			"message": "Login Successfully..!",
			"data":    result,
		})
	} else {
		c.JSON(401, gin.H{
			"message": "Invalid Credential..!",
		})
	}
}

func UserRetrieve(c *gin.Context) {
	db := db_connection.GetDB()

	// var users []User
	user := []models.User{}

	result := db.Find(&user)
	fmt.Println(result.RowsAffected)
	if result.RowsAffected > 0 {
		c.JSON(200, gin.H{
			"message": "All User List..!",
			"data":    result,
		})
	} else {
		c.JSON(204, gin.H{
			"message": "No Data found..!",
		})
	}
}

func UserUpdate(c *gin.Context) {
	db := db_connection.GetDB()

	user := models.User{}
	userId := c.Param("id")
	fmt.Println(userId)

	// POSTMAN POST CALL
	username := c.PostForm("username")
	email := c.PostForm("email")
	password := c.PostForm("password")

	userDetail := db.Where("id = ?", userId).First(&user)

	if userDetail.RowsAffected > 0 {
		// READ BODY DATA AS A JSON
		// data, _ := ioutil.ReadAll(c.Request.Body)

		// username := gjson.Get(string(data), "username").String()
		// email := gjson.Get(string(data), "email").String()
		// password := gjson.Get(string(data), "password").String()

		// fmt.Println(username)
		var profilename string
		profilename = common.UserProfile(c)

		result := db.Model(&user).Where("id = ?", userId).Updates(map[string]interface{}{"username": username, "email": email, "password": password, "profile": profilename})

		c.JSON(200, gin.H{
			"message": "Updated Successfully..!",
			"data":    result,
		})
	} else {
		c.JSON(401, gin.H{
			"message": "Invalid Id..!",
		})
	}
}

func UserDelete(c *gin.Context) {
	db := db_connection.GetDB()

	user := models.User{}
	userId := c.Param("id")

	userDetail := db.Where("id = ?", userId).First(&user)

	if userDetail.RowsAffected > 0 {
		db.Delete(&user, userId)
		c.JSON(200, gin.H{
			"message": "User Deleted Successfully..!",
			"data":    "",
		})
	} else {
		c.JSON(401, gin.H{
			"message": "Invalid Id..!",
		})
	}
}

func UsersReport(c *gin.Context) {
	reportFilename := common.UserCSVReport(c)

	c.JSON(200, gin.H{
		"message": "Report Generated Successfully..!",
		"data":    reportFilename,
	})
}
