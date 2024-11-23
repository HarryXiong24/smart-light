package services

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"smart-light.com/models"
	"strconv"
	"time"
)

func HandleStatus(c *gin.Context) {

	isOpen := c.Query("isOpen")

	if isOpen == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 1, "error": "could not get parameter"})
		return
	}

	isOpenNumber, err := strconv.Atoi(isOpen)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"status": 1,
			"error":  "'age' must be a valid integer",
		})
		return
	}

	record := models.Light{
		IsOpen:   isOpenNumber,
		ExecTime: time.Now(),
	}

	fmt.Println(record)

	err = models.InsertRecord(record)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 1, "error": "could not insert record"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": 0, "isOpen": record.IsOpen, "execTime": record.ExecTime})

	// c.JSON(http.StatusOK, gin.H{"status": 0, "isOpen": record.IsOpen, "execTime": record.ExecTime})
}

func ControlLight(c *gin.Context) {
	record, err := models.GetCurrentStatus()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": 1, "error": "could not get current status"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": 0, "isOpen": record.IsOpen, "execTime": record.ExecTime})
}
