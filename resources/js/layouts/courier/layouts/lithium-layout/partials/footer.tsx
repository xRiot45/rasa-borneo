import { Icon } from '@iconify/react';
import { Link } from '@inertiajs/react';
import Logo from './logo';

export function LithiumFooter() {
    return (
        <footer className="mt-16 border-t bg-black text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 lg:grid-cols-6">
                {/* Logo dan deskripsi */}
                <div className="col-span-2 space-y-4">
                    <Logo />
                    <p className="text-sm text-gray-400">
                        RasaBorneo memudahkan Anda memesan makanan dari berbagai merchant lokal dalam satu platform praktis dan terpercaya.
                    </p>

                    <div className="mt-6 flex items-center gap-6">
                        <Link href="https://www.instagram.com/">
                            <Icon icon="akar-icons:instagram-fill" className="h-4 w-4" />
                        </Link>
                        <Link href="https://twitter.com/">
                            <Icon icon="akar-icons:twitter-fill" className="h-4 w-4" />
                        </Link>
                        <Link href="https://www.facebook.com/">
                            <Icon icon="akar-icons:facebook-fill" className="h-4 w-4" />
                        </Link>
                        <Link href="https://www.tiktok.com/">
                            <Icon icon="akar-icons:tiktok-fill" className="h-4 w-4" />
                        </Link>
                        <Link href="https://www.youtube.com/">
                            <Icon icon="akar-icons:youtube-fill" className="h-4 w-4" />
                        </Link>
                    </div>
                </div>

                {/* Navigasi - Company */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Company</h3>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li>
                            <Link href="/about" className="hover:underline">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" className="hover:underline">
                                Blog
                            </Link>
                        </li>
                        <li>
                            <Link href="/careers" className="hover:underline">
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:underline">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Navigasi - Products */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Products</h3>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li>
                            <Link href="/features" className="hover:underline">
                                Features
                            </Link>
                        </li>
                        <li>
                            <Link href="/pricing" className="hover:underline">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link href="/integrations" className="hover:underline">
                                Integrations
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Navigasi - Resources */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Resources</h3>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li>
                            <Link href="/docs" className="hover:underline">
                                Docs
                            </Link>
                        </li>
                        <li>
                            <Link href="/tutorials" className="hover:underline">
                                Tutorials
                            </Link>
                        </li>
                        <li>
                            <Link href="/help-center" className="hover:underline">
                                Help Center
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Navigasi - Legal + Google Maps */}
                <div>
                    <h3 className="mb-2 text-lg font-semibold">Legal</h3>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li>
                            <Link href="/privacy-policy" className="hover:underline">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms" className="hover:underline">
                                Terms of Service
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer bottom */}
            <div className="mt-8 border-t border-gray-800 py-4 text-center text-sm text-white">
                © {new Date().getFullYear()} Built by Thomas Alberto. All rights reserved.
            </div>
        </footer>
    );
}
