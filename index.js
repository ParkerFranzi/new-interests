const tastediveAPI = '339797-FindNewI-4PDNXAAE';
const newsAPI = '3529a7c1a7d54e3587f38460b8114c9a';
const youtubeAPI = 'AIzaSyA4b9Rx0m_NZPQEbVMa31ZIzbsieueLXhE';

/*  Getting text string to query form    
function test() {
  $('.test').click(function(){
    event.preventDefault();
    let test = $(this).text();
    var replaced = test.split(' ').join('+');
    console.log(replaced);
  })
}
*/

'use strict';

// TasteDive
const apiKey = 'wFDJjXLe74QBMQpjyv3EnfsvQfKmQOmzMbRDW0Xl'; 
const searchURL = 'https://tastedive.com/api/similar';

var myHeaders = new Headers({
  'Content-Type': 'text/plain',
  'Access-Control-Allow-Origin': '/',
});

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${params[key]}`)
    //.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayTasteDive(json) {
  console.log(json);
  let a = json;
  console.log(test);
  console.log(json.Similar.Results[0].wTeaser);
  $('#results-list').empty();
  for (let i = 0; i < json.Similar.Results.length; i++){
    $('#results-list').append(
      `<li><h3>${json.Similar.Results[i].Name}</h3>
      <p>Type: ${json.Similar.Results[i].Type}</p>
      <p>Description: ${json.Similar.Results[i].wTeaser}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getSimilar(query, limit=10, info=1) {
  const params = {
    k: tastediveAPI,
    q: query,
    limit,
    info,
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString + '&callback=handleRequest' ;

  console.log(url);

  const makeAjaxRequest = () => {
    window.handleRequest = x => displayTasteDive(x);
    const tag = document.createElement("script");
    tag.src = url;
    document.getElementsByTagName("head")[0].appendChild(tag);
  };
  makeAjaxRequest();

  /*fetch(url, {headers:myHeaders})
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });*/
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val().split(' ').join('+');
    const maxResults = $('#js-max-results').val();
    getSimilar(searchTerm, maxResults);
  });
}

$(watchForm);

let test = {
  "Similar": {
      "Info": [
          {
              "Name": "Taylor Swift",
              "Type": "music",
              "wTeaser": "\n\n\nTaylor Alison Swift (born December 13, 1989) is an American singer-songwriter. As one of the leading contemporary recording artists, she is known for narrative songs about her personal life, which have received widespread media coverage.\nBorn and raised in Pennsylvania, Swift moved to Nashville, Tennessee, at the age of 14 to pursue a career in country music. She signed with the label Big Machine Records and became the youngest artist ever signed by the Sony/ATV Music publishing house. Her 2006 self-titled debut album peaked at number five on the Billboard 200 and spent the most weeks on the chart in the 2000s. The album's third single, \"Our Song\", made her the youngest person to single-handedly write and perform a number-one song on the Hot Country Songs chart. Swift's second album, Fearless, was released in 2008. Buoyed by the success of pop crossover singles \"Love Story\" and \"You Belong with Me\", Fearless became the best-selling album of 2009 in the US. The album won four Grammy Awards, with Swift becoming the youngest Album of the Year winner.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Taylor_Swift",
              "yUrl": "https://www.youtube-nocookie.com/embed/FuXNumBwDOM",
              "yID": "FuXNumBwDOM"
          }
      ],
      "Results": [
          {
              "Name": "Demi Lovato",
              "Type": "music",
              "wTeaser": "Unbroken is the third studio album by American singer Demi Lovato. It was released on September 20, 2011, by Hollywood Records. Primarily a pop record, Lovato described the album as \"more mature\" and with more R&B elements than her previous material, citing Rihanna as the major influence. While some of the album's lyrical content was heavily influenced by Lovato's personal struggles, it also deals with lighter subjects, such as love, self empowerment, and having fun. Contributions to the album's production came from a wide range of producers, including Toby Gad, Ryan Tedder, Timbaland, Jim Beanz and Rock Mafia.\nLovato initially began recording her third studio album in 2010 before going on tour with the Jonas Brothers on their Live in Concert Tour. After leaving the tour to seek treatment for physical and emotional issues, Lovato continued work on the album following her release, and described the recording process as therapeutic. She collaborated with artists such as Missy Elliott, Timbaland, Dev, Iyaz, and Jason Derulo on several tracks. Commercially, Unbroken peaked at number four on the Billboard 200 chart in the United States, with sales exceeding 97,000 copies in its first week of release, and was later certified gold by the Recording Industry Association of America (RIAA). The album also performed well internationally, peaking in the top 40 in several countries worldwide. It was certified platinum in Brazil, and gold in Chile and the Philippines.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Unbroken_(Demi_Lovato_album)",
              "yUrl": "https://www.youtube-nocookie.com/embed/-MsvER1dpjM",
              "yID": "-MsvER1dpjM"
          },
          {
              "Name": "Selena Gomez",
              "Type": "music",
              "wTeaser": "",
              "wUrl": "http://en.wikipedia.org/wiki/Fly_To_Your_Heart(Selena_Gomez_song)",
              "yUrl": "https://www.youtube-nocookie.com/embed/Tztc73r8348",
              "yID": "Tztc73r8348"
          },
          {
              "Name": "Kesha",
              "Type": "music",
              "wTeaser": "\nKesha Rose Sebert (; born March 1, 1987), known mononymously as Kesha (formerly stylized Ke$ha), is an American singer, songwriter, rapper, and actress. In 2005, at age 18, Kesha was signed to Kemosabe Records. Her first major success came in early 2009 after she was featured on American rapper Flo Rida's number-one single \"Right Round\".\nKesha's music and image propelled her to immediate success. She has earned two number-one albums on the US Billboard 200 with Animal (2010) and Rainbow (2017), and the number-six record Warrior (2012). She has attained ten top-ten singles on the US Billboard Hot 100, including \"Blah Blah Blah\", \"Your Love Is My Drug\", \"Take It Off\", \"Blow\", \"Die Young\", \"My First Kiss\" with 3OH!3, and the chart-topping \"Tik Tok\", \"We R Who We R\", \"Right Round\" with Flo Rida, and \"Timber\" with Pitbull. \"Tik Tok\", at one point, was the best-selling digital single in history, selling over 16.5 million units internationally. She has written songs for other artists, including \"Till the World Ends\" for Britney Spears.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Kesha_(singer)",
              "yUrl": "https://www.youtube-nocookie.com/embed/iP6XpLQM2Cs",
              "yID": "iP6XpLQM2Cs"
          },
          {
              "Name": "Miley Cyrus",
              "Type": "music",
              "wTeaser": "\n\n\n\nMiley Ray Hemsworth (née Cyrus, born Destiny Hope Cyrus; November 23, 1992) is an American singer, songwriter, and actress. After playing minor roles in the television series Doc and the film Big Fish as a child, she became a teen idol in 2006, starring in the Disney Channel television series Hannah Montana as the character Miley Stewart. Her father, musician Billy Ray Cyrus, also starred in the series, which aired for four seasons until 2011.\nCyrus has earned three number-one albums on the US Billboard 200 with Meet Miley Cyrus (2007), Breakout (2008), and Bangerz (2013). Her releases The Time of Our Lives (2009), Can't Be Tamed (2010), and Younger Now (2017) debuted in the top-five in the United States, while her album Miley Cyrus & Her Dead Petz (2015) was released for free online streaming on SoundCloud. Her upcoming seventh studio album She Is Miley Cyrus (2019) will be preceded by the extended plays She Is Coming, She Is Here, and She Is Everything. Further, Cyrus has attained an additional two number-one and three top-ten soundtracks credited as Hannah Montana. She has also earned nine top-ten entries on the US Billboard Hot 100: \"See You Again\", \"7 Things\", \"The Climb\", \"He Could Be the One\" (as Hannah Montana), \"Party in the U.S.A.\", \"Can't Be Tamed\", \"We Can't Stop\", \"Malibu\" and the chart-topping \"Wrecking Ball\".\n",
              "wUrl": "http://en.wikipedia.org/wiki/Miley_cirrus",
              "yUrl": "https://www.youtube-nocookie.com/embed/A9hcJgtnm6Q",
              "yID": "A9hcJgtnm6Q"
          },
          {
              "Name": "Carly Rae Jepsen",
              "Type": "music",
              "wTeaser": "\n\n\nCarly Rae Jepsen (born November 21, 1985) is a Canadian singer, songwriter, and actress. Born and raised in Mission, British Columbia, Jepsen performed several lead roles in her high school's musical productions and pursued musical theatre at the Canadian College of Performing Arts. After completing her studies, she relocated to Vancouver and later competed on the fifth season of Canadian Idol in 2007, placing third. In 2008, Jepsen released her folk-influenced debut studio album Tug of War in Canada.\nJepsen's breakthrough came in 2012, when her single \"Call Me Maybe\" was boosted to significant mainstream popularity; the song became the best-selling single of that year, reaching number one in eighteen countries worldwide. As a result, she was signed to a joint worldwide record deal with Schoolboy Records and Interscope Records. Jepsen's second studio album Kiss was released later that year. The record marked a greater shift into mainstream pop music and saw fair commercial success, reaching the top ten in Canada and the United States. In 2013, Jepsen made her Broadway stage debut as the titular character in Cinderella. In 2015, Jepsen released her third studio album Emotion. It is noted for its influence from 1980s music as well as blending dance-pop and synth-pop with indie sensibilities. While less commercially successful than Kiss, it saw the success of its lead single \"I Really Like You\" and received critical acclaim. In 2016, Jepsen performed in the television special Grease: Live, and lent her voice to the animated film Ballerina. Jepsen’s fourth studio album, Dedicated, was released on May 17, 2019.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Carly_Rae_Jepsen",
              "yUrl": "https://www.youtube-nocookie.com/embed/rJw32FXV97A",
              "yID": "rJw32FXV97A"
          },
          {
              "Name": "Bridgit Mendler",
              "Type": "music",
              "wTeaser": "\nBridgit Claire Mendler (born December 18, 1992) is an American actress, singer, and songwriter. In 2004, she began her career in the animated Indian film The Legend of Buddha, later starring in the films Alice Upside Down (2007), The Clique (2008), Alvin and the Chipmunks: The Squeakquel (2009)  and Labor Pains (2009) as a teenager. In 2009, Mendler signed with Disney Channel and played Juliet van Heusen on Wizards of Waverly Place. Following the positive reception to her character, she landed the role of Teddy Duncan on the Disney series Good Luck Charlie, which ran from April 2010 to February 2014. Mendler also starred in the Disney Channel Original Movie Lemonade Mouth in 2011. Subsequently, Mendler portrayed Candace in the NBC sitcom Undateable (2015–16) and Ashley Willerman in the musical television series Nashville (2017).\n",
              "wUrl": "http://en.wikipedia.org/wiki/Bridgit_Mendler",
              "yUrl": "https://www.youtube-nocookie.com/embed/dPKG1-3LXBs",
              "yID": "dPKG1-3LXBs"
          },
          {
              "Name": "Victoria Justice",
              "Type": "music",
              "wTeaser": "\n\nVictoria Dawn Justice (born February 19, 1993) is an American actress and singer. She rose to fame on Nickelodeon in the 2000s, starring as Lola Martinez on Zoey 101 (2005–2008) and later Tori Vega on Victorious (2010–2013). Justice has also appeared in the films The Boy Who Cried Werewolf (2010), Fun Size (2012), The First Time (2012) and Naomi and Ely's No Kiss List (2015). In 2015, she starred in the lead role as Lindy Sampson on the MTV television series Eye Candy. In music, Justice has recorded several songs for the soundtracks of her acting projects, including Victorious and the Nickelodeon musical Spectacular!.\nVictoria Dawn Justice was born on February 19, 1993, in Hollywood, Florida, the daughter of Serene Reed and Zack Justice. Her father is of English, German, and Irish descent, while her mother, originally from the Bronx, is of Puerto Rican ancestry.",
              "wUrl": "https://en.wikipedia.org/wiki/Victoria_Justice",
              "yUrl": "https://www.youtube-nocookie.com/embed/tPrMvW4YCR0",
              "yID": "tPrMvW4YCR0"
          },
          {
              "Name": "Katy Perry",
              "Type": "music",
              "wTeaser": "\n\n\nKatheryn Elizabeth Hudson (born October 25, 1984), known professionally as Katy Perry, is an American singer, songwriter, and television judge. After singing in church during her childhood, she pursued a career in gospel music as a teenager. Perry signed with Red Hill Records and released her debut studio album Katy Hudson under her birth name in 2001, which was commercially unsuccessful. She moved to Los Angeles the following year to venture into secular music after Red Hill ceased operations and she subsequently began working with producers Glen Ballard, Dr. Luke, and Max Martin. After adopting the stage name Katy Perry and being dropped by The Island Def Jam Music Group and Columbia Records, she signed a recording contract with Capitol Records in April 2007.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Katy_Hudson",
              "yUrl": "https://www.youtube-nocookie.com/embed/aEb5gNsmGJ8",
              "yID": "aEb5gNsmGJ8"
          },
          {
              "Name": "Justin Bieber",
              "Type": "music",
              "wTeaser": "\n\n\nJustin Drew Bieber (; born March 1, 1994) is a Canadian singer and songwriter. Discovered at 13 years old by talent manager Scooter Braun after watching his YouTube videos covering songs, he was signed to RBMG Records in 2008. Bieber then released his debut EP, My World, in late 2009. It was certified Platinum in the United States. With the EP, Bieber became the first artist to have seven songs from a debut record chart on the US Billboard Hot 100. Bieber released his first studio album, My World 2.0, in 2010. It debuted at number one in several countries, was certified triple Platinum in the US, and contained his single \"Baby\", which debuted at number five on the Billboard Hot 100 and  sold 12 million units.\n",
              "wUrl": "http://en.wikipedia.org/wiki/Justin_Bieber?info=EXLINK",
              "yUrl": "https://www.youtube-nocookie.com/embed/y83x7MgzWOA",
              "yID": "y83x7MgzWOA"
          },
          {
              "Name": "One Direction",
              "Type": "music",
              "wTeaser": "\n\n\nOne Direction are an English-Irish pop boy band based in London, composed of Niall Horan, Liam Payne, Harry Styles, and Louis Tomlinson; former member Zayn Malik departed from the group in 2015. The group signed with Simon Cowell's record label Syco Records after forming and finishing third in the seventh series of the British televised singing competition The X Factor in 2010. Propelled to international success by social media, One Direction's five albums, Up All Night (2011), Take Me Home (2012), Midnight Memories (2013), Four (2014), and Made in the A.M. (2015), topped charts in most major markets, and generated hit singles including \"What Makes You Beautiful\", \"Live While We're Young\", \"Best Song Ever\", \"Story of My Life\" and \"Drag Me Down\".\n",
              "wUrl": "http://en.wikipedia.org/wiki/One_Direction",
              "yUrl": "https://www.youtube-nocookie.com/embed/QJO3ROT-A4E",
              "yID": "QJO3ROT-A4E"
          }
      ]
  }
}