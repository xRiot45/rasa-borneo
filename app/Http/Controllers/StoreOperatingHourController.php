<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOperatingHourRequest;
use App\Models\StoreOperatingHour;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class StoreOperatingHourController extends Controller
{
    public function index_merchant(): Response
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $hours = StoreOperatingHour::where('merchant_id', $merchantId)
            ->get();

        return Inertia::render('merchant/store-management/store-operating-hour/index', [
            'hours' => $hours,
        ]);
    }

    public function storeOrUpdate(StoreOperatingHourRequest $request): RedirectResponse
    {
        $authenticatedUser = Auth::user();
        $merchantId = $authenticatedUser->merchant->id;

        $validated = $request->validated();

        foreach ($validated['hours'] as $hour) {
            StoreOperatingHour::updateOrCreate(
                [
                    'merchant_id' => $merchantId,
                    'day_of_week' => $hour['day'],
                ],
                [
                    'open_time' => $hour['is_closed'] ? '00:00:00' : $hour['open_time'],
                    'close_time' => $hour['is_closed'] ? '00:00:00' : $hour['close_time'],
                    'is_closed' => $hour['is_closed'],
                ]
            );
        }


        return redirect()->route('merchant.store-operating-hour.index_merchant')->with('success', 'Data berhasil ditambahkan.');
    }
}
