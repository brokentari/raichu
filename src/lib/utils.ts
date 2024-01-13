import { type ClassValue, clsx } from "clsx"
import { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// export function useArrayState<T>(initial: T[] = []) {
//   const array = useMemo(() => initial, [initial]);
//   const [refresh, setRefresh] = useState(0)
//   const cb = useCallback((f) => {
//     f(array)
//     setRefresh(it => ++it)
//   }, [array]);

//   return [array, cb]
  
// }

