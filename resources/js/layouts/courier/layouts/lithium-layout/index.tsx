import { useIsMobile } from '@/hooks/use-mobile';
import { type BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { LithiumContent } from './partials/content';
import { LithiumFooter } from './partials/footer';
import { BottomNavigation } from './partials/navigations/bottom-navigation';
import { TopNavigation } from './partials/navigations/top-navigation';
import { LithiumShell } from './partials/shell';

export default function LithiumLayoutTemplate({ children, breadcrumbs }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    const isMobile = useIsMobile();

    return (
        <LithiumShell>
            <TopNavigation breadcrumbs={breadcrumbs} />
            <LithiumContent>{children}</LithiumContent>
            <LithiumFooter />
            {isMobile && <BottomNavigation />}
        </LithiumShell>
    );
}
