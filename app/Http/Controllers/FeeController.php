<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeeRequest;
use App\Models\Fee;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class FeeController extends Controller
{
    public function indexAdmin(): InertiaResponse
    {
        $fees = Fee::all();
        return Inertia::render('admin/settings/fee/index', [
            'fees' => $fees
        ]);
    }

    public function update(FeeRequest $request, int $feeId): RedirectResponse
    {
        $fee = Fee::findOrFail($feeId);
        $validated = $request->validated();
        $fee->update($validated);

        return redirect()->back()->with(['success' => 'Update fee berhasil']);
    }
}
