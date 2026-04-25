import React from 'react'
import { useEffect } from 'react';

const index = () => {

    useEffect(() => {
        function getUrlParam(param) {
            var parameters = window.location.search.substring(1);
            var sURLVariables = parameters.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == param) {
                    return sParameterName[1];
                }
            }
        }
        var token = getUrlParam(token);
        var androidIntentUrl = "intent://merisehat.pk/pricing#Intent;scheme=https;package=pk.merisehat.app;S.browser_fallback_url=https://play.google.com/store/apps/details?id=pk.merisehat.app&referrer=utm_source/custom?utm_content=/pricing;end";
        var isMobile = {
            Windows: function () {
                return /IEMobile|Windows Phone|Lumia/i.test(navigator.userAgent);
            },
            Android: function () {
                return /Android/i.test(navigator.userAgent);
            },
            iPhone: function () {
                return /iPhone/i.test(navigator.userAgent);
            }
        };
        // Windows return both android and iPhone in it's identity, need to check first.
        if (!isMobile.Windows()) {
            if (isMobile.Android()) {
                window.location = androidIntentUrl;
            }
            if (isMobile.iPhone()) {
                //window.location=appleStoreUrl;
            }
        }
        /******************************************************************/
    }, [])

    return (
        <div>index</div>
    )
}

export default index