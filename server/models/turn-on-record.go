package models

import (
	"errors"
	"fmt"
	"gorm.io/gorm"
	"smart-light.com/db"
	"time"
)

type TurnOnRecord struct {
	ID       uint      `gorm:"primaryKey;autoIncrement"`
	IsOpen   int       `gorm:"not null"` // 枚举值 0 和 1
	ExecTime time.Time `gorm:"not null"`
}

func CreateTurnOnRecordTable() {
	err := db.DB.AutoMigrate(&TurnOnRecord{})
	if err != nil {
		panic("failed to migrate database")
	}
}

func InsertRecord(data TurnOnRecord) error {
	var existingRecord TurnOnRecord
	err := db.DB.Where("is_open = ? AND exec_time = ?", data.IsOpen, data.ExecTime).First(&existingRecord).Error
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			if err := db.DB.Create(&data).Error; err != nil {
				fmt.Println("Failed to insert record:", err)
				return err
			} else {
				fmt.Println("Record inserted:", data)
				return nil
			}
		} else {
			fmt.Println("Error querying record:", err)
			return err
		}
	} else {
		fmt.Println("Record already exists, skipping insertion.")
		return err
	}
}
