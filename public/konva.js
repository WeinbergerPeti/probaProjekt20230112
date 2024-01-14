// // script.js

// // Létrehozzuk a Konva színteret
// var stage = new Konva.Stage({
//     container: 'container',  // Az elem id-je, amely tartalmazza a Konva színteret
//     width: window.innerWidth, // A színtér szélessége
//     height: window.innerHeight // A színtér magassága
// });

// // Létrehozzuk a réteget, ahol a rajzok megjelennek
// var layer = new Konva.Layer();

// // Létrehozzuk a négyzetet
// var rect = new Konva.Rect({
//     x: 50, // Kezdeti X pozíció
//     y: 50, // Kezdeti Y pozíció
//     width: 100, // Szélesség
//     height: 100, // Magasság
//     fill: 'blue', // Kitöltő szín
//     draggable: true // Az elem mozgatható
// });

// // Hozzáadjuk a négyzetet a réteghez
// layer.add(rect);

// // Hozzáadjuk a réteget a színtérhez
// stage.add(layer);

// // Frissítjük a színteret, hogy a változások láthatók legyenek
// layer.draw();


// script.js

// Létrehozzuk a Konva színteret
var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

// Létrehozzuk a réteget, ahol a rajzok megjelennek
var layer = new Konva.Layer();

// Kezelőfüggvény az ecset rajzolásához
function drawBrush() {
    var isPaint = false;
    var lastLine;

    // Eseménykezelő az egér lenyomásához
    stage.on('mousedown touchstart', function (e) {
        isPaint = true;
        var pos = stage.getPointerPosition();
        lastLine = new Konva.Line({
            stroke: 'black',
            strokeWidth: 5,
            globalCompositeOperation: 'source-over',
            points: [pos.x, pos.y]
        });
        layer.add(lastLine);
    });

    // Eseménykezelő az egér mozgatásához
    stage.on('mousemove touchmove', function () {
        if (!isPaint) {
            return;
        }
        var pos = stage.getPointerPosition();
        var newPoints = lastLine.points().concat([pos.x, pos.y]);
        lastLine.points(newPoints);
        layer.batchDraw();
    });

    // Eseménykezelő az egér felengedéséhez
    stage.on('mouseup touchend', function () {
        isPaint = false;
    });

    // Eseménykezelő az egér elhagyásához
    stage.on('mouseleave', function () {
        isPaint = false;
    });
}

// Hozzáadjuk a réteget a színtérhez
stage.add(layer);

// Rajzoló funkció hozzáadása
drawBrush();
