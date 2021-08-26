package common

import (
	"encoding/csv"
	"fmt"
	"go_realtime/server/db_connection"
	"go_realtime/server/models"
	"net/http"
	"os"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

var csvData = [][]string{
	{"Id", "Username", "Password", "Email", "Profile", "Created_at"},
}

func UserProfile(c *gin.Context) (s string) {
	file, err := c.FormFile("file")

	// The file cannot be received.
	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "No file is received",
		})
		return
	}

	// Retrieve file information
	extension := filepath.Ext(file.Filename)
	// Generate random file name for the new uploaded file so it doesn't override the old file with same name
	newFileName := uuid.New().String() + extension

	// The file is received, so let's save it
	if err := c.SaveUploadedFile(file, "./public/"+newFileName); err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"message": "Unable to save the file",
		})
		return
	}

	// File saved successfully. Return proper result
	// c.JSON(http.StatusOK, gin.H{
	// 	"message": "Your file has been successfully uploaded.",
	// })
	return newFileName
}

func UserCSVReport(c *gin.Context) (s string) {
	db := db_connection.GetDB()

	rows, err := db.Model(&models.User{}).Rows()
	if err != nil {
		fmt.Println("Error Fetching rows::", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var user models.User
		// ScanRows is a method of `gorm.DB`, it can be used to scan a row into a struct
		db.ScanRows(rows, &user)

		// b, err := json.Marshal(user)
		// if err != nil {
		// 	fmt.Println(err)
		// 	return
		// }
		var profile string
		if user.Profile == "" {
			profile = user.Profile
		} else {
			profile = "http://localhost:8080/profile/" + user.Profile
		}

		csvData = append(csvData, []string{strconv.FormatUint(uint64(user.ID), 10), user.Username, user.Password, user.Email, profile, user.CreatedAt.String()})
	}

	// Open the file
	newFileName := uuid.New().String() + ".csv"

	recordFile, err := os.Create("./public/reports/" + newFileName)
	if err != nil {
		fmt.Println("Error while creating the file::", err)
		return
	}

	// Initialize the writer
	writer := csv.NewWriter(recordFile)

	// Write all the records
	err = writer.WriteAll(csvData)
	if err != nil {
		fmt.Println("Error while writing to the file ::", err)
		return
	}

	err = recordFile.Close()
	if err != nil {
		fmt.Println("Error while closing the file ::", err)
		return
	}
	return newFileName
}
