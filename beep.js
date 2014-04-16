var beep_sound = {
    playing: false,
    beep: null,
    element: null,
    start: function (id) {
        this.element = $(id);
        var beep = this.element[0];
        this.beep = beep;
        this.beep.volume = 0.5;
        this.beep.addEventListener('ended', function () {
            setTimeout(function () {
                beep.currentTime = 0;
                beep.volume += 0.1;
                beep.play();
            }, 500);
        }, false);
        this.play();
        this.element.toggle();
    },
    play: function () {
        this.beep.play();
        this.playing = true;
    },
    pause: function () {
        if (this.beep)
            this.playing ? this.stop() : this.play();
    },
    stop: function () {
        this.beep.pause();
        this.playing = false;
    },
    reset: function () {
        if (this.beep) {
            this.stop();
            this.toggle();
        }
        this.beep = null;
        this.element = null;
    },
    toggle: function () {
        this.element.toggle();
    }
};