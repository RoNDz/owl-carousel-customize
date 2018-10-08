var dotsCarousel = {
    constructor: function() {
        imageCarousel.call(this);
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

    initDotsCarousel: function () {

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