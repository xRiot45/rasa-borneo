<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\TransactionItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionItemSeeder extends Seeder
{
    public function run(): void
    {
        // Ambil semua transaksi
        $transactions = Transaction::all();

        foreach ($transactions as $transaction) {
            // Contoh menu item
            $menuItems = [
                [
                    'menu_item_id' => 1,
                    'menu_item_name' => 'Nasi Goreng Spesial',
                    'menu_item_price' => 25000,
                    'menu_item_image_url' => '/storage/foto_menu/1747023486_nasi-goreng.png',
                    'menu_item_category' => 'Makanan',
                    'quantity' => 1,
                    'note' => null,
                ],
                [
                    'menu_item_id' => 2,
                    'menu_item_name' => 'Es Teh Manis',
                    'menu_item_price' => 8000,
                    'menu_item_image_url' => '/storage/foto_menu/1747023486_nasi-goreng.png',
                    'menu_item_category' => 'Minuman',
                    'quantity' => 2,
                    'note' => 'Sedikit gula',
                ],
            ];

            foreach ($menuItems as $item) {
                TransactionItem::create([
                    'transaction_id' => $transaction->id,
                    'menu_item_id' => $item['menu_item_id'],
                    'menu_item_name' => $item['menu_item_name'],
                    'menu_item_price' => $item['menu_item_price'],
                    'menu_item_image_url' => $item['menu_item_image_url'],
                    'menu_item_category' => $item['menu_item_category'],
                    'quantity' => $item['quantity'],
                    'note' => $item['note'],
                    'subtotal' => $item['menu_item_price'] * $item['quantity'],
                ]);
            }
        }
    }
}
