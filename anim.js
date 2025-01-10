
			var colours=new Array("#fadbad", "#fadbad", "#fadbad", "#545154", "#545154"); // colours for top, right, bottom and left borders and background of bubbles
			var bubbles=66; // maximum number of bubbles on screen
			var over_or_under="over"; // set to "over" for bubbles to always be on top, or "under" to allow them to float behind other objects
			
			/****************************
			* JavaScript Bubble Cursor  *
			*(c)2010-13 mf2fm web-design*
			*  http://www.mf2fm.com/rv  *
			* DON'T EDIT BELOW THIS BOX *
			****************************/
			var x=ox=400;
			var y=oy=300;
			var swide=800;
			var shigh=600;
			var sleft=sdown=0;
			var bubb=new Array();
			var bubbx=new Array();
			var bubby=new Array();
			var bubbs=new Array();
			var sploosh=false;
			
			function addLoadEvent(funky) {
			  var oldonload=window.onload;
			  if (typeof(oldonload)!='function') window.onload=funky;
			  else window.onload=function() {
				if (oldonload) oldonload();
				funky();
			  }
			}
			
			addLoadEvent(buble);
			
			function buble() { if (document.getElementById) {
			  var i, rats, div;
			  for (i=0; i<bubbles; i++) {
				rats=createDiv("3px", "3px");
				rats.style.visibility="hidden";
				rats.style.zIndex=(over_or_under=="over")?"1001":"0";
			
				div=createDiv("auto", "auto");
				rats.appendChild(div);
				div=div.style;
				div.top="1px";
				div.left="0px";
				div.bottom="1px";
				div.right="0px";
				div.borderLeft="1px solid "+colours[3];
				div.borderRight="1px solid "+colours[1];
			
				div=createDiv("auto", "auto");
				rats.appendChild(div);
				div=div.style;
				div.top="0px";
				div.left="1px";
				div.right="1px";
				div.bottom="0px"
				div.borderTop="1px solid "+colours[0];
				div.borderBottom="1px solid "+colours[2];
			
				div=createDiv("auto", "auto");
				rats.appendChild(div);
				div=div.style;
				div.left="1px";
				div.right="1px";
				div.bottom="1px";
				div.top="1px";
				div.backgroundColor=colours[4];
				if (navigator.appName=="Microsoft Internet Explorer") div.filter="alpha(opacity=50)";
				else div.opacity=0.5;
				document.body.appendChild(rats);
				bubb[i]=rats.style;
			  }
			  set_scroll();
			  set_width();
			  bubble();
			}}
			
			function bubble() {
			  var c;
			  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
				ox=x;
				oy=y;
				for (c=0; c<bubbles; c++) if (!bubby[c]) {
				  bubb[c].left=(bubbx[c]=x)+"px";
				  bubb[c].top=(bubby[c]=y-3)+"px";
				  bubb[c].width="3px";
				  bubb[c].height="3px"
				  bubb[c].visibility="visible";
				  bubbs[c]=3;
				  break;
				}
			  }
			  for (c=0; c<bubbles; c++) if (bubby[c]) update_bubb(c);
			  setTimeout("bubble()", 40);
			}
			
			document.onmousedown=splash;
			document.onmouseup=function(){clearTimeout(sploosh);};
			
			function splash() {
			  ox=-1;
			  oy=-1;
			  sploosh=setTimeout('splash()', 100);
			}
			
			function update_bubb(i) {
			  if (bubby[i]) {
				bubby[i]-=bubbs[i]/2+i%2;
				bubbx[i]+=(i%5-2)/5;
				if (bubby[i]>sdown && bubbx[i]>sleft && bubbx[i]<sleft+swide+bubbs[i]) {
				  if (Math.random()<bubbs[i]/shigh*2 && bubbs[i]++<8) {
					bubb[i].width=bubbs[i]+"px";
					bubb[i].height=bubbs[i]+"px";
				  }
				  bubb[i].top=bubby[i]+"px";
				  bubb[i].left=bubbx[i]+"px";
				}
				else {
				  bubb[i].visibility="hidden";
				  bubby[i]=0;
				  return;
				}
			  }
			}
			
			document.onmousemove=mouse;
			function mouse(e) {
			  if (e) {
				y=e.pageY;
				x=e.pageX;
			  }
			  else {
				set_scroll();
				y=event.y+sdown;
				x=event.x+sleft;
			  }
			}
			
			window.onresize=set_width;
			function set_width() {
			  var sw_min=999999;
			  var sh_min=999999;
			  if (document.documentElement && document.documentElement.clientWidth) {
				if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
				if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
			  }
			  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
				if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
				if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
			  }
			  if (document.body.clientWidth) {
				if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
				if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
			  }
			  if (sw_min==999999 || sh_min==999999) {
				sw_min=800;
				sh_min=600;
			  }
			  swide=sw_min;
			  shigh=sh_min;
			}
			
			window.onscroll=set_scroll;
			function set_scroll() {
			  if (typeof(self.pageYOffset)=='number') {
				sdown=self.pageYOffset;
				sleft=self.pageXOffset;
			  }
			  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
				sdown=document.body.scrollTop;
				sleft=document.body.scrollLeft;
			  }
			  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
				sleft=document.documentElement.scrollLeft;
				sdown=document.documentElement.scrollTop;
			  }
			  else {
				sdown=0;
				sleft=0;
			  }
			}
			
			function createDiv(height, width) {
			  var div=document.createElement("div");
			  div.style.position="absolute";
			  div.style.height=height;
			  div.style.width=width;
			  div.style.overflow="hidden";
			  div.style.backgroundColor="transparent";
			  return (div);
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			
			/*var smokeyness=100; // how much smoke is on the screen (more will slow the script down)
			var density=40; // how 'big' is the smoke
			
			/****************************
			* JavaScript Smokey Cursor  *
			* (c)2013 mf2fm web-design  *
			*  http://www.mf2fm.com/rv  *
			* DON'T EDIT BELOW THIS BOX *
			****************************/
			
			/*var swide=800;
			var shigh=600;
			var toke=new Array();
			var tokex=new Array();
			var tokedx=new Array();
			var tokey=new Array();
			var nicotine=new Array();
			var mousedown=false;
			var x=400;
			var y=300;
			var sleft=sdown=0;
			var ie_version=(navigator.appVersion.indexOf("MSIE")!=-1)?parseFloat(navigator.appVersion.split("MSIE")[1]):false;
			
			function addLoadEvent(funky) {
			  var oldonload=window.onload;
			  if (typeof(oldonload)!='function') window.onload=funky;
			  else window.onload=function() {
				if (oldonload) oldonload();
				funky();
			  }
			}
			
			addLoadEvent(puff);
			
			function puff() { if (document.getElementById) {
			  var i, fag;
			  for (i=0; i<smokeyness; i++) {
				fag=document.createElement("div");
				toke[i]=fag.style;
				toke[i].position="absolute";
				toke[i].backgroundColor="transparent";
				toke[i].font="bold "+density+"px Tahoma, Geneva, sans-serif";
				toke[i].color="rgba(234,234,234,0.033)";
				toke[i].zIndex="9999";
				toke[i].pointerEvents="none";
				toke[i].visibility="hidden";
				fag.appendChild(document.createTextNode(String.fromCharCode('0x25CF')));
			
				document.body.appendChild(fag);
				tokey[i]=false;
			  }
			  set_scroll();
			  set_width();
			  setInterval(drag, 50);
			}}
			
			function drag() {
			  var c;
			  if (mousedown) for (c=0; c<smokeyness; c++) if (tokey[c]===false) {
				toke[c].left=(tokex[c]=x-density/2)+"px";
				toke[c].top=(tokey[c]=y-density)+"px";
				toke[c].visibility="visible";
				tokedx[c]=(c%2?1.5:-1.5)*Math.random();
				nicotine[c]=80;
				break;
			  }
			  for (c=0; c<smokeyness; c++) if (tokey[c]!==false) smoke_rising(c);
			}
			
			
			document.onmousedown=function(){set_scroll();if(ie_version)setTimeout('mousedown=true', 51);else mousedown=true;};
			document.onmouseup=function(){mousedown=false};
			
			function smoke_rising(i) {
			  var cancer;
			  tokey[i]-=4+i%3;
			  tokex[i]+=tokedx[i]-0.5+Math.random();
			  if (tokey[i]>sdown-density*2 && tokex[i]>sleft && tokex[i]<sleft+swide-density && (nicotine[i]+=2)<256) {
				cancer=nicotine[i].toString(16);
				cancer="#"+cancer+cancer+cancer;
				if (ie_version && ie_version<10) toke[i].filter="Glow(Color="+cancer+",Strength="+Math.floor(nicotine[i]/5)+")";
				else if (ie_version) toke[i].textShadow='#000000 0px 0px '+Math.floor(nicotine[i]/5)+'px';
				else toke[i].textShadow=cancer+' 0px 0px '+Math.floor(nicotine[i]/5)+'px';
				toke[i].top=tokey[i]+"px";
				toke[i].left=tokex[i]+"px";
			  }
			  else {
				toke[i].visibility="hidden";
				tokey[i]=false;
			  }
			}
			
			document.onmousemove=mouse;
			function mouse(e) {
			  if (e) {
				y=e.pageY;
				x=e.pageX;
			  }
			  else {
				set_scroll();
				y=event.y+sdown;
				x=event.x+sleft;
			  }
			}
			
			window.onresize=set_width;
			function set_width() {
			  var sw_min=999999;
			  var sh_min=999999;
			  if (document.documentElement && document.documentElement.clientWidth) {
				if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
				if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
			  }
			  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
				if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
				if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
			  }
			  if (document.body.clientWidth) {
				if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
				if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
			  }
			  if (sw_min==999999 || sh_min==999999) {
				sw_min=800;
				sh_min=600;
			  }
			  swide=sw_min;
			  shigh=sh_min;
			}
			
			window.onscroll=set_scroll;
			function set_scroll() {
			  if (typeof(self.pageYOffset)=='number') {
				sdown=self.pageYOffset;
				sleft=self.pageXOffset;
			  }
			  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
				sdown=document.body.scrollTop;
				sleft=document.body.scrollLeft;
			  }
			  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
				sleft=document.documentElement.scrollLeft;
				sdown=document.documentElement.scrollTop;
			  }
			  else {
				sdown=0;
				sleft=0;
			  }
			} */
