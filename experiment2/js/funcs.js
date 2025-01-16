// funcs.js - helper functions
// Author: Lyssa Li
// Date: 2025 Jan 15

function makeTrees(maxHeight, minHeight, density, func) {
  let treeCount = func.int(func.width * density);
  for (let i = 0; i < treeCount; i++) {
    let treeSize = func.random(100, 200);
    // find tip
    let treeHeight = func.height - func.random(minHeight, maxHeight);
    let h = treeHeight;
    let x = func.random(func.width);
    // draw tree
    while (h < func.height) {
      let dip = func.random(50, 70);
      let s = treeSize * ((h - treeHeight) / (func.height - treeHeight));
      s = func.max(s, treeSize * 0.1);

      func.triangle(x - s / 2, h + dip, x, h, x + s / 2, h + dip);
      h += dip / 3;
    }
  }
}

// clear scroll text
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 100) {
    $('.scroll').fadeOut();
  }
});
