package services

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"smart-light.com/models"
	"time"
)

func HandleLight(c *gin.Context) {
	record := models.TurnOnRecord{
		IsOpen:   1,
		ExecTime: time.Now(),
	}

	// err := c.ShouldBindJSON(&record) // This will bind the request body to the event struct
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error: cannot parse data": err.Error()})
	// 	return
	// }

	err := models.InsertRecord(record)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not insert record"})
		fmt.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": 0, "isOpen": record.IsOpen, "execTime": record.ExecTime})
}
