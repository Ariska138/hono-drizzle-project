# Documentation

- instal package

```bash
npm i
```

- buat database `pesantren` di local dengan `psql`

- buat `.env`
  
```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pesantren"
```

- buat sql untuk membuat table `npm run db:generate`

- eksekusi sql `npm run db:migrate`
  
- jalankan server

```bash
npm run start
```
