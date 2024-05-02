import { Card } from "flowbite-react";
import Image from "next/image";

export function MapCard({ room }: { room: any }) {
    return (
        <Card className="max-w-sm">
            <Image width={500} height={500} src={`/images/${room}.jpg`} alt={`image of ${room}`} />
            <div className="p-4">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </div>
        </Card>
    );
}
