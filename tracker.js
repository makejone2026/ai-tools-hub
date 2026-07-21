// AI Tools Hub - Page View Tracker
(function(){
  var page = location.pathname.replace(/\//g,'').replace('index.html','') || 'home';
  if (page.length > 20) page = page.substring(0,20);
  
  // Method 1: Vercel counter (international)
  fetch('https://tools-six-ebon.vercel.app/api/counter?page=' + encodeURIComponent(page))
    .then(r => r.json())
    .then(d => {
      var el = document.getElementById('pv-counter');
      if (el) el.textContent = (d.count || 0).toLocaleString();
    })
    .catch(function(){});
  
  // Method 2: Local session counter (works everywhere)
  var key = 'aitools_pv_' + page;
  var today = new Date().toDateString();
  var stored = JSON.parse(localStorage.getItem(key) || '{"date":"","count":0}');
  if (stored.date !== today) { stored = {date: today, count: 1}; }
  else { stored.count++; }
  localStorage.setItem(key, JSON.stringify(stored));
  
  // Method 3: hits.dwyl.com badge (global, accessible from China)
  var img = document.createElement('img');
  img.src = 'https://hits.dwyl.com/makejone2026/ai-tools-hub.svg?style=flat-square&show=unique';
  img.alt = 'page views';
  img.style = 'height:18px;vertical-align:middle;margin-left:8px';
  img.onload = function(){
    var el = document.getElementById('hit-badge');
    if (el) el.appendChild(img);
  };
})();
