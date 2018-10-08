var carousel = {
    options: {},
    initialData: {},
    initialTempData: {},

    constructor: function (options) {
        //set options
        this.options = options;

        //set data
        this.initialData.imageCarousel = $(this.options.imageCarousel.elements.wrap);
        this.initImageCarousel();
        this.initDotsCarousel();

        //extends
        dymanicDotsStyle.call(this);
    },

    initImageCarousel: function () {
        this.initialData.imageCarousel
            .owlCarousel(this.options.imageCarousel.owl)
            .on('changed.owl.carousel', this.syncPosition.bind(this));
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
    }
};