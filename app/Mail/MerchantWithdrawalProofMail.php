<?php

namespace App\Mail;

use App\Models\Withdraw;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MerchantWithdrawalProofMail extends Mailable
{
    use Queueable, SerializesModels;

    public $withdraw;
    public $messageText;

    public function __construct(Withdraw $withdraw)
    {
        $this->withdraw = $withdraw;
    }

    public function build(): self
    {
        return $this->subject('Bukti Transfer Penarikan Dana')
            ->markdown('emails.withdraw.merchant-withdrawal-proof', [
                'merchantName' => $this->withdraw->merchant->business_name,
                'withdraw_code' => $this->withdraw->withdraw_code,
                'amount' => $this->withdraw->amount,
                'transferred_at' => $this->withdraw->transferred_at,
                'status' => $this->withdraw->status->value ?? $this->withdraw->status,
                'proofUrl' => asset($this->withdraw->transfer_proof),
            ])
            ->attachFromStorageDisk('public', str_replace('/storage/', '', $this->withdraw->transfer_proof), 'bukti-transfer.jpg', [
                'mime' => 'image/jpeg',
            ]);
    }
}
