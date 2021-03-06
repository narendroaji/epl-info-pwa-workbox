const showTeams = data => {
    let teamList = ``;
    data.teams.forEach(team => {
        if (team.founded === null) {
            team.founded = `Information not available`;
        }
        teamList += `
        <a href="./team.html?id=${team.id}">
            <div class="col s12 m6 l4" style="margin-bottom: 20px">
                <table class="striped centered z-depth-3">
                    <tbody>
                        <tr>
                            <td class="center"><img src="${team.crestUrl.replace(
                                /^http:\/\//i,
                                "https://"
                            )}" alt="${team.name}" style="width: 100px; height:100px;"></td>
                        </tr>
                        <tr>    
                            <td>${team.name}</td>
                        </tr>
                        <tr>
                            <td>${team.founded}</td>
                        </tr>
                        <tr>
                            <td>${team.venue}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </a>
        `;
    })
    document.getElementById("showTeams").innerHTML = teamList;
}

const showTeamById = data => {
    const coach = data.squad.filter(elem => {
        return elem.role === 'COACH';
    })

    const players = data.squad.filter(elem => {
        return elem.role === 'PLAYER';
    })

    let teamDetail = `
        <section class="z-depth-3">
            <div class="center" style="margin-bottom: 20px;">
            <img src="${data.crestUrl.replace(
                /^http:\/\//i,
                "https://"
            )}" alt="${data.name}" width="25%">
            </div>
            <table class="striped">
                <tr>
                    <td>Name</td>
                    <td>${data.name}</td>
                </tr>
                <tr>
                    <td>TLA</td>
                    <td>${data.tla}</td>
                </tr>
                <tr>
                    <td>Manager</td>
                    <td>${coach[0].name}</td>
                </tr>
                <tr>
                    <td>Founded</td>
                    <td>${data.founded}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td><a href="${data.website}">${data.website}</a></td>
                </tr>
                <tr>
                    <td>Venue</td>
                    <td>${data.venue}</td>
                </tr>
            </table>            
        </section>
    `;
    document.getElementById('showTeamInfo').innerHTML = teamDetail;
    
    let playerList = ``;
    players.forEach(player => {
        let shortenPlayerPosition;
        if (player.position === 'Goalkeeper') {
            shortenPlayerPosition = 'GK';
        } else if (player.position === 'Defender') {
            shortenPlayerPosition = 'D';
        } else if (player.position === 'Midfielder') {
            shortenPlayerPosition = 'M';
        } else if (player.position === 'Attacker') {
            shortenPlayerPosition = 'F'
        }

        playerList += `
            <tr>
                <td>${player.name}</td>
                <td>
                    <span class="short-text">${shortenPlayerPosition}</span>
                    <span class="full-text">${player.position}</span>
                </td>
                <td class="hide-on-small-only">${player.nationality}</td>
            </tr>
        `;
    })
    
    let teamSquad = `
        <section class="z-depth-3">
            <h5 class="center-align">Squad</h5>
            <table class="striped">
                <thead>
                    <tr class ="white-text official-color">
                        <td><strong>Name</strong></td>
                        <td><strong>Position</strong></td>
                        <td class="hide-on-small-only"><strong>Nationality</strong></td>
                    </tr>
                </thead>
                <tbody>
                    ${playerList}
                </tbody>
            </table>
        </section>`;
    document.getElementById('showTeamSquad').innerHTML = teamSquad;
}

const showUpcomingMatchesByTeamId = data => {
    let matchList = ``;
    let noMatches = `
        <p class="center-align"><strong>There is no matches for this team.</strong></p>
    `;
    data.matches.forEach(match => {
        matchList += `
            <table class="striped centered z-depth-2" style="margin-bottom: 20px;">
                <tr>
                    <td colspan="3" class="white-text official-color"><strong>Matchday ${match.matchday}</strong></td>
                </tr>
                <tr>
                    <td style="width: 47%;">${match.homeTeam.name}</td>
                    <td style="width: 6%;"><strong>VS</strong></td>
                    <td style="width: 47%;">${match.awayTeam.name}</td>
                </tr>
                <tr>
                    <td colspan="3"><strong>${match.utcDate.slice(0,10)} - UTC${match.utcDate.slice(11,16)}</strong></td>
                </tr>
            </table>
        `;
    })

    let teamUpcomingMatches;
    if (matchList === ``) {
        teamUpcomingMatches = `
            <section class="z-depth-3">
                ${noMatches}          
            </section>
        `;
    } else {
        teamUpcomingMatches = `
            <section class="z-depth-3">
                <h5 class="center-align">Upcoming Matches</h5>
                ${matchList}          
            </section>
        `;
    }
    document.getElementById('showTeamUpcomingMatches').innerHTML = teamUpcomingMatches;
}

