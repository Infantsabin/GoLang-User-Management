package main

import (
	"go_realtime/server/db_connection"
	"go_realtime/server/models"
	"go_realtime/server/routes"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	"github.com/joho/godotenv"
)

func Migrate(db *gorm.DB) {
	models.AutoMigrate()
}

func main() {
	db := db_connection.Init()
	Migrate(db)
	defer db.Close()

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatalf("Error loading .env file")
	}

	r := gin.Default()
	r.Static("/profile", "./public/profile")
	r.Static("/report", "./public/reports")
	v1 := r.Group("/api")

	// c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
	// c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
	// c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
	// c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

	// r.Use(cors.New(cors.Config{
	// 	AllowOrigins:  []string{"*"},
	// 	AllowMethods:  []string{"POST", "GET", "PUT", "DELETE"},
	// 	AllowHeaders:  []string{"Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "accept", "origin", "Cache-Control", "X-Requested-With"},
	// 	ExposeHeaders: []string{"Content-Length"},
	// }))
	routes.UserAuth(v1.Group("/auth"))
	routes.UserAction(v1.Group("/users"))

	r.Run(":8080") // listen and serve on 0.0.0.0:8080
}
