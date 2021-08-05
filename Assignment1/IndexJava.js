function ForumFilterChanged() {
    // getting active forums
    const Forums = document.querySelectorAll('input[name=Forum]:checked');
    let CheckedFor = [];
    Forums.forEach((checkbox) => {
        CheckedFor.push(checkbox.value);
    });

    // getting entry flexbox
    let ForumGrid = document.getElementById("ForumEntries");
    ForumGrid.innerHTML = "";
    // getting line manager
    let LineManager = document.getElementById("Lines");
    LineManager.innerHTML = "";
    // some base vals
    var MyThreads = ["a", "b", "c"];
    var Feed = ["d", "e", "f"];
    var Groups = ["g", "h", "i"];

    var LineOffset = 100 / CheckedFor.length;
    // adding lines
    for (let i = 1; i < CheckedFor.length; i++) {
        var TempLine = document.createElement("div");
        TempLine.className = "ForumLine";
        TempLine.style.marginLeft = `${LineOffset * i}%`;
        LineManager.appendChild(TempLine);
    }

    // checking and adding each column
    if (CheckedFor.includes("MyThreads")) {
        var col = document.createElement("div");
        col.className = "ForumColumn";

        for (let i of MyThreads) {
            var cell = document.createElement("div");
            cell.className = "ForumEntry";
            cell.innerText = i;
            col.appendChild(cell);
        }
        ForumGrid.appendChild(col);
    }

    if (CheckedFor.includes("Feed")) {
        var col = document.createElement("div");
        col.className = "ForumColumn";

        for (let i of Feed) {
            var cell = document.createElement("div");
            cell.className = "ForumEntry";
            cell.innerText = i;
            col.appendChild(cell);
        }
        ForumGrid.appendChild(col);
    }

    if (CheckedFor.includes("Groups")) {
        var col = document.createElement("div");
        col.className = "ForumColumn";

        for (let i of Groups) {
            var cell = document.createElement("div");
            cell.className = "ForumEntry";
            cell.innerText = i;
            col.appendChild(cell);
        }
        ForumGrid.appendChild(col);
    }
}