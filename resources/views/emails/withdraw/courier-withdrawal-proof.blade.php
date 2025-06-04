<x-mail::message class="bg-white rounded-lg shadow-lg p-6 text-gray-900">

  <h1 class="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">Bukti Transfer Penarikan Dana
  </h1>

  <p class="text-base mb-6">
    Halo <strong class="text-indigo-600">{{ $courierName }}</strong>,
  </p>

  <p class="mb-6">
    Pengajuan penarikan dana Anda dengan kode penarikan <strong>#{{ $withdraw_code }}</strong> telah
    berhasil
    diproses dan dana telah ditransfer.
  </p>

  <section class="mb-8 bg-gray-50 p-4 rounded-md border border-gray-200">
    <h2 class="text-lg font-semibold mb-3 text-gray-700">Detail Penarikan:</h2>
    <table class="w-full text-left border-collapse">
      <tbody>
        <tr class="border-b border-gray-300">
          <td class="py-2 font-medium text-gray-600 w-1/2">Jumlah Penarikan</td>
          <td class="py-2 font-semibold text-gray-800">: Rp
            {{ number_format($amount, 0, ',', '.') }}
          </td>
        </tr>
        <tr class="border-b border-gray-300">
          <td class="py-2 font-medium text-gray-600">Tanggal Transfer</td>
          <td class="py-2 font-semibold text-gray-800">: {{ $transferred_at->format('d M Y H:i') }}
          </td>
        </tr>
        <tr>
          <td class="py-2 font-medium text-gray-600">Status Penarikan</td>
          <td class="py-2 font-semibold text-gray-800 capitalize">: {{ $status }}</td>
        </tr>
      </tbody>
    </table>
  </section>

  <x-mail::button :url="$proofUrl"
    class="bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold px-6 py-3 shadow-md transition duration-300">
    Lihat Bukti Transfer
  </x-mail::button>

  <p class="mt-8 text-sm text-gray-600">
    Jika Anda memiliki pertanyaan lebih lanjut, silakan hubungi tim kami.
  </p>

  <p class="mt-2 text-sm text-gray-600">
    Terima kasih telah menggunakan layanan kami.
  </p>

  <p class="mt-6 text-sm font-semibold text-indigo-700">
    Salam,<br>
    {{ config('app.name') }}
  </p>

</x-mail::message>
