import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup } from '@/components/ui/radio-group';
import AuthLayout from '@/layouts/auth/auth-layout';
import { Icon } from '@iconify/react';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function RegisterPage() {
    const [selectedRole, setSelectedRole] = useState<string>('');

    const handleSubmit = () => {
        if (selectedRole === 'customer') {
            window.location.href = route('register.customer');
        } else if (selectedRole === 'merchant') {
            window.location.href = route('register.merchant');
        }
    };

    const roleOptions = [
        {
            label: 'Customer ',
            value: 'customer',
            description: 'Daftar sebagai customer / pembeli',
            icon: 'mdi:account-circle-outline',
        },
        {
            label: 'Merchant',
            value: 'merchant',
            description: 'Daftar sebagai merchant / penjual',
            icon: 'mdi:storefront-outline',
        },
    ];

    return (
        <AuthLayout title="Daftar Akun Baru" description="Silakan pilih peran Anda terlebih dahulu sebelum melanjutkan proses pendaftaran akun">
            <Head title="Register" />
            <div className="flex flex-col gap-6">
                <RadioGroup value={selectedRole} onValueChange={setSelectedRole} className="flex flex-col gap-4">
                    {roleOptions.map((option) => {
                        const isSelected = selectedRole === option.value;
                        return (
                            <Card
                                key={option.value}
                                className={`flex h-22 w-full cursor-pointer flex-row items-center gap-4 border p-6 shadow-none transition-colors ${
                                    isSelected
                                        ? 'bg-black text-white dark:bg-gray-100 dark:text-gray-900'
                                        : 'bg-white text-gray-900 dark:bg-zinc-900 dark:text-white'
                                }`}
                                onClick={() => setSelectedRole(option.value)}
                            >
                                <Icon icon={option.icon} className="h-6 w-6" />
                                <div className="space-y-1">
                                    <h1 className="font-bold">{option.label}</h1>
                                    <p className="text-sm font-normal capitalize opacity-80">{option.description}</p>
                                </div>
                            </Card>
                        );
                    })}
                </RadioGroup>

                <Button onClick={handleSubmit} disabled={!selectedRole} className="cursor-pointer bg-black py-6 transition-all dark:bg-white">
                    Lanjutkan
                </Button>
            </div>
        </AuthLayout>
    );
}
