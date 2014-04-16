var timer = {
    paused: true,
    active_interval: null,
    initial: null,
    seconds: 300,
    callbacks: {},
    truncate: function (x) {
        return x > 0 ? Math.floor(x) : Math.ceil(x);
    },
    format_seconds: function (seconds) {
        var sign = seconds >= 0 ? "" : "-";
        var min = Math.abs(timer.truncate(seconds / 60));
        var sec = ("0" + Math.abs(seconds % 60)).slice(-2);
        return "" + sign + min + ":" + sec;
    },
    start: function () {
        timer.paused = false;
        if (timer.active_interval == null)
            timer.active_interval = setInterval(timer.tick, 1000);
    },
    stop: function () {
        timer.paused = true;
        if (timer.active_interval != null) {
            clearInterval(timer.active_interval);
            timer.active_interval = null;
        }
    },
    pause: function () {
        timer.paused ? timer.start() : timer.stop();
    },
    reset: function () {
        timer.stop();
        timer.seconds = timer.initial;
        if (typeof timer.callbacks.on_tick === "function")
            timer.callbacks.on_tick(timer.human_time());
    },
    tick: function () {
        if (!timer.paused) {
            timer.seconds -= 1;
            if (typeof timer.callbacks.on_tick === "function")
                timer.callbacks.on_tick(timer.human_time());
            if (typeof timer.callbacks[timer.seconds] === "function")
                timer.callbacks[timer.seconds]();
        }
    },
    human_time: function () {
        return timer.format_seconds(timer.seconds);
    },
    init: function (callbacks) {
        timer.seconds = timer.duration();
        timer.initial = timer.seconds;
        if (callbacks != null) {
            timer.callbacks = callbacks;
        }
    },
    duration: function () {
        var query = window.location.search.substring(1);
        if (query) {
            var pair = query.split("=");
            if (pair[0] == 'd') {
                return pair[1];
            }
        }
        return timer.seconds;
    }
};
