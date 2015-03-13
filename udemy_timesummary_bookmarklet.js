var divs = document.querySelectorAll('ul>li.section-title');
var cs;
[].forEach.call(divs, function(div) {
  var seconds = 0;
  var timeSpans = div.parentElement.querySelectorAll('.ci-details span');
  [].forEach.call(timeSpans, function(timeSpan) {
    cs = timeSpan.textContent.split(':').map(function(x) {return parseInt(x);}).filter(Number);
    cs.reverse();
    for(i in cs) {
      seconds += cs[i]*Math.pow(60,i);
    }
  });
  hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  div.querySelector('h5').appendChild(document.createTextNode('('+[hours,minutes,seconds].map(function(x) {return x>9?""+x:"0"+x}).join(':')+')'));
  seconds = 0;
});
