import {
    LucideChefHat,
    LucideCoffee,
    LucideCupSoda,
    LucideDrumstick,
    LucideFish,
    LucideIceCream,
    LucideSalad,
    LucideSoup,
    LucideUtensils,
} from 'lucide-react';

interface CategoryIconMap {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const categoryIconMap: CategoryIconMap = {
    bakso: LucideDrumstick,
    seafood: LucideFish,
    nasi: LucideUtensils,
    goreng: LucideChefHat,
    minuman: LucideCoffee,
    es: LucideIceCream,
    dessert: LucideIceCream,
    dingin: LucideCupSoda,
    hangat: LucideCoffee,
    soup: LucideSoup,
    default: LucideSalad,
};

export const getCategoryIcon = (name: string) => {
    const lower = name.toLowerCase();

    for (const keyword in categoryIconMap) {
        if (lower.includes(keyword)) {
            return categoryIconMap[keyword];
        }
    }

    return categoryIconMap.default;
};
