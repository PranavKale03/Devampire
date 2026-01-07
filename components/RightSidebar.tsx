'use client';

import React from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

const RightSidebar = () => {
    return (
        <aside className='w-[300px] hidden lg:block ml-6 shrink-0'>
            <Card className="w-full mt-5 min-h-[400px]">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Coming Soon</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className=''>We're working hard to bring you the best possible experience. Check back soon!</p>
                </CardContent>
            </Card>
        </aside>
    )
}

export default RightSidebar;
