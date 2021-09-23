// import { appendFileSync } from "fs"

export function ForumOnToggle(val) {
    const myForumObj = document.getElementById("MyForums")
    const feedObj = document.getElementById("Feed")
    const groupObj = document.getElementById("Groups")

    switch (val) {
        case "MyForum":
            myForumObj.hidden = !myForumObj.hidden
            break;
        case "Feed":
            feedObj.hidden = !feedObj.hidden
            break;
        case "Groups":
            groupObj.hidden = !groupObj.hidden
            break;

    }
}

// Comment formula (Title, content, tags, [second part of id's of replies (direct replies only so we can nest them)])
export function PostDeserializer(instance, data) {
    var ToStore = SplittingLines(data);
    // pushing to store
    for (var j = 0; j < ToStore.length; j++) {
        instance.$store.commit(
            "Posts/AddPost", {
                't': ToStore[j][0],
                'tt': ToStore[j][1],
                'ttt': ToStore[j][2].split('.'),
                'Reply': ToStore[j][3] || "",
            }
        );
    }

    function SplittingLines(txt) {
        // splitting into lines
        var lineArray = txt.split('\n');
        //output array
        var output = [];
        for (var i = 0; i < lineArray.length; i++) {
            var data = CommentSplit(lineArray[i])
            output.push(data);
        }
        return output;

        // the splitting the comment
        function CommentSplit(txt) {
            var tmpCommentArray = SplitExcludeSB(txt);
            tmpCommentArray[3] = tmpCommentArray[3] != "" ? tmpCommentArray[3].split(',') : "";
            return tmpCommentArray
        }

        //splitting by commas excludiong in [] works for comments
        function SplitExcludeSB(inp) {
            // console.log(inp)
            // using regex to ignor inbetween []
            var reg = /,(?![^[]*\])/; //
            var tmparray = inp.split(reg);

            // sliceing unwanted []
            let firstB = tmparray[3].indexOf("[");
            let lastB = tmparray[3].lastIndexOf("]");
            // if only one val
            tmparray[3] = firstB + 1 != lastB ? tmparray[3].slice(firstB + 1, lastB) : "";

            return tmparray
        }
    }
}
// Reply formula (ID, comment ,[second part of id's of replies (direct replies only so we can nest them)])
export function ReplytDeserializer(instance, data) {
    var ToStore = SplittingLines(data);
    // pushing to store
    for (var j = 0; j < ToStore.length; j++) {
        instance.$store.commit(
            "Posts/AddReply", {
                'id': ToStore[j][0],
                'comment': ToStore[j][1],
                'replies': ToStore[j][2] || [],
            }
        );

    }

    function SplittingLines(txt) {
        // splitting into lines
        var lineArray = txt.split('\n');
        //output array
        var output = [];

        for (var i = 0; i < lineArray.length; i++) {
            var data = CommentSplit(lineArray[i])
            output.push(data);
        }

        return output;

        // the initial comment split
        function CommentSplit(txt) {
            var tmpCommentArray = SplitExcludeSB(txt);
            tmpCommentArray[2] = tmpCommentArray[2] != "" ? tmpCommentArray[2].split(',') : "";
            return tmpCommentArray
        }

        //splitting by commas excludiong in [] works for comments
        function SplitExcludeSB(inp) {
            // using regex to ignor inbetween []
            var reg = /,(?![^[]*\])/; //
            var tmparray = inp.split(reg);
            // sliceing unwanted []
            let firstB = tmparray[2].indexOf("[");
            let lastB = tmparray[2].lastIndexOf("]");
            tmparray[2] = firstB + 1 != lastB ? tmparray[2].slice(firstB + 1, lastB) : "";
            return tmparray
        }
    }

}

export function PlantsDeserializer(instance, data) {
    var ToStore = SplittingLines(data);
    // pushing to store
    for (var j = 0; j < ToStore.length; j++) {
        instance.$store.commit(
            "Plants/AddPlant", {
                'name': ToStore[j][0],
                'color': ToStore[j][1],
                'instructions': ToStore[j].slice(2, 9 + 1),
            }
        );

    }

    function SplittingLines(txt) {
        // splitting into lines
        var lineArray = txt.split('\n');
        //output array
        var output = [];
        for (var i = 0; i < lineArray.length; i++) {
            var data = lineArray[i].split(',');
            output.push(data);
        }

        return output;
    }
}

// export function UpdateTxtFile(Path, data) {
//     const fs = require('fs');
//     fs.appendFileSync(Path, data, 'utf-8')
// }