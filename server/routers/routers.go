package routers

import (
	"github.com/gin-gonic/gin"
	"smart-light.com/services"
)

func RegisterRoutes(server *gin.Engine) {
	// Code for registering routes
	server.GET("/handle-light", services.HandleLight)

}