const showStandings = data => {
    let standings = ``;
    data.standings[0].table.forEach(team => {
        standings += `
            <tr>
                <td class="center-align">${team.position}</td>
                <td><img src="${team.team.crestUrl.replace(
                    /^http:\/\//i,
                    "https://"
                    )}" style="height: 30px" alt="${team.team.name}">
                </td>
                <td class="hide-on-small-only">${team.team.name}</td>
                <td class="center-align">${team.playedGames}</td>
                <td class="center-align">${team.won}</td>
                <td class="center-align">${team.draw}</td>
                <td class="center-align">${team.lost}</td>
                <td class="center-align">${team.points}</td>
            </tr>
        `;
    });

    let showStandingsHTML = `
        <section class="z-depth-3">
            <h5>Standings</h5>
            <table class="striped">
                <thead>
                    <tr>
                        <td class="center">Pos.</td>
                        <td>Team</td>
                        <td class="hide-on-small-only"></td>
                        <td class="center-align">
                            <span class="short-text">P</span>
                            <span class="full-text">Played</span>
                        </td>
                        <td class="center-align">
                            <span class="short-text">W</span>
                            <span class="full-text">Won</span>
                        </td>
                        <td class="center-align">
                            <span class="short-text">D</span>
                            <span class="full-text">Drawn</span>
                        </td>
                        <td class="center-align">
                            <span class="short-text">L</span>
                            <span class="full-text">Lost</span>
                        </td>
                        <td class="center-align">
                            <span class="short-text">Pts</span>
                            <span class="full-text">Points</span>
                        </td>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
            </table>
        </section>
    `;
    document.getElementById("showStandings").innerHTML = showStandingsHTML;
}

const showScorers = data => {
    let scorers = ``;
    data.scorers.forEach(player => {
        scorers += `
            <tr>
                <td>${player.player.name}</td>
                <td class="hide-on-small-only">${player.team.name}</td>
                <td class="hide-on-small-only">${player.player.nationality}</td>
                <td>${player.numberOfGoals}</td>
            </tr>
        `;
    });

    let showTopScorer = `
        <section class="z-depth-3">
            <table class="striped">
                <caption class="left-align"><h5>Top Scorer</h5></caption>
                <thead>
                    <tr>
                        <td><strong>Name</strong></td>
                        <td class="hide-on-small-only"><strong>Team</strong></td>
                        <td class="hide-on-small-only"><strong>Nationality</strong></td>
                        <td><strong>Goals</strong></td>
                    </tr>
                </thead>
                <tbody id="scorers">
                    ${scorers}
                </tbody>
            </table>
        </section>
    `;
    document.getElementById("showScorers").innerHTML = showTopScorer;
}

const showUpcomingMatches = data => {
    let matchList = ``;
    let noMatches = `
        <section class="z-depth-3">
            <p class="center-align"><strong>There is no matches or league has ended.</strong></p>
        </section>
    `;
    
    data.matches.forEach(match => {
        matchList += `
            <table class="striped centered z-depth-2" style="margin-bottom: 20px;">
                <tr>
                    <td colspan="3" class="white-text official-color"><strong>Matchday ${match.matchday}</strong></td>
                </tr>
                <tr>
                    <td style="width: 47%;">${match.homeTeam.name}</td>
                    <td style="width: 6%;"><strong>VS</strong></td>
                    <td style="width: 47%;">${match.awayTeam.name}</td>
                </tr>
                <tr>
                    <td colspan="3"><strong>${match.utcDate.slice(0,10)} - UTC${match.utcDate.slice(11,16)}</strong></td>
                </tr>
            </table>
        `;
    })

    let upcomingMatches;
    if (matchList === ``) {
        document.getElementById('showUpcomingMatches').innerHTML = noMatches;
    } else {
        upcomingMatches = `
            <div style="padding-top: 10px; padding-bottom: 10px;">
                <h5 class="center">Upcoming Matches in Two Weeks Ahead</h5>
            </div>
            <div>
                ${matchList}
            </div>
        `;
        document.getElementById('showUpcomingMatches').innerHTML = upcomingMatches;
    }
}

const showFavoriteTeams = data => {
    let favoriteTeamList = ``;
    let emptyList = `
        <section class="col s12 z-depth-3">
            <p class="center-align"><strong>You do not have favorite teams yet.</strong></p>
        </section>
    `;

    data.forEach(favoriteTeam => {
        favoriteTeamList += `
            <section class="col s12 z-depth-3"> 
                <table class="centered">
                    <tr>
                        <td style="width: 25%;">
                            <img src="${favoriteTeam.crestUrl.replace(
                                /^http:\/\//i,
                                "https://"
                                )}" alt="${favoriteTeam.name}" style="height: 75px">
                        </td>
                        <td style="width: 50%;"><strong>${favoriteTeam.name}</strong></td>
                        <td style="width: 25%;">
                            <a href="./team.html?id=${favoriteTeam.id}&saved=true">Show</a>
                        </td>
                    </tr>
                </table>
            </section>
        `;
    });

    if (favoriteTeamList === ``) {
        document.getElementById("favoriteTeamList").innerHTML = emptyList;
    } else {
        document.getElementById("favoriteTeamList").innerHTML = favoriteTeamList;
    }
}