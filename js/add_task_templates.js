function addANewCategoryHTML() {
    return `
    <label for="Category">Category</label>
      <input id="showNewCat" onfocus="hideMissingText('missingColorspot')" class="input" type="text" placeholder="New Category name">
       <div id="seeCat">
       <div class="options" id="optionsCat"></div>
    </div>
    <div class="cancelOrAdd plus"><img src="assets/img/cancel.png" onclick="renderInputUnit()"><div class="seperate"></div> <img src="assets/img/check.png" onclick="addNewCat()" alt=""></div>
    <div class="colorspots" id="colorspots"></div>                      `
  }

  