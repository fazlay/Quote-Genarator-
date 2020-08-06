const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


//show loader

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;

}

//hide loading

function complete() {

    if (!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }


}



// get quote form API
async function getQuote() {

    loading();

    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    //const proxyUrl = 'http://cors-anywhere.herokuapp.com/'

    //const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&language=en&format=jason'


    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        //for Unknow Author
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        } else {
            authorText.innerText = data.quoteAuthor;
        }


        //reduce font size for long text
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText;
        //stop loader
        complete();

    } catch (error) {

        getQuote();
        console.log('woops. no quote', error);
    }

    //twiiter functio

    function tweetQuote() {

        const quote = quoteText.innerText;
        const authot = authorText.innerText;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${quote}-${author}`;
        window.open(twitterUrl, '_blank')
    }

    //event lister
    newQuoteBtn.addEventListener('click', getQuote);
    twitterBtn.addEventListener('click', tweetQuote);


}

//On load
getQuote();
