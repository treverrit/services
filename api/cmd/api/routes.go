package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
)

func (server *apiServer) authRequired(next http.Handler) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		if _, _, err := server.auth.getTokenFromHeaderAndVerify(writer, request); err != nil {
			writer.WriteHeader(http.StatusUnauthorized)
		}
		next.ServeHTTP(writer, request)
	})
}

func (server *apiServer) routes() http.Handler {
	// create router
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)
	mux.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"https://*", "http://*"},
		AllowedMethods:   []string{"GET", "POST", "UPDATE", "DELETE", "PUT", "PATCH", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		AllowCredentials: true,
	}))

	mux.Get("/", server.home)
	mux.Post("/register", makeHanderFunc(server.handleRegister))
	mux.Post("/signin", makeHanderFunc(server.handleSignin))
	mux.Get("/account", makeHanderFunc(server.handleGetAccount))
	mux.Get("/refresh", makeTokenHanderFunc(server.handleRefreshToken))
	mux.With(server.authRequired).Get("/logout", server.handleLogout)
	mux.With(server.authRequired).Delete("/account/{id}", makeHanderFunc(server.handleDeleteAccount))

	return mux
}
