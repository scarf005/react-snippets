// ==UserScript==
// @name        Open notifications in new tab
// @namespace   https://github.com/scarf005
// @match       https://github.com/notifications
// @downloadURL https://github.com/scarf005/snippets/blob/main/userscripts/open-github-notifications-in-new-tab.user.js
// @homepageURL https://github.com/scarf005/snippets
// @supportURL  https://github.com/scarf005/snippets/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc
// @icon        https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant       none
// @version     1.0.0
// @author      scarf
// @description pinned notifications tab + Notifier for github. maybe i should just use shortcut but i'm lazy
// ==/UserScript==
{
    'use strict'

    const notifications = document.querySelector('main > div > div > div.flex-auto')
    const item = 'a.notification-list-item-link'

    const updateAnchor = (a) => {
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
        const title = a.querySelector('div[id^=notification] > p.markdown-title').innerText
        console.log(`open in new tab: ${title}`)
    }

    const updateAnchors = (node) => node.querySelectorAll(item).forEach(updateAnchor)

    // Apply the function to existing anchor tags
    console.log('converting existing anchors in github notifications')
    updateAnchors(notifications)

    // Create a MutationObserver to monitor changes to the DOM
    const observer = new MutationObserver(mutations => mutations
            .filter(mutation => mutation.addedNodes?.length > 0)
            .forEach(mutation => mutation.addedNodes
                    .filter(node => node instanceof HTMLElement)
                    .forEach(updateAnchors)
            )
    )

    // Start observing the entire document for changes
    console.log('observing new anchors in github notifications')
    observer.observe(notifications, { childList: true, subtree: true })
}
