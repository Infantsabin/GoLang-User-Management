package models

import (
	"go_realtime/server/db_connection"
	"time"

	"gorm.io/gorm"
)

// Models should only be concerned with database schema, more strict checking should be put in validator.
//
// More detail you can find here: http://jinzhu.me/gorm/models.html#model-definition
//
// HINT: If you want to split null and "", you should use *string instead of string.
type User struct {
	ID        uint   `gorm:"primary_key"`
	Username  string `gorm:"column:username;unique_index"`
	Email     string `gorm:"column:email;unique_index"`
	Password  string `gorm:"column:password;not null"`
	Profile   string `gorm:"column:profile;null"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

func AutoMigrate() {
	db := db_connection.GetDB()

	db.AutoMigrate(&User{})
}

// // You could input the conditions and it will return an User in database with error info.
// // 	user, err := FindOneUser(&User{Username: "username0"})
// func FindOneUser(condition interface{}) (User, error) {
// 	db := db_connection.GetDB()
// 	var model User
// 	err := db.Where(condition).First(&model).Error
// 	return model, err
// }

// // You could input an User which will be saved in database returning with error info
// // 	if err := SaveOne(&user); err != nil { ... }
// func SaveOne(data interface{}) error {
// 	db := db_connection.GetDB()
// 	err := db.Save(data).Error
// 	return err
// }

// // You could update properties of an User to database returning with error info.
// //  err := db.Model(user).Update(User{Username: "wangzitian0"}).Error
// func (model *User) Update(data interface{}) error {
// 	db := db_connection.GetDB()
// 	err := db.Model(model).Update(data).Error
// 	return err
// }
