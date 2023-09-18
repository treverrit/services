package db

import "authapi/cmd/repo/types"

type DataBase interface {
	CreateAccount(*types.Account) (*types.Account, error)
	DeleteAccount(id string) error
	UpdateAccount(*types.Account) error
	GetAccounts() ([]*types.Account, error)
	GetAccountById(id string) (*types.Account, error)
	GetAccountByEmail(email string) (*types.Account, error)
}
