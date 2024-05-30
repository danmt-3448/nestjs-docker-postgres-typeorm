## Installing
#### Packages
```bash
npm install
```

## Constant
```
user: danmt
```

## Postgres

####
```bash
  docker exec -it docker-container-id /bin/bash
```
#### Login Postgres
```bash
psql -d my_nest_app1 -U danmt -W
```

or when first install postgres

```bash
psql -U postgres
```

#### Create user
```bash
create user danmt with password 'Aa@123456';
```

#### Grant permissions
```bash
alter user danmt with superuser;
```

If cannot interact to db:
```bash
grant pg_read_all_data to danmt;
```

```bash
grant pg_write_all_data to danmt;
```

### Check grant user
```bash
\du
```

### Check list db
```bash
\l
```

### Logout user in postgres
```bash
\q
```