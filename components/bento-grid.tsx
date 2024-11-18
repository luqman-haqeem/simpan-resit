import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
} from "@radix-ui/react-icons";

import { ArrowRight, Receipt, PieChart, TabletSmartphone, Shield } from 'lucide-react'

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
const t = [
    {
        title: "Easy Receipt Upload",
        description: "Quickly upload and categorize your receipts",
        icon: Receipt,
    },
    {
        title: "Tax Relief Tracking",
        description: "Monitor your tax relief claims in real-time",
        icon: PieChart,
    },
    {
        title: "Mobile-First Design",
        description: "Mobile-first approach, manage receipts seamlessly on any device, wherever you are.",
        icon: TabletSmartphone,
    },
    {
        title: "Secure Storage",
        description: "Your data is encrypted and securely stored",
        icon: Shield,
    },
];
const features = [
    {
        Icon: Receipt,
        name: "Easy Receipt Upload",
        description: "Quickly upload and categorize your receipts.",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "col-span-3 lg:col-span-1",

    },
    {
        Icon: PieChart,
        name: "Tax Relief Tracking",
        description: "Monitor your tax relief claims in real-time.",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "col-span-3 lg:col-span-2",
    },
    {
        Icon: TabletSmartphone,
        name: "Mobile-First Design",
        description: "Mobile-first approach, manage receipts seamlessly on any device, wherever you are.",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "col-span-3 lg:col-span-2",

    },
    {
        Icon: Shield,
        name: "Secure Storage",
        description: "Your data is encrypted and securely stored",
        href: "/",
        cta: "Learn more",
        background: <img className="absolute -right-20 -top-20 opacity-60" />,
        className: "col-span-3 lg:col-span-1",
    },
    // {
    //     Icon: BellIcon,
    //     name: "Notifications",
    //     description:
    //         "Your data is encrypted and securely stored",
    //     href: "/",
    //     cta: "Learn more",
    //     background: <img className="absolute -right-20 -top-20 opacity-60" />,
    //     className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
    // },
];

export async function BentoDemo() {
    return (
        <BentoGrid className="lg:grid-rows-2">
            {features.map((feature) => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    );
}
