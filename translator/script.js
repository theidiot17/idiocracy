// translator/script.js

// Mapping dictionaries
const charToEmoji = {
    'a': '🍎', 'A': '★',
    'b': '🍌', 'B': '☂',
    'c': '🌶️', 'C': '☕',
    'd': '🍩', 'D': '⚓',
    'e': '🥚', 'E': '✿',
    'f': '🍟', 'F': '⚖',
    'g': '🍇', 'G': '⌛',
    'h': '🏠', 'H': '♔',
    'i': '🍦', 'I': '✈',
    'j': '🕹️', 'J': '♬',
    'k': '🔪', 'K': '☾',
    'l': '🍋', 'L': '✉',
    'm': '🍈', 'M': '✒',
    'n': '🥜', 'N': '☄',
    'o': '🍊', 'O': '☽',
    'p': '🍕', 'P': '☼',
    'q': '❓', 'Q': '☁',
    'r': '🌈', 'R': '☢',
    's': '🐍', 'S': '☮',
    't': '🌮', 'T': '✎',
    'u': '☂️', 'U': '♞',
    'v': '🎻', 'V': '⚙',
    'w': '🍉', 'W': '✆',
    'x': '❌', 'X': '☹',
    'y': '🍋', 'Y': '♚',
    'z': '⚡', 'Z': '⚐',
    '1': '1️⃣',
    '2': '2️⃣',
    '3': '3️⃣',
    '4': '4️⃣',
    '5': '5️⃣',
    '6': '6️⃣',
    '7': '7️⃣',
    '8': '8️⃣',
    '9': '9️⃣',
    '0': '0️⃣',
    '.': '🔟',
    ',': '💬',
    '!': '❗',
    '?': '❓',
    "'": '’',
    '"': '“',
    '-': '➖',
    '_': '⬜',
    // Existing mappings kept and new ones added
  };
  
  // Create reverse mapping
  const emojiToChar = {};
  
  // Populate the reverse mapping
  for (const [key, value] of Object.entries(charToEmoji)) {
    emojiToChar[value] = key;
  }
  
  // Function to determine if a character is an emoji
  function isEmoji(char) {
    // Simple regex to match most emojis
    const emojiRegex = /\p{Emoji}/u;
    return emojiRegex.test(char);
  }
  
  // Function to translate text to emojis
  function translateToEmoji(text) {
    return text.split('').map(char => charToEmoji[char] || char).join('');
  }
  
  // Function to translate emojis to text
  function translateToText(emojiStr) {
    let text = '';
    let i = 0;
  
    while (i < emojiStr.length) {
      // Attempt to match multi-character emojis first
      let matched = false;
  
      // Define the maximum length of emojis in charToEmoji
      const maxEmojiLength = Math.max(...Object.values(charToEmoji).map(e => e.length));
  
      for (let len = maxEmojiLength; len > 0; len--) {
        const substr = emojiStr.substring(i, i + len);
        if (emojiToChar[substr]) {
          text += emojiToChar[substr];
          i += len;
          matched = true;
          break;
        }
      }
  
      if (!matched) {
        // If no emoji is matched, retain the original character
        text += emojiStr[i];
        i++;
      }
    }
  
    return text;
  }
  
  // Function to handle live translation
  function handleLiveTranslation() {
    const input = document.getElementById('inputBox').value;
    let output = '';
  
    // Iterate through each character or emoji in the input
    for (let i = 0; i < input.length;) {
      let matched = false;
      // Attempt to match multi-character emojis
      const maxEmojiLength = Math.max(...Object.values(charToEmoji).map(e => e.length));
  
      for (let len = maxEmojiLength; len > 0; len--) {
        const substr = input.substring(i, i + len);
        if (emojiToChar[substr]) {
          output += emojiToChar[substr];
          i += len;
          matched = true;
          break;
        } else if (charToEmoji[substr.toUpperCase()] || charToEmoji[substr.toLowerCase()]) {
          const char = substr.toUpperCase() in charToEmoji ? substr.toUpperCase() : substr.toLowerCase();
          output += charToEmoji[char] || char;
          i += 1;
          matched = true;
          break;
        }
      }
  
      if (!matched) {
        // If no match, append the original character
        output += input[i];
        i++;
      }
    }
  
    document.getElementById('outputBox').textContent = output;
  }
  
  // Event listener for live translation
  document.getElementById('inputBox').addEventListener('input', handleLiveTranslation);
  