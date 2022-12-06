/*
Kogu faili kohta:
Nimi: Futuristic Resolving/Typing Text Effect feat. GLaDOS
Autor: Kevin
Võetud: https://www.sliderrevolution.com/design/cool-javascript-animations/#:~:text=Cool%20Javascript%20Animations%20for%20Loading%2F%20Downloading%20Data%201,clients%20by%20creating%20innovative%20and%20response-boosting%20websites%20
Modifitseeritud: Rico-Andreas Lepp
*/
const resolver = {
  resolve: function resolve(options, callback) {
    // The string to resolve
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };

    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;

      let iterations = options.iterations;

      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          // Ensures partialString without the random character as the final state.
          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            // Replaces the last character of partialString with a random character
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  } };


const strings = [
'root:~$ echo "Tere tulemast lehele Kuradi Nõrk Veebirakendus"',
'root:~$ ./start_hacking.sh'];

let counter = 0;

const options = {
  // Initial position
  offset: 0,
  // Timeout between each random character
  timeout: 5,
  // Number of random characters to show
  iterations: 5,
  // Random characters to pick from
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '='],
  // String to resolve
  resolveString: strings[counter],
  // The element
  element: document.querySelector('[data-target-resolver]') };


// Callback function when resolve completes
function callback() {
  setTimeout(() => {
    counter++;

    if (counter >= strings.length) {
      window.location.href = "kuradi_nork_rakendus.html";
    }

    let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 2000);
}

resolver.resolve(options, callback);