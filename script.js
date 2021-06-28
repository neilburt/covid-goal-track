var stateCounts =[];
var statesTotal =0;
const apiKey = "";
var indexNum = 1400
var zipGlobal;
var zipList;

function landingScreen(){
    var container = document.getElementById('main');
    var landscreenHeadTag = document.createElement('h2');
    var landscreenHeadText = document.createTextNode('Minnesota COVID-19 Goal Tracker');
    landscreenHeadTag.appendChild(landscreenHeadText);
    container.appendChild(landscreenHeadTag);

    getApiState();
}

landingScreen();

function getApiState() {
    //   let searchEntry = $('#search-field').val();
      let requestUrl2 = `https://api.covidactnow.org/v2/states.json?apiKey=6b5476d41dfb418d82fbaf1cfaa0071c`;
      fetch(requestUrl2)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data)
            for (var i=0; i<53; i++){
                statesTotal += data[i].actuals.vaccinationsCompleted
                }

                var pctCalc = (statesTotal/331000000)*100;
                // console.log(pctCalc);

                var totalUS = Math.round(pctCalc);
                // console.log(totalUS);

                var displayTest = document.getElementById('main');
                
                var blurbTag = document.createElement('p');
                var blurbText = document.createTextNode('President Biden’s goal was to have 70% of adults in the US receive COVID-19 vaccinations by the Fourth of July. At our  current rate of vaccination, we will fall slightly short of this goal; those of us who want to make 2021 a summer of closeness even amid the rise of the Delta variant better campaign to get as many people vaccinated as quickly as possible.');
                blurbTag.appendChild(blurbText);
                
                var shortfall = 160000000-statesTotal
                var totalShare = shortfall*0.017047322;
                
                var totalShareRound = Math.round(totalShare);
                var totalShareRoundCommas = Math.round(totalShareRound);

                var p1Tag = document.createElement('p');
                var p1Text =document.createTextNode("Currently, only "+totalUS+" percent of Americans are vaccinated, but at LEAST half of us are ugly. This means that "+shortfall+" Americans need to be vaccinated by the 4th or President Biden will cry. Which is obviously unacceptable. So, "+totalShareRound+" Minnesotans need to show their dumb faces at a vaccination site TUT SUITE or we'll have to eat a share of the blame for whatever discrace befalls us as a result.");
                p1Tag.appendChild(p1Text);

                var delendaTag = document.createElement('p');
                var delendaText = document.createTextNode("(Ohio must be destroyed, and Urban Meyer is a cunt. Flush twice: it is a LOOOONG way to Columbus.)");
                delendaTag.appendChild(delendaText);

                var mainScreen = document.getElementById('main');

                mainScreen.appendChild(blurbTag);
                mainScreen.appendChild(p1Tag);
                mainScreen.appendChild(delendaTag);
                loadForm();
        })
}

function loadForm(){
    var formContainer = document.getElementById('main');
    var formDeclare = document.createElement('form');
    var formtextTag = document.createElement('h2');
    var formtextText = document.createTextNode('Please enter your ZIP code:')
    formtextTag.appendChild(formtextText);
    var zipEntry = document.createElement('input');
    zipEntry.setAttribute('type','text');
    zipEntry.setAttribute('maxLength',5);
    zipEntry.setAttribute('id','zipInput')
    var submitButton = document.createElement('input');
    submitButton.setAttribute('type','button');
    submitButton.setAttribute('id', 'code');
    submitButton.setAttribute('cols',10);
    submitButton.setAttribute('rows',1);
    submitButton.setAttribute('value','submit');
    submitButton.addEventListener("click",submitZIP);
    formDeclare.appendChild(zipEntry);
    formDeclare.appendChild(submitButton);
    formContainer.appendChild(formtextTag);
    formContainer.appendChild(formDeclare);   
}

