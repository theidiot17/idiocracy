// translator/script.js

// Mapping dictionaries
const charToEmoji = {
    'a': '🍎',
    'b': '🍌',
    'c': '🌶️',
    'd': '🍩',
    'e': '🥚',
    'f': '🍟',
    'g': '🍇',
    'h': '🏠',
    'i': '🍦',
    'j': '🕹️',
    'k': '🔪',
    'l': '🍋',
    'm': '🍈',
    'n': '🥜',
    'o': '🍊',
    'p': '🍕',
    'q': '❓',
    'r': '🌈',
    's': '🐍',
    't': '🌮',
    'u': '☂️',
    'v': '🎻',
    'w': '🍉',
    'x': '❌',
    'y': '🍋',
    'z': '⚡',
    ' ': '   ', // Preserve spaces
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
    // Handle multi-character emojis by ensuring the entire emoji is the key
    emojiToChar[value] = key;
  }
  
  // Function to translate text to emoji
  function translateToEmoji(text) {
    return text.toLowerCase().split('').map(char => charToEmoji[char] || char).join('');
  }
  
  // Function to translate emoji to text
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
  
  // Event listeners
  document.getElementById('toEmojiBtn').addEventListener('click', () => {
    const input = document.getElementById('inputText').value;
    const output = translateToEmoji(input);
    document.getElementById('emojiOutput').textContent = output;
  });
  
  document.getElementById('toTextBtn').addEventListener('click', () => {
    const input = document.getElementById('inputEmoji').value;
    const output = translateToText(input);
    document.getElementById('textOutput').textContent = output;
  });
  