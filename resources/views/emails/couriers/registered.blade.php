<x-mail::message>
  # Halo {{ $user->full_name }},

  Selamat! Anda telah berhasil terdaftar sebagai **Kurir** di platform kami.

  Berikut detail login Anda:

  - **Email:** {{ $user->email }}
  - **Password Sementara:** {{ $password }}

  > Demi keamanan akun Anda, **harap segera mengganti password** setelah login pertama.

  <x-mail::button :url="url('/login')">
    Login ke Platform
  </x-mail::button>

  Terima kasih telah bergabung bersama kami!

  Salam,<br>
  {{ config('app.name') }}
</x-mail::message>
