function run() {
    if (document.querySelector('.pageloaded') !== null) {
        function isCompleted(el) {
            var parents = [];

            var p = el.parentNode;

            while (p.tagName !== "LI") {
                var o = p;
                parents.push(o);
                p = o.parentNode;
            }
            parents = parents.filter(function(j) {
                return j.tagName == "A";
            });

            return parents[0].classList.contains('ci-completed');
        };

        function getTimeSpanNode(remainingSeconds, completedSeconds) {
            function getTime(seconds) {
                var hours = Math.floor(seconds / 3600);
                seconds %= 3600;
                var minutes = Math.floor(seconds / 60);
                seconds = seconds % 60;
                return [hours, minutes, seconds].map(function(x) {
                    return x > 9 ? "" + x : "0" + x;
                }).join(':');
            };
            String.format = function() {
                var theString = arguments[0];
                for (var i = 1; i < arguments.length; i++) {
                    var regEx = new RegExp("\\{" + (i - 1) + "\\}", "gm");
                    theString = theString.replace(regEx, arguments[i]);
                }

                return theString;
            };
            var el = document.createElement("span");
            el.className = "timeSummary";
            if (document.URL.indexOf("lecture") > -1) {
                el.innerHTML = String.format("{0} Remaning <br> {1} Total <br> {2} Completed",
                    getTime(remainingSeconds),
                    getTime(remainingSeconds + completedSeconds),
                    getTime(completedSeconds));
            } else {
                el.textContent = String.format("Remaning: {0} | Total: {1} | Completed: {2}",
                    getTime(remainingSeconds),
                    getTime(remainingSeconds + completedSeconds),
                    getTime(completedSeconds));
            }
            return el;
        };

        var divs = document.querySelectorAll('ul>li.section-title');
        var cs;
        [].forEach.call(divs, function(div) {
            var remainingSeconds = 0;
            var completedSeconds = 0;
            var timeSpans = div.parentElement.querySelectorAll('.ci-details span');
            [].forEach.call(timeSpans, function(timeSpan) {
                cs = timeSpan.textContent.split(':').map(function(x) {
                    return parseInt(x);
                }).filter(Number);
                cs.reverse();
                for (var i in cs) {
                    if (isCompleted(timeSpan)) {
                        completedSeconds += cs[i] * Math.pow(60, i);
                    } else {
                        remainingSeconds += cs[i] * Math.pow(60, i);
                    }
                }
            });

            var titleHeader = div.querySelector('h5');

            try {
                titleHeader.querySelector('.timeSummary').remove();
            } catch (Error) {
                titleHeader.appendChild(document.createElement("br"));
            }
            titleHeader.appendChild(getTimeSpanNode(remainingSeconds, completedSeconds));
            remainingSeconds = 0;
            completedSeconds = 0;
        });
    }
};
run();