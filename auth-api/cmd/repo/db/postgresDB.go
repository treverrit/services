package db

import (
	"authapi/cmd/repo/types"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Postgres struct {
	storage *sql.DB
}

func NewPostgresStore() (*Postgres, error) {
	// the init options for the connection to a postgres database
	connStr := "user=gerri dbname=postgres password=Secret sslmode=disable"

	// try to open a database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	var extensionExists bool
	if err := db.QueryRow(checkUUIDExtensionQuery).Scan(&extensionExists); err != nil {
		return nil, err
	}

	if !extensionExists {
		if _, err := db.Exec(createUUIDExtensionQuery); err != nil {
			return nil, err
		}
	}

	// try to verify the connection
	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &Postgres{storage: db}, nil
}

// try to run the database
func (store *Postgres) Init() error {
	_, err := store.storage.Exec(createAccountTableQuery)
	return err
}

func (store *Postgres) CreateAccount(account *types.Account) (*types.Account, error) {
	_, err :=
		store.storage.Query(
			createAccountQuery,
			account.Name,
			account.Email,
			account.Password,
			account.CreatedAt,
			account.UpdatedAt,
		)
	if err != nil {
		fmt.Println(err)
		return nil, fmt.Errorf("oops something went wrong")
	}

	rows, err := store.storage.Query(accountByEmailQuery, account.Email)
	if err != nil {
		fmt.Println(err)
		return nil, fmt.Errorf("oops something went wrong")
	}

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("oops something went wrong")
}

func (store *Postgres) DeleteAccount(id string) error {
	_, err := store.storage.Query(deleteAccountQuery, id)
	return err
}

func (store *Postgres) UpdateAccount(account *types.Account) error {
	return nil
}

func (store *Postgres) GetAccounts() ([]*types.Account, error) {
	rows, err := store.storage.Query(allAccountsQuery)
	if err != nil {
		return nil, err
	}

	accounts := []*types.Account{}
	for rows.Next() {
		account, err := scanIntoAccount(rows)
		if err != nil {
			return nil, err
		}

		accounts = append(accounts, account)
	}

	return accounts, nil
}

func (store *Postgres) GetAccountById(id string) (*types.Account, error) {
	rows, err := store.storage.Query(accountByIdQuery, id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("oops something went wrong")
}

func (store *Postgres) GetAccountByEmail(email string) (*types.Account, error) {
	rows, err := store.storage.Query(accountByEmailQuery, email)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoAccount(rows)
	}

	return nil, fmt.Errorf("oops something went wrong")
}

func scanIntoAccount(rows *sql.Rows) (*types.Account, error) {
	account := new(types.Account)
	if err := rows.Scan(
		&account.ID,
		&account.Name,
		&account.Email,
		&account.Password,
		&account.CreatedAt,
		&account.UpdatedAt,
	); err != nil {
		fmt.Println(err)
		return nil, fmt.Errorf("oops something went wrong")
	}

	return account, nil
}
