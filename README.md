### Installing

#### Packages
```bash
npm install
```

### Postgres

####
```bash
  docker exec -it docker-container-id /bin/bash
```
#### Login Postgres
```bash
psql -d my_nest_app1 -U dan -W
```

or when first install postgres

```bash
psql -U postgres
```

#### Create user
```bash
create user dan with password 'Aa@123456';
```

#### Grant permissions
```bash
alter user dan with superuser;
```

If cannot connect to db:
```bash
grant pg_read_all_data to dan;
```

```bash
grant pg_write_all_data to dan;
```
