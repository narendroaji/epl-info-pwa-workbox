const BASE_URL = 'https://api.football-data.org/v2';
const PREMIER_LEAGUE = '2021';
const OPTIONS = {
    headers: {
        'X-Auth-Token': 'f9f27c8e03f444149eba13c8f6868f2b',
    }
};

const addZero = number => {
    if (number < 10) {
        return `0${number}`;
    } else {
        return number;
    }
}

const status = response => {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

const json = response => {
    return response.json();
}

const error = error => {
    console.log(`ERROR: ${error}`);
}

const getTeams = () => {
    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/teams`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showTeams(data);
    })
    .catch(error);
}

const getTeamById = () => {
    return new Promise(function(resolve, reject) {
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        fetch(`${BASE_URL}/teams/${idParam}`, OPTIONS)
        .then(status)
        .then(json)
        .then(data => {
            showTeamById(data);
            resolve(data)
        })
        .catch(error);
    })
}

const getUpcomingMatchesByTeamId = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    const yearNow = moment().get('year');
    const monthNow = (moment().get('month')) + 1;
    const dateNow = moment().get('date');
    const dateFrom = `${yearNow}-${addZero(monthNow)}-${addZero(dateNow)}`;
    
    const limit = moment().add(14, 'days');
    const limitYear = limit.get('year');
    const limitMonth = (limit.get('month')) + 1;
    const limitDate = limit.get('date');
    const dateTo = `${limitYear}-${addZero(limitMonth)}-${addZero(limitDate)}`;

    fetch(`${BASE_URL}/teams/${idParam}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showUpcomingMatchesByTeamId(data);
    })
    .catch(error);
}

const getStandings = () => {
    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/standings?standingType=TOTAL`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showStandings(data);
    })
    .catch(error);
}

const getScorers = () => {
    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/scorers`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showScorers(data);
    })
    .catch(error);
}

const getUpcomingMatches = () => {    
    const yearNow = moment().get('year');
    const monthNow = (moment().get('month')) + 1;
    const dateNow = moment().get('date');
    const dateFrom = `${yearNow}-${addZero(monthNow)}-${addZero(dateNow)}`;
    
    const limit = moment().add(14, 'days');
    const limitYear = limit.get('year');
    const limitMonth = (limit.get('month')) + 1;
    const limitDate = limit.get('date');
    const dateTo = `${limitYear}-${addZero(limitMonth)}-${addZero(limitDate)}`;

    fetch(`${BASE_URL}/competitions/${PREMIER_LEAGUE}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, OPTIONS)
    .then(status)
    .then(json)
    .then(data => {
        showUpcomingMatches(data);
    })
    .catch(error);
}

const getFavoriteTeams = () => {
    getAll()
    .then(favorite => {
        showFavoriteTeams(favorite);
    });
}

const getFavoriteTeamsById = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(idParam)
    .then(data => {
        getTeamById(data);
    });
}