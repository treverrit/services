package types

import (
	"authapi/cmd/password"
	"fmt"
	"regexp"
	"strings"
	"time"
	"unicode"
)

type Account struct {
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	Email     string    `json:"-"`
	Password  string    `json:"-"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

type RegisterAccountRequest struct {
	Name         string `json:"name"`
	Email        string `json:"email"`
	Password     string `json:"password"`
	Confirmation string `json:"confirmation"`
}

type SigninAccountRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func NewAccount(input *RegisterAccountRequest) (*Account, error) {

	if err := checkNameCharacters(input.Name); err != nil {
		return nil, fmt.Errorf("invalid characters in name")
	}

	if !regexp.MustCompile(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$`).MatchString(input.Email) {
		return nil, fmt.Errorf("invalid email")
	}

	if len(input.Password) < 10 {
		return nil, fmt.Errorf("password to short")
	}

	if err := checkPwdCharacters(input.Password); err != nil {
		return nil, err
	}

	if input.Password != input.Confirmation {
		return nil, fmt.Errorf("confirmation does not match")
	}

	hash, err := password.HashedPassword(input.Password)
	if err != nil {
		return nil, err
	}

	return &Account{
		Email:     input.Email,
		Name:      input.Name,
		Password:  hash,
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
	}, nil
}

func checkNameCharacters(name string) error {
	name = strings.ReplaceAll(name, "\n", "")

	for _, character := range name {
		switch {
		case unicode.IsDigit(character):
			continue
		case unicode.IsUpper(character):
			continue
		case unicode.IsLower(character):
			continue
		case isSpecialCharacter(character):
			continue
		default:
			return fmt.Errorf("invalid characters in name")
		}
	}
	return nil
}

func checkPwdCharacters(pwd string) error {
	pwd = strings.ReplaceAll(pwd, "\n", "")

	hasNumber := false
	hasUpper := false
	hasLower := false
	hasSpecial := false

	for _, character := range pwd {
		switch {
		case unicode.IsDigit(character):
			hasNumber = true
		case unicode.IsUpper(character):
			hasUpper = true
		case unicode.IsLower(character):
			hasLower = true
		case isSpecialCharacter(character):
			hasSpecial = true
		default:
			return fmt.Errorf("invalid password")
		}
	}

	if !(hasNumber && hasUpper && hasLower && hasSpecial) {
		return fmt.Errorf("invalid email")
	}

	return nil
}

func isSpecialCharacter(char rune) bool {
	return char == '!' || char == '?' || char == '#' ||
		char == '+' || char == '-' || char == '_' ||
		char == '@' || char == '€' || char == 'µ' ||
		char == '$' || char == '%' || char == '§' ||
		char == '&' || char == '^' || char == '°' ||
		char == ' '
}
