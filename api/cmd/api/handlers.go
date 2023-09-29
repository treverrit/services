package api

import (
	"authapi/cmd/password"
	"authapi/cmd/repo/types"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/golang-jwt/jwt/v4"
)

// just a handler to figure out what a handler does
func (server *apiServer) home(writer http.ResponseWriter, request *http.Request) {
	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "active",
		Message: "application up and running",
		Version: "1.0.0",
	}

	out, _ := json.Marshal(payload)

	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	writer.Write(out)
}

// registers a new user
func (server *apiServer) handleRegister(writer http.ResponseWriter, request *http.Request) error {
	// tries to make read json in a request object
	registerRequest := new(types.RegisterAccountRequest)
	if err := readJSON(request, registerRequest); err != nil {
		return fmt.Errorf("could not read json")
	}

	// tries to create a new account object with the request
	account, err := types.NewAccount(registerRequest)
	if err != nil {
		return err
	}

	// tries to create an account in database and fetch the account with a new generated uuid
	data, err := server.database.CreateAccount(account)
	if err != nil {
		return err
	}

	// tries to generate token pair for auth
	tokens, err := server.auth.generateTokenPair(&jwtUser{ID: data.ID, Name: data.Name})
	if err != nil {
		return err
	}

	refreshCookie := server.auth.getRefreshCookie(tokens.RefreshToken)
	http.SetCookie(writer, refreshCookie)

	return writeJSON(writer, http.StatusOK, struct {
		Account *types.Account `json:"account"`
		JWT     string         `json:"jwt"`
	}{
		Account: data,
		JWT:     tokens.JWTToken,
	})
}

// tries to login an existing user
func (server *apiServer) handleSignin(writer http.ResponseWriter, request *http.Request) error {
	// tries to read json in a new request object
	signinRequest := new(types.SigninAccountRequest)
	if err := readJSON(request, signinRequest); err != nil {
		return fmt.Errorf("could not read json")
	}

	// tries to get an account by a given email
	account, err := server.database.GetAccountByEmail(signinRequest.Email)
	if err != nil {
		return err
	}

	// check if the password is correct
	if err := password.CheckPassword(account.Password, signinRequest.Password); err != nil {
		return err
	}

	// tries to generate the token pair for auth
	tokens, err := server.auth.generateTokenPair(&jwtUser{ID: account.ID, Name: account.Name})
	if err != nil {
		return err
	}

	refreshCookie := server.auth.getRefreshCookie(tokens.RefreshToken)
	http.SetCookie(writer, refreshCookie)

	return writeJSON(writer, http.StatusOK, struct {
		Account *types.Account `json:"account"`
		JWT     string         `json:"jwt"`
	}{
		Account: account,
		JWT:     tokens.JWTToken,
	})
}

func (server *apiServer) handleGetAccount(writer http.ResponseWriter, request *http.Request) error {
	accounts, err := server.database.GetAccounts()
	if err != nil {
		return err
	}

	return writeJSON(writer, http.StatusOK, accounts)
}

func (server *apiServer) handleDeleteAccount(writer http.ResponseWriter, request *http.Request) error {
	id := chi.URLParam(request, "id")
	if err := server.database.DeleteAccount(id); err != nil {
		return fmt.Errorf("oopsi")
	}

	return writeJSON(
		writer,
		http.StatusOK,
		struct {
			Message string `json:"message"`
		}{Message: fmt.Sprintf("deleted %s", id)})
}

func (server *apiServer) handleRefreshToken(writer http.ResponseWriter, request *http.Request) error {
	for _, cookie := range request.Cookies() {
		if cookie.Name == server.auth.CoockieName {
			claims := new(Claims)
			refreshToken := cookie.Value

			// parse the token to get the claims
			if _, err := jwt.ParseWithClaims(refreshToken, claims, func(token *jwt.Token) (interface{}, error) {
				return []byte(server.auth.Secret), nil
			}); err != nil {
				return fmt.Errorf("unauthorized")
			}

			// get the  user id from the token claims
			user, err := server.database.GetAccountById(claims.Subject)
			if err != nil {
				return fmt.Errorf("no user found")
			}

			userIdentity := jwtUser{
				ID:   user.ID,
				Name: user.Name,
			}

			pair, err := server.auth.generateTokenPair(&userIdentity)
			if err != nil {
				return fmt.Errorf("unable to generate tokens")
			}

			http.SetCookie(writer, server.auth.getRefreshCookie(pair.RefreshToken))

			return writeJSON(writer, http.StatusOK, &struct {
				Account *types.Account `json:"account"`
				Token   string         `json:"accessToken"`
			}{Token: pair.JWTToken, Account: user})
		}
	}
	return fmt.Errorf("no cookie to refresh")
}

func (server *apiServer) handleLogout(writer http.ResponseWriter, request *http.Request) {
	http.SetCookie(writer, server.auth.getExpiredRefreshCookie())
	writer.WriteHeader(http.StatusAccepted)
}
