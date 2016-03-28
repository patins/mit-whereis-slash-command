/whereis [building]
===========

[Mixmax](https://mixmax.com/) integration for [MIT's whereis](http://whereis.mit.edu).

### setup

1. ```git clone https://github.com/patins/mit-whereis-slash-command.git```
1. ```npm install```
1. add your Google Static Maps API key to keys.js
1. ```npm start```

### example
Typeahead suggesting building names:
![typeahead example](https://i.imgur.com/c8OEEPU.png)

Resolver showing where Kresge is:
![resolver example](https://i.imgur.com/8LBoCRQ.png)

### how it works
whereis.mit.edu's search endpoints suggest building names and find locations. Google Static Maps provide the map pictures.
