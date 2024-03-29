import React from "react";
import { Report } from "@src/components/report";
import browser, { Tabs } from "webextension-polyfill";
import css from "./styles.module.css";

// // // //

// Scripts to execute in current tab
const scrollToTopPosition = 0;
const scrollToBottomPosition = 9999999;

function scrollWindow(position: number) {
    window.scroll(0, position);
}

/**
 * Executes a string of Javascript on the current tab
 * @param code The string of code to execute on the current tab
 */
function executeScript(position: number): void {
    // Query for the active tab in the current window
    browser.tabs
        .query({ active: true, currentWindow: true })
        .then((tabs: Tabs.Tab[]) => {
            // Pulls current tab from browser.tabs.query response
            const currentTab: Tabs.Tab | number = tabs[0];

            // Short circuits function execution is current tab isn't found
            if (!currentTab) {
                return;
            }
            const currentTabId: number = currentTab.id as number;

            // Executes the script in the current tab
            browser.scripting
                .executeScript({
                    target: {
                        tabId: currentTabId,
                    },
                    func: scrollWindow,
                    args: [position],
                })
                .then(() => {
                    console.log("Done Scrolling");
                });
        });
}

// // // //

export function Popup() {
    // Sends the `popupMounted` event
    React.useEffect(() => {
        browser.runtime.sendMessage({ popupMounted: true });
    }, []);

    // Renders the component tree
    return (
        <div className={`${css.popupContainer} flex justify-center items-center min-h-screen`}>
            <div className="p-4">
                <Report/>
            </div>
        </div>  
    );
}
