<?php

namespace App\Http\Middleware;

use App\Models\Bank;
use App\Models\BusinessCategory;
use App\Models\MenuCategory;
use App\Models\MenuItem;
use App\Models\Merchant;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'ziggy' => fn(): array => [...(new Ziggy())->toArray(), 'location' => $request->url()],

            // Data
            'roles' => Role::all(),
            'permissions' => Permission::all(),
            'businessCategories' => BusinessCategory::all(),
            'banks' => Bank::all(),
            'menuCategories' => MenuCategory::all(),
            'menuItems' => MenuItem::with('menuCategory', 'merchant')->where('status', 'tersedia')->where('is_recommended', 1)->get(),
            'merchants' => Merchant::with('businessCategory', 'user', 'storeProfile')->where('is_verified', 1)->get(),
        ];
    }
}