function submitZIP(){
  var zipInput = document.getElementById('zipInput');
  zipGlobal = zipInput.value;
  var userZIP = zipInput.value;
  console.log(userZIP);
  zipInput.value ="";

  var formAdd = document.getElementById('main');
  formAdd.innerHTML="";

  var h1Tag = document.createElement('h1');
  h1Tag.setAttribute('id','zipLoad');
  var h1Text = document.createTextNode(userZIP);
  h1Tag.appendChild(h1Text);
  formAdd.appendChild(h1Tag);
  zipLookup();
}

function yesResponse(){
  console.log("Yes response recorded.")
  
  var userZip = document.getElementById('zipInput');
  console.log(userZip);
  var containerF = document.getElementById('main');
  containerF.innerHTML ="";

  var yesLandingTag = document.createElement('h1')
  var yesLandingText = document.createTextNode("Word? Nice! Thanks a million! Ohio State Delenda Est!");
  yesLandingTag.appendChild(yesLandingText);
  containerF.appendChild(yesLandingTag);

  var linkIntroTag = document.createElement('p');
  var linkIntroText = document.createTextNode('Minnesota offers a variety of incentives for resident vaccinations. Claim yours today at:')
  linkIntroTag.appendChild(linkIntroText);
  containerF.appendChild(linkIntroTag);

  var linkTag = document.createElement('a');
  linkTag.setAttribute('href','https://mn.gov/covid19/vaccine-rewards/index.jsp');
  var linkText = document.createTextNode('https://mn.gov/covid19/vaccine-rewards/index.jsp');
  linkTag.appendChild(linkText);
  containerF.appendChild(linkTag);

  var questionTag = document.createElement('h2');
  var questionText = document.createTextNode('')
}

function noResponse(){
  var main = document.getElementById('main');
  main.innerHTML ="";
  console.log("zipGlobal: "+zipGlobal);
  let request5 = `https://app.zipcodebase.com/api/v1/radius?apikey=1578b6e0-d5ef-11eb-b9b2-2b8eceeea297&code=${zipGlobal}&radius=5&country=us&unit=miles`;
  fetch(request5)
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    console.log(data);
    var beerList = data.results;
    console.log(beerList);
    console.log(data.results);
    
    for(var i=0; i<beerList.length; i++){
      console.log(beerList[i].code);
      zipList = data.results[i].code;
      console.log("zipList= "+zipList);
      let request6 = `https://api.openbrewerydb.org/breweries?by_postal=${zipList}`;
      console.log(request6);
      fetch(request6)
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        console.log("Here is the data:");
        console.log(data);
        
        for(let i=0; i<data.length; i++){
          var brewerDivTag = document.createElement('div');
          brewerDivTag.setAttribute('class',"brewerCard");
          main.appendChild(brewerDivTag);
          
          var brewerHeadTag = document.createElement('h3');
          var brewerHeadText = document.createTextNode(data[i].name);
          brewerHeadTag.appendChild(brewerHeadText);
          brewerDivTag.appendChild(brewerHeadTag);

          var brewerStreetTag = document.createElement('p');
          var brewerStreetText = document.createTextNode(data[i].street);
          brewerStreetTag.appendChild(brewerStreetText);
          brewerDivTag.appendChild(brewerStreetTag);

          var brewerCityTag = document.createElement('p');
          var brewerCityText = document.createTextNode(data[i].city);
          brewerCityTag.appendChild(brewerCityText);
          brewerDivTag.appendChild(brewerCityTag);

          var brewerPhoneTag = document.createElement('p');
          var brewerPhoneText = document.createTextNode(data[i].phone);
          brewerPhoneTag.appendChild(brewerPhoneText);
          brewerDivTag.appendChild(brewerPhoneTag);

          // var linkTag = document.createElement('a');
          var brewerUrlTag = document.createElement('p');
          var brewerUrlText = document.createTextNode(data[i].website_url);
          brewerUrlTag.appendChild(brewerUrlText);
          linkTag.setAttribute('value', `"${data[i].website_url}"`);
          console.log(linkTag.value);
          linkTag.appendChild(brewerUrlTag);
          
          
        }
      })
    }
  })
}