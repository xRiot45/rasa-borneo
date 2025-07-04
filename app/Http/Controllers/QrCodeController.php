<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class QrCodeController extends Controller
{
    public function indexMerchant(): Response
    {
        $user = Auth::user();
        $merchant = Merchant::where('user_id', $user->id)->first();

        $baseUrl = config('app.url');
        $merchantUrl = $baseUrl . '/merchant/show/' . $merchant->slug;

        return Inertia::render('merchant/pages/store-management/qr-code/index', [
            'slug' => $merchant->slug,
            'merchantUrl' => $merchantUrl
        ]);
    }
}
