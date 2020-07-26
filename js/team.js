document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const teamId = urlParams.get("id");
    const isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const btnDelete = document.getElementById("delete");
    const btnDone = document.getElementById("done");

    if (isFromSaved) {
        btnSave.style.display = 'none';
        getFavoriteTeamsById();
        btnDelete.onclick = async function() {
            console.log("Tombol delete ditekan.");
            await deleteFavoriteTeam(teamId);
            M.toast({html: 'Successfully deleted!'});
            btnDelete.style.display = 'none';
            btnDone.style.display = 'inline-block';
            btnDone.classList.add("red");
        }
    } else {
        btnDelete.style.display = 'none';
        let item = getTeamById();
        getUpcomingMatchesByTeamId();
        btnSave.onclick = function () {
            console.log("Tombol save ditekan.");
            item
            .then(function (team) {
                addFavoriteTeam(team);
            })
            .then(function() {
                M.toast({html: 'Successfully added!'});
                btnSave.style.display = 'none';
                btnDone.style.display = 'inline-block';
                btnDone.classList.add("green");
            })
        }
    }
});