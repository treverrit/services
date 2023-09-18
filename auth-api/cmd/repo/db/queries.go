package db

const (
	createAccountTableQuery = `create table if not exists account (
		id uuid not null primary key,
		name varchar(255) not null,
		email varchar(255) not null,
		password varchar(255) not null,
		created_at timestamp not null,
		updated_at timestamp not null
	)`

	checkUUIDExtensionQuery = "SELECT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'uuid-ossp')"

	createUUIDExtensionQuery = "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\""

	//uniqueConstraintQuery = `ALTER TABLE account ADD CONSTRAINT unique_email UNIQUE (email)`

	//dropTableQuery = `drop table account`

	createAccountQuery = `insert into account 
		(id, name, email, password, created_at, updated_at)
		values (uuid_generate_v4(), $1, $2, $3, $4, $5)
	`

	deleteAccountQuery = "delete from account where id = $1"

	allAccountsQuery = "select * from account"

	accountByIdQuery = "select * from account where id = $1"

	accountByEmailQuery = "select * from account where email = $1"
)
