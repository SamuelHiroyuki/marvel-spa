"use client";

import { useEffect } from "react";
import NProgress from "nprogress";

type PushStateInput = [
    data: any,
    unused: string,
    url?: string | URL | null | undefined
];

export default function ProgressBar() {
    useEffect(() => {
        NProgress.configure({ showSpinner: true });

        const handleAnchorClick = (event: MouseEvent) => {
            const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
            const currentUrl = location.href;
            if (targetUrl !== currentUrl) {
                NProgress.start();
            }
        };

        const handleSwitchChange = (event: Event) => {
            const targetUrl = (event.currentTarget as HTMLInputElement).getAttribute("data-route");
            const currentUrl = location.href;
            if (targetUrl !== currentUrl) {
                NProgress.start();
            }
        };

        const handleMutation: MutationCallback = () => {
            const anchorElements = document.querySelectorAll('a');
            anchorElements.forEach((anchor) =>
                anchor.addEventListener("click", handleAnchorClick)
            );
            const switchElements: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[type=checkbox][data-navigation="switch"]');
            switchElements.forEach((element) =>
                element.addEventListener("change", handleSwitchChange)
            );
        };

        const mutationObserver = new MutationObserver(handleMutation);

        mutationObserver.observe(document, { childList: true, subtree: true });

        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (target, thisArg, argArray: PushStateInput) => {
                NProgress.done();
                return target.apply(thisArg, argArray);
            },
        });
    }, []);

    return null;
}