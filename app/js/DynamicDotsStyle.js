var dymanicDotsStyle = {

    constructor: function (options) {
        this.options = options;
        this.initialData = {};
        this.initialTempData = {};
        this.initialData.dotsCarousel = $(this.dotsCarousel.wrap);
        this.initialData.dotsCarouselData = this.initialData.dotsCarousel.data("owl.carousel");

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

};
