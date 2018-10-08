$(function () {

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

    var dymanicDotsStyle = {
        constructor: function (options) {
            this.options = options;
            this.initialData = {};
            this.initialTempData = {};
            this.initialData.dotsCarousel = $(this.dotsCarousel.wrap);
            this.initialData.dotsCarouselData = this.initialData.dotsCarousel.data("owl.carousel");
            console.log(this)
            this.setOptions();
            this.overrideOptions();
            this.onDrag();
        },

        overrideOptions: function () {
            $(window).on("resize", this.setOptions.bind(this));
        },

        setOptions: function () {
            this.initialData.dotWidth = $(this.options.dots).outerWidth();
            this.initialData.innerWidth = window.innerWidth;
        },

        onDrag: function () {
            this.initialTempData.prevStageTransform = this.initialData.dotsCarouselData.$stage[0].style.transform;
            if (this.initialTempData.prevStageTransform) {
                this.initialData.stageTransform = this.initialTempData.prevStageTransform[1];
            }

        }

    }

    var carousel = {
        constructor: function (options) {
            this.options = options;
            this.initImageCarousel();
            this.initDotsCarousel();
            dymanicDotsStyle.call(this);
        },

        initImageCarousel: function () {
            this.imageCarousel = $(this.options.imageCarousel.elements.wrap)
                .owlCarousel(this.options.imageCarousel.owl)
                .on('changed.owl.carousel', this.syncPosition.bind(this));
        },

        initDotsCarousel: function () {
            var self = this;
            self.dotsCarousel = $(self.options.dotsCarousel.elements.wrap)
                .on('initialized.owl.carousel', function () {
                        $(self.options.dotsCarousel.elements.wrap).find(".owl-item").eq(0).addClass("current");
                        dymanicDotsStyle.constructor(options);
                    }
                )
                .owlCarousel(self.options.dotsCarousel.owl)
                .on('changed.owl.carousel', self.syncPosition2.bind(self))
                .on("click", ".owl-item", self.dotsClick.bind(self));
        },

        syncPosition: function (el) {
            //if you set loop to false, you have to restore this next line
            //var current = el.item.index;

            //if you disable loop you have to comment this block
            var count = el.item.count - 1;
            var current = Math.round(el.item.index - (el.item.count / 2) - .5);

            if (current < 0) {
                current = count;
            }
            if (current > count) {
                current = 0;
            }

            //end block
            this.dotsCarousel
                .find(".owl-item")
                .removeClass("current")
                .eq(current)
                .addClass("current");

            var onscreen = this.dotsCarousel.find('.owl-item.active').length - 1;
            var start = this.dotsCarousel.find('.owl-item.active').first().index();
            var end = this.dotsCarousel.find('.owl-item.active').last().index();

            if (current > end) {
                this.dotsCarousel.data('owl.carousel').to(current, 100, true);
            }
            if (current < start) {
                this.dotsCarousel.data('owl.carousel').to(current - onscreen, 100, true);
            }
        },

        syncPosition2: function (el) {
            if (this.options.imageCarousel.owl.items) {
                var number = el.item.index;
                this.imageCarousel.data('owl.carousel').to(number, 100, true);
            }
        },

        dotsClick: function (e) {
            e.preventDefault();
            var number = $(e.target).closest(".owl-item").index();
            $(this.options.imageCarousel.elements.wrap).data('owl.carousel').to(number, 300, true);
        }
    };

    carousel.constructor(options);

});
