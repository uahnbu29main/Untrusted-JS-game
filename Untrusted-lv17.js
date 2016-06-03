/***************
 * pointers.js *
 ***************
 *
 * You! How are you still alive?
 *
 * Well, no matter. Good luck getting through this
 * maze of rooms - you'll never see me or the Algorithm again!
 */

function startLevel(map) {
    function shuffle(o){ //v1.0 [http://bit.ly/1l6LGQT]
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i),
            x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };

    map.createFromGrid(
        ['+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+* @ o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++*   o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '++++o   *++o   *++o   *++o   *++o   *++o   *+',
         '+++++* o++++* o++++* o++++* o++++* o++++* o++',
         '+++++++++++++++++++++++++++++++++++++++++++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+*   o++*   o++*   o++*   o++*   o++* E o++++',
         '++o *++++o *++++o *++++o *++++o *++++o *+++++',
         '+++++++++++++++++++++++++++++++++++++++++++++'],
        {
            '@': 'player',
            'E': 'exit',
            '+': 'block',
            'o': 'teleporter',
            '*': 'trap',
        }, 2, 2);

    var canvas = map.getCanvasContext();

    var teleportersAndTraps = map.getDynamicObjects();
    teleportersAndTraps = shuffle(teleportersAndTraps);

    for (i = 0; i < teleportersAndTraps.length; i+=2) {
        var t1 = teleportersAndTraps[i];
        var t2 = teleportersAndTraps[i+1];

        // Point each teleporter to either another teleporter
        // or a trap
        if (t1.getType() == 'teleporter') {
            t1.setTarget(t2);
        }
        if (t2.getType() == 'teleporter') {
            t2.setTarget(t1);
        }

    // INSERT THESE LINES
        if (t1.getX() == 7 && t1.getY() == 4) var a = i;
        if (t1.getX() == 42 && t1.getY() == 20) var b = i;
        if (t2.getX() == 7 && t2.getY() == 4) var a = i+1;
        if (t2.getX() == 42 && t2.getY() == 20) var b = i+1;
    }
    if (teleportersAndTraps[a].getType() == 'teleporter') {
        teleportersAndTraps[a].setTarget(teleportersAndTraps[b]);
    // END
    }
}

function validateLevel(map) {
    map.validateExactlyXManyObjects(1, 'exit');
}
