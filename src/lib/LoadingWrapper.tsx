'use client'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <ProgressBar
                height="5px"
                color="blue"
                options={{ showSpinner: false }}
                shallowRouting
            />
        </>
    );
}