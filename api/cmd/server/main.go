package main

import (
	"authapi/cmd/api"
	"authapi/cmd/repo/db"
	"log"
)

func main() {
	// try to connect server to database
	store, err := db.NewPostgresStore()
	if err != nil {
		log.Fatal(err)
	}

	if err := store.Init(); err != nil {
		log.Fatal(err)
	}

	api.NewApiServer(":8080", store).Run()
}
