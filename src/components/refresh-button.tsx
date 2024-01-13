"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { JSX, SVGProps, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons"
import { sleep } from "@/lib/utils";
import { Room } from "@/app/hue_pb";

function RefreshCwIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}

export default function RefreshButtonComponent({onClick, isFetching}: { onClick: () => Promise<void>; isFetching: boolean; }) {
  // const [isFetching, setFetching] = useState(false);

  // const startAnimation = async () => {
  //   try {
  //     setFetching(true);
      
  //     await updateFunction();

  //     setFetching(false);
  //   } catch (err) {
  //     console.error("Error fetching data: ", err);
  //     setFetching(false);
  //   }

  // };
  

  return (
    <Button onClick={onClick} disabled={isFetching} className="flex items-center space-x-2">
       <RefreshCwIcon className={`w-5 h-5 ${isFetching ? 'animate-spin' : ''}`} /> 
      <span>Refresh</span>
    </Button>
  )
}