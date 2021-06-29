var stateCounts =[];
var statesTotal =0;
const apiKey = "";
var indexNum = 1400
var zipGlobal;
var zipList;

function landingScreen(){
    var container = document.getElementById('main');
    var landscreenHeadTag = document.createElement('h2');
    landscreenHeadTag.setAttribute('id', 'landscreenHeader');
    var landscreenHeadText = document.createTextNode('Minnesota COVID-19 Goal Tracker');
    landscreenHeadTag.appendChild(landscreenHeadText);
    container.appendChild(landscreenHeadTag);
    getApiState();
}

landingScreen();

function getApiState() {
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
                var totalUS = Math.round(pctCalc);
                var displayTest = document.getElementById('main');
                var blurbTag = document.createElement('p');
                var blurbText = document.createTextNode('President Biden’s goal was to have 70% of adults in the US receive COVID-19 vaccinations by the Fourth of July. At our  current rate of vaccination, we will fall slightly short of this goal; those of us who want to make 2021 a summer of closeness even amid the rise of the Delta variant better campaign to get as many people vaccinated as quickly as possible.');
                blurbTag.appendChild(blurbText);
                blurbTag.setAttribute('class', 'paragraph');
                
                var shortfall = 160000000-statesTotal
                var totalShare = shortfall*0.017047322;
                
                var totalShareRound = Math.round(totalShare);
                var totalShareRoundCommas = Math.round(totalShareRound);

                var p1Tag = document.createElement('p');
                var p1Text =document.createTextNode("Currently, only "+totalUS+" percent of Americans are vaccinated, but at LEAST half of us are ugly. This means that "+shortfall+" Americans need to be vaccinated by the 4th or President Biden will cry. Which is obviously unacceptable. So, "+totalShareRound+" Minnesotans need to show their dumb faces at a vaccination site like RIGHT NOW or we'll have to eat a share of the blame for whatever resulting disgrace befalls us.");
                p1Tag.appendChild(p1Text);
                p1Tag.setAttribute('class', 'paragraph');

                var mainScreen = document.getElementById('main');

                mainScreen.appendChild(blurbTag);
                mainScreen.appendChild(p1Tag);
                loadForm();
        })
}

function loadForm(){
    var formContainer = document.getElementById('main');
    var formDeclare = document.createElement('form');
    var formtextTag = document.createElement('h2');
    var formtextText = document.createTextNode('Please enter your ZIP code:')
    formtextTag.appendChild(formtextText);
    formDeclare.setAttribute('class', 'center');
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
    formDeclare.appendChild(formtextTag);
    formDeclare.appendChild(zipEntry);
    formDeclare.appendChild(submitButton);
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
  var yesLandingText = document.createTextNode("Word? Nice! Thanks for being part of the solution!");
  console.log("Ohio State Delenda Est!");
  yesLandingTag.appendChild(yesLandingText);
  yesLandingTag.setAttribute('class', 'goodHeader')
  containerF.appendChild(yesLandingTag);

  var linkIntroTag = document.createElement('p');
  var linkIntroText = document.createTextNode('Minnesota offers a variety of incentives for resident vaccinations. Claim yours today at:')
  linkIntroTag.appendChild(linkIntroText);
  linkIntroTag.setAttribute('class', 'goodText');
  containerF.appendChild(linkIntroTag);

  var linkTag = document.createElement('a');
  linkTag.setAttribute('href','https://mn.gov/covid19/vaccine-rewards/index.jsp');
  var linkText = document.createTextNode('https://mn.gov/covid19/vaccine-rewards/index.jsp');
  linkTag.appendChild(linkText);
  containerF.appendChild(linkTag);

  var questionTag = document.createElement('h2');
  var questionText = document.createTextNode('...Like a beer, do you?')
  questionTag.appendChild(questionText);
  containerF.appendChild(questionTag);

  var buttonContainer = document.createElement('form');
  buttonContainer.setAttribute('id','buttoncontainer');
  var yesButton = document.createElement('input');
  yesButton.setAttribute('type','button');
  yesButton.setAttribute('value','Sure I do.');
  yesButton.setAttribute('id', 'yesBeer');
  yesButton.addEventListener("click", yesilikeabeer);

  var noButton = document.createElement('input');
  noButton.setAttribute('type','button');
  noButton.setAttribute('value','Not Particularly...');
  noButton.setAttribute('id', 'noBeer');
  noButton.addEventListener("click", nahbeerznasty);

  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  containerF.appendChild(buttonContainer);
}

function noResponse(){
  var main = document.getElementById('main');
  main.innerHTML = "";
  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode('Seriously? Well, same to you!');
  titleTag.appendChild(titleText);
  titleTag.setAttribute('class', 'badHeader');
  main.appendChild(titleTag);

  var divSwitcher = document.createElement('div');
  divSwitcher.setAttribute('id','videoswitcher');
  main.appendChild(divSwitcher);
  
  var introTag = document.createElement('h4');
  var introText = document.createTextNode("That's not too cool, brutha'. In the name of citizenship, good taste, and the memory of the late great Herman Cain, you really ought to reconsider this particular life choice you've made. ");
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'badText');
  divSwitcher.appendChild(introTag);

  var introTag2 = document.createElement('p');
  var introText2 = document.createTextNode("Surely you'll concede, as a decent, God-fearing American citizen, that it's at least a possibility that you don't have all the information a body'd need to have made this choice differntly.");
  introTag2.appendChild(introText2);
  introTag2.setAttribute('class', 'badText');
  divSwitcher.appendChild(introTag2);

  var linkAnchorTag = document.createElement('a');
  linkAnchorTag.setAttribute('href','https://www.cdc.gov/coronavirus/2019-ncov/vaccines/safety.html');
  linkAnchorTag.setAttribute('class','infoLinx');
  divSwitcher.appendChild(linkAnchorTag);
  var link1Tag = document.createElement('h2');
  var link1Text = document.createTextNode("Are vaccines safe?");
  link1Tag.appendChild(link1Text);
  linkAnchorTag.appendChild(link1Tag);

  var linkAnchorTag2 = document.createElement('a');
  linkAnchorTag2.setAttribute('href','https://www.youtube.com/watch?v=WyGq6cjcc3Q&ab_channel=LastWeekTonight');
  linkAnchorTag2.setAttribute('class','infoLinx');
  divSwitcher.appendChild(linkAnchorTag2);
  var link2Tag = document.createElement('h2');
  var link2Text = document.createTextNode("Is Alex Jones full of shit?");
  link2Tag.appendChild(link2Text);
  linkAnchorTag2.appendChild(link2Tag);

  var linkAnchorTag3 = document.createElement('a');
  linkAnchorTag3.setAttribute('href','https://www.cdc.gov/nchs/nvss/vsrr/covid19/index.htm');
  linkAnchorTag3.setAttribute('class','infoLinx');
  divSwitcher.appendChild(linkAnchorTag3);
  var link3Tag = document.createElement('h2');
  var link3Text = document.createTextNode("How many people have actually died from this thing?");
  link3Tag.appendChild(link3Text);
  linkAnchorTag3.appendChild(link3Tag);

  dunkOnyaJethro()
}

function dunkOnyaJethro(){
  var randomString = [
    {
      textInd: 1,
      burn: "; your mother was a hamster, and your father smelt of elberberries."
    },  
    {
      textInd: 2,
      burn: ", 'cause vaccinated people's dicks so hot they stolen - yo dick look just like Gary Coleman."
    },
    {
      textInd: 3,
      burn: ". I also heard that Yo mama's so poor, the ducks throw bread at her."
    },
    {
      textInd: 4,
      burn: ", unless you're fine with going through the whole rotten thing dragging your knuckles around everywhere with you."
    },
    {
      textInd: 5,
      burn: ", and it's real messed up that yo mama so fat, when she cosplayed as Maleficent dudes thought she was tryna' be Ursula."
    },
    {
      textInd: 6,
      burn: " - hard to expect any better from someone whose mama so dumb it take her two hours to watch 60 Minutes."
    },
    {
      textInd: 7,
      burn: ". Know what else, Jethro? Yo mama so broke, Nigerian princes be sending HER money."
    },
    {
      textInd: 8,
      burn: ", and if you can't behave yourself any better than that you'd be well-advised to start wearing a bicycle helmet anytime you're out in public."
    },
    {
      textInd: 9,
      burn: ", and I envy people who never have to meet you."
    },
    {
      textInd: 10,
      burn: "; you are just impossible to underestimate, it seems - even if you were a potato, mahfs'd still be like, 'there go one dumb-ass potato'."
    },
    {
      textInd: 11,
      burn: ". You resemble Rapunzel a bit: she lets down her hair, and you let down everyone you ever meet."
    },
    {
      textInd: 12,
      burn: " if you honestly think this kind of thing is going to fly; you're a real jerk, and you smell like farts."
    },
    {
      textInd: 11,
      burn: " and stop being a butthole about this kind of easy crap. GET VACCINATED, JETHRO!"
    },
    {
      textInd: 12,
      burn: ". You look like six pounds of dog crap in an eight-ounce sack - so ugly that on the day you were born the doctor slapped ya MAMA. And SHE's so damned ugly, her therapist makes her lie face down."
    },
    {
      textInd: 13,
      burn: "; lord, what a jerk you are. What did your country ever do to you? If we promise to throw you a stick, will you leave?"
    }
  ]

  for(i=0; i<randomString.length-1; i++){
    var index=Math.floor(Math.random() * randomString.length);
  }
  insultSelect = randomString[index].burn;
  console.log(insultSelect);
  setTime();
}

function setTime() {
  var secondsLeft = 5;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    console.log(secondsLeft);
    
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage();
    }
  }, 1000);
}

function setTime2() {
  var secondsLeft = 10;
  var timerInterval = setInterval(function() {
    secondsLeft--;
    console.log(secondsLeft);
    
    if(secondsLeft === 0) {
      clearInterval(timerInterval);
      sendMessage2();
    }
  }, 1000);
}

function sendMessage() {
  console.log("Begin Sendmessage");
  var main = document.getElementById("main");
  var divSwitcher = document.getElementById('divSwitcher');
  var eatItJerkTag = document.createElement("h3");
  var eatItJerkText = document.createTextNode("You really, REALLY need to rethink your whole approach to life"+insultSelect);
  ;
  eatItJerkTag.appendChild(eatItJerkText);
  main.appendChild(eatItJerkTag);
  setTime2();
}

function sendMessage2() {
  var divSwitcher = document.getElementById('videoswitcher');
  divSwitcher.innerHTML ="";

  
  var gifTag = document.createElement('a');
    gifTag.setAttribute('href','https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley&allow=autoplay');
  
  var randomBurnGif = [
    {
      textInd: 1,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 2,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 3,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 4,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 5,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 6,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 7,
      gifVar: "./assets/images/oldNtired.gif"
    },
    {
      textInd: 8,
      gifVar: "./assets/images/oldNtired.gif"
    }
  ]
    console.log(randomBurnGif);
    console.log(randomBurnGif[0].gifVar);
    var gifPath = "'"+randomBurnGif[0].gifVar+"'";
    console.log(gifPath);
    
    
    // for(var i=0; i<randomBurnGif.length-1; i++){
    //   var index=Math.floor(Math.random() * randomBurnGif.length);
    // }
    // var insultGif = randomBurnGif[index].gifVar;
    // console.log(insultGif);
    
  
    var gifSelect = document.createElement('img');
    gifSelect.setAttribute('src', gifPath);
    gifSelect.setAttribute('alt','Eat it, rube!');
    gifSelect.setAttribute('style','width:100%;height:100%;');
  
    gifTag.appendChild(gifSelect);
    main.appendChild(gifTag);
  
    
  
  
  //<iframe width="1280" height="720" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

 

}

function yesilikeabeer(){
  var main = document.getElementById('main');
  main.innerHTML = "";
  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode('...well, of COURSE you like a beer!')

  titleTag.appendChild(titleText);
  main.appendChild(titleTag);

  var introTag = document.createElement('h4');
  var introText = document.createTextNode('Cheers to you! Congratulate yourself on your citizenship at one of these fine Minnesota breweries - all within 5 miles of your ZIP!');
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'goodHeader');
  main.appendChild(introTag);

  var cardDisplay = document.createElement('div');
  cardDisplay.setAttribute('id','cardContainer');
  main.appendChild(cardDisplay);

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

          if (data[i] == null){
            break;
          }else{
            var brewerDivTag = document.createElement('div');
            brewerDivTag.setAttribute('class',"brewerCard");
            cardDisplay.appendChild(brewerDivTag);
            
            var brewerHeadTag = document.createElement('h3');
            var brewerHeadText = document.createTextNode(data[i].name);
            brewerHeadTag.appendChild(brewerHeadText);
            brewerDivTag.appendChild(brewerHeadTag);
            brewerHeadTag.setAttribute('class', 'goodHeader');

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

            var linkTag = document.createElement('a');
            var brewerUrlTag = document.createElement('p');
            var brewerUrlText = document.createTextNode(data[i].website_url);
            brewerUrlTag.appendChild(brewerUrlText);
            linkTag.setAttribute('value', `"${data[i].website_url}"`);
            linkTag.setAttribute('href',`"${data[i].website_url}"`)
            console.log(linkTag.value);
            linkTag.appendChild(brewerUrlTag);
            brewerDivTag.appendChild(linkTag);
          }
          
        }
      })
    }
  })
}

function nahbeerznasty(){
  var container = document.getElementById('main');
  container.innerHTML = "";

  var header = document.createElement('div');
  header.setAttribute('id','header');

  var titleTag = document.createElement('h1');
  var titleText = document.createTextNode("Don't like beer, eh?");

  titleTag.appendChild(titleText);
  main.appendChild(titleTag);

  var introTag = document.createElement('h4');
  var introText = document.createTextNode("It's cool; there's all kinds of stuff to do this summer in Minnesota; this is a cool place. Here's some examples: ");
  introTag.appendChild(introText);
  introTag.setAttribute('class', 'goodText');
  main.appendChild(introTag);

  var linkTag = document.createElement('a');
  
  linkTag.setAttribute("value", "https://www.atlasobscura.com/things-to-do/minnesota");
  
  linkTag.setAttribute('href','');
  main.appendChild(linkTag);
  
  linkTag.setAttribute('href','https://www.atlasobscura.com/things-to-do/minnesota');
  var linkText = document.createTextNode('https://www.atlasobscura.com/things-to-do/minnesota');
  linkTag.appendChild(linkText);
  main.appendChild(linkTag);
}