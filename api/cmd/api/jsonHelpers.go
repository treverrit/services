package api

import (
	"encoding/json"
	"net/http"
)

func writeJSON(writer http.ResponseWriter, status int, value any) error {
	writer.Header().Add("Content-Type", "application/json")
	writer.WriteHeader(status)
	return json.NewEncoder(writer).Encode(value)
}

func readJSON(request *http.Request, value any) error {
	return json.NewDecoder(request.Body).Decode(value)
}
