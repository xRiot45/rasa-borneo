# Perintah Reset Tabel berdasarkan nama migrations nya

```bash
# Reset migrasi
$ php artisan migrate:reset --path=/database/migrations/<nama-migrationnya>

# sekali jalan semua yang due.
$ php artisan schedule:run

# standby dan otomatis terus cek job yang due (tanpa perlu cron server).
$ php artisan schedule:work

# perintah untuk melihat list dari schedule
$ php artisan schedule:list
```
