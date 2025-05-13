<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MerchantVerifiedNotification extends Notification
{
    use Queueable;

    private $merchant;

    public function __construct($merchant)
    {
        $this->merchant = $merchant;
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $fullName = $this->merchant->user->full_name;

        return (new MailMessage)
            ->subject('Usaha Anda Telah Diverifikasi')
            ->greeting('Halo ' . $fullName)
            ->line('Usaha Anda dengan nama ' . $this->merchant->business_name . ' telah berhasil diverifikasi.')
            ->line('Terima kasih telah menjadi bagian dari kami.')
            ->line('Silahkan login ke website kami untuk menjual produk anda.');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
