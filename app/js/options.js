var options = {
    imageCarousel: {
        elements: {
            wrap: "#imageCarousel"
        },
        owl: {
            items: 1,
            slideSpeed: 2000,
            nav: true,
            autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
        }
    },
    dotsCarousel: {
        elements: {
            wrap: "#dotsCarousel"
        },
        owl: {
            items: 15,
            dots: false,
            nav: false,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 15,
            responsiveRefreshRate: 100,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 15,
                    slideBy: 15,
                },
                // breakpoint from 480 up
                480: {
                    items: 20,
                    slideBy: 20,
                },
                // breakpoint from 768 up
                768: {
                    items: 30,
                    slideBy: 30,
                }
            }
        }
    }
};