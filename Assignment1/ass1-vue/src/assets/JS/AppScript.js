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