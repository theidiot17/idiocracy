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
    // Add more mappings as desired
  };
  
  // Create reverse mapping
  const emojiToChar = {};
  
  // Populate the reverse mapping
  for (const [key, value] of Object.entries(charToEmoji)) {
    emojiToChar[value] = key;
  }
  
  // Function to determine if a substring is an emoji
  function isEmoji(str) {
    // Basic check: if the substring is a key in emojiToChar
    return emojiToChar.hasOwnProperty(str);
  }
  
  // Function to translate text to emojis
  function translateToEmoji(text) {
    return text.split('').map(char => charToEmoji[char] || char).join('');
  }
  
  // Function to translate emojis to text
  function translateToText(emojiStr) {
    let text = '';
    let i = 0;
    const maxEmojiLength = Math.max(...Object.values(charToEmoji).map(e => e.length));
  
    while (i < emojiStr.length) {
      let matched = false;
  
      // Attempt to match multi-character emojis first
      for (let len = maxEmojiLength; len > 0; len--) {
        const substr = emojiStr.substring(i, i + len);
        if (isEmoji(substr)) {
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
    let i = 0;
  
    while (i < input.length) {
      let matched = false;
      const remaining = input.length - i;
      const maxLen = Math.min(4, remaining); // Emojis can be up to 4 characters
  
      for (let len = maxLen; len > 0; len--) {
        const substr = input.substring(i, i + len);
        if (isEmoji(substr)) {
          output += translateToText(substr);
          i += len;
          matched = true;
          break;
        }
      }
  
      if (!matched) {
        const char = input[i];
        // Check if the character is an English letter or mapped symbol
        if (charToEmoji[char] || charToEmoji[char.toUpperCase()]) {
          output += translateToEmoji(char);
        } else {
          output += char;
        }
        i += 1;
      }
    }
  
    document.getElementById('outputBox').textContent = output;
  }
  
  // Event listener for live translation
  document.getElementById('inputBox').addEventListener('input', handleLiveTranslation);
  