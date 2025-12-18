"use client"

import { Dot } from "@/components/foundations/dot-icon";
import React from "react"

export interface BankBadgeProps {
    color: string; 
    label: string;
}

export default function BankBadge (props: BankBadgeProps) {
    const { label, color } = props;
    return (
        <div className="size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium bg-utility-gray-50 text-utility-gray-700 ring-utility-gray-200">
            <Dot color={color} className="mr-0.5"></Dot>
            <span className="font-medium">{label}</span>
        </div>
    )
}