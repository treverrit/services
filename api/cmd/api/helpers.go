package api

import (
	"net/http"
)

type handlerFunc = func(writer http.ResponseWriter, request *http.Request) error
type jsonError struct {
	Msg string `json:"error"`
}

func makeHanderFunc(function handlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		if err := function(writer, request); err != nil {
			writeJSON(writer, http.StatusBadRequest, jsonError{Msg: err.Error()})
		}
	}
}

func makeTokenHanderFunc(function handlerFunc) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {
		if err := function(writer, request); err != nil {
			writeJSON(writer, http.StatusUnauthorized, jsonError{Msg: err.Error()})
		}
	}
}
