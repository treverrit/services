package api

import (
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type Auth struct {
	Issuer        string
	Audience      string
	Secret        string
	TokenExpiry   time.Duration
	RefreshExpiry time.Duration
	CoockieDomain string
	CoockiePath   string
	CoockieName   string
}

type jwtUser struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type TokenPair struct {
	JWTToken     string `json:"accessToken"`
	RefreshToken string `json:"refreshToken"`
}

type Claims struct {
	jwt.RegisteredClaims
}

func (auth *Auth) generateTokenPair(user *jwtUser) (TokenPair, error) {
	// sets the access token properties
	token := jwt.New(jwt.SigningMethodHS256)
	claims := token.Claims.(jwt.MapClaims)
	claims["name"] = user.Name
	claims["sub"] = user.ID
	claims["aud"] = auth.Audience
	claims["iss"] = auth.Issuer
	claims["iat"] = time.Now().UTC().Unix()
	claims["typ"] = "JWT"
	claims["exp"] = time.Now().UTC().Add(auth.TokenExpiry).Unix()

	// tries to sign the access token
	signedAccess, err := token.SignedString([]byte(auth.Secret))
	if err != nil {
		return TokenPair{}, err
	}

	// sets the refresh token properties
	refresh := jwt.New(jwt.SigningMethodHS256)
	refreshClaims := refresh.Claims.(jwt.MapClaims)
	refreshClaims["sub"] = user.ID
	refreshClaims["iat"] = time.Now().UTC().Unix()
	refreshClaims["exp"] = time.Now().UTC().Add(auth.RefreshExpiry).Unix()

	// tries to sign the refreshtoken
	signedRefresh, err := token.SignedString([]byte(auth.Secret))
	if err != nil {
		return TokenPair{}, err
	}

	return TokenPair{JWTToken: signedAccess, RefreshToken: signedRefresh}, nil
}

func (auth *Auth) getRefreshCookie(refreshToken string) *http.Cookie {
	return &http.Cookie{
		Name:     auth.CoockieName,
		Path:     auth.CoockiePath,
		Value:    refreshToken,
		Expires:  time.Now().Add(auth.RefreshExpiry),
		MaxAge:   int(auth.RefreshExpiry.Seconds()),
		SameSite: http.SameSiteStrictMode,
		Domain:   auth.CoockieDomain,
		HttpOnly: true,
		Secure:   true,
	}
}

func (auth *Auth) getExpiredRefreshCookie() *http.Cookie {
	return &http.Cookie{
		Name:     auth.CoockieName,
		Path:     auth.CoockiePath,
		Value:    "",
		Expires:  time.Unix(0, 0),
		MaxAge:   -1,
		SameSite: http.SameSiteStrictMode,
		Domain:   auth.CoockieDomain,
		HttpOnly: true,
		Secure:   true,
	}
}

func (auth *Auth) getTokenFromHeaderAndVerify(writer http.ResponseWriter, request *http.Request) (string, *Claims, error) {
	writer.Header().Add("Vary", "Authorization")

	// sanity check
	authHeader := request.Header.Get("Authorization")
	if authHeader == "" {
		return "", nil, fmt.Errorf("no auth header")
	}

	// split headers
	headerparts := strings.Split(authHeader, " ")
	if len(headerparts) != 2 {
		return "", nil, fmt.Errorf("invalid auth header")
	}

	// check includes word bearer
	if headerparts[0] != "Bearer" {
		return "", nil, fmt.Errorf("invalid auth header")
	}

	token := headerparts[1]
	claims := new(Claims)

	// parse the token
	if _, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected sining method: %v", token.Header["alg"])
		}
		return []byte(auth.Secret), nil
	}); err != nil {
		if strings.HasPrefix(err.Error(), "token is expired by") {
			return "", nil, fmt.Errorf("expired token")
		}
		return "", nil, err
	}

	// check issuer
	if claims.Issuer != auth.Issuer {
		return "", nil, fmt.Errorf("invalid issuer")
	}

	return token, claims, nil
}
