'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import {Suspense} from "react";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Suspense fallback={'loading'}>
            <ProgressBar
                height="5px"
                color="blue"
                options={{ showSpinner: false }}
                shallowRouting
            />
            </Suspense>
        </>
    );
}