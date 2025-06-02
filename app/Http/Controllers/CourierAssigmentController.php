<?php

namespace App\Http\Controllers;

use App\Enums\CourierAssignmentStatusEnum;
use App\Enums\OrderStatusEnum;
use App\Enums\OrderTypeEnum;
use App\Models\Courier;
use App\Models\CourierAssigment;
use App\Models\CourierAssignment;
use App\Models\CourierAssignmentRejection;
use App\Models\CourierRejection;
use App\Models\Order;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class CourierAssigmentController extends Controller
{
    public function deliveryRequest(): InertiaResponse
    {
        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->first();
        $courierId = $courier->id;

        $assignedTransactionIds = CourierAssignment::pluck('transaction_id')->toArray();
        $rejectedTransactionIds = CourierAssignmentRejection::where('courier_id', $courierId)->pluck('transaction_id')->toArray();

        $orders = Order::where('order_type', OrderTypeEnum::DELIVERY)
            ->with('merchant', 'merchant.storeProfile', 'merchant.businessCategory', 'transactionItems', 'latestOrderStatus')
            ->whereHas('latestOrderStatus', function ($query) {
                $query->where('status', '!=', OrderStatusEnum::COMPLETED->value);
            })
            ->whereNotIn('id', $assignedTransactionIds)
            ->whereNotIn('id', $rejectedTransactionIds)
            ->get();

        return Inertia::render('courier/pages/delivery-request/index', [
            'orders' => $orders,
        ]);
    }

    public function acceptedRequest(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->first();
        $courierId = $courier->id;

        $transactionId = $request->transaction_id;
        $alreadyAssigned = CourierAssignment::where('transaction_id', $transactionId)->exists();

        if ($alreadyAssigned) {
            return back()->with('error', 'Tugas ini sudah diambil kurir lain.');
        }

        CourierAssignment::create([
            'courier_id' => $courierId,
            'transaction_id' => $transactionId,
            'status' => CourierAssignmentStatusEnum::ACCEPTED,
            'accepted_at' => now(),
        ]);

        return back()->with('success', 'Tugas berhasil diambil.');
    }

    public function rejectedRequest(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $courier = Courier::where('user_id', $user->id)->first();
        $courierId = $courier->id;

        $transactionId = $request->transaction_id;

        $alreadyRejected = CourierAssignmentRejection::where('courier_id', $courierId)->where('transaction_id', $transactionId)->exists();

        if ($alreadyRejected) {
            return back()->with('error', 'Anda sudah menolak tugas ini sebelumnya.');
        }

        CourierAssignmentRejection::create([
            'courier_id' => $courierId,
            'transaction_id' => $transactionId,
            'rejected_at' => now(),
        ]);

        return back()->with('success', 'Permintaan pengantaran berhasil ditolak.');
    }
}
