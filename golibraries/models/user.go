package models

import "gorm.io/gorm"

type User struct {
	Uid         string `gorm:"unique"`
	Name        string
	Designation string
	Email       string `gorm:"unique"`
	Password    []byte `json:"-"`
}

type Projectkeys struct {
	gorm.Model
	Email string
	Topic string
}

type Projectdetails struct{
	ProjectId uint `gorm:"foreignKey:ID"`
	Id uint 
	Email string
	Work string
	Status string
}
