package api

import (
	"authapi/cmd/repo/db"
	"fmt"
	"log"
	"net/http"
	"time"
)

type apiServer struct {
	port     string
	database db.DataBase
	auth     Auth
}

// initialize a new api server
func NewApiServer(listen string, db db.DataBase) *apiServer {

	return &apiServer{
		port:     listen,
		database: db,
		auth:     makeAuth(),
	}
}

// makes the api server up and running
func (server *apiServer) Run() {
	// make it happen that you can use a router if you're connect with any network
	err := http.ListenAndServe(server.port, server.routes())

	if err != nil {
		fmt.Println(err)
		log.Fatal(err)
	}
}

func makeAuth() Auth {
	return Auth{
		TokenExpiry:   time.Minute * 15,
		RefreshExpiry: time.Hour * 24,
		CoockieName:   "__Host-refresh-token",
		CoockiePath:   "/",
		Secret:        "dersuperkrassesupersecretkeydersupersecretist",
		Issuer:        "example.com",
		Audience:      "example.com",
		CoockieDomain: "localhost",
	}
}
