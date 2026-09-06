type Token = {
  type: 'atom' | 'group' | 'close';
  value: string;
  count?: number;
};

type AtomCount = {
  [atom: string]: number;
};

/**
 * Парсит химическую формулу и возвращает отсортированную по алфавиту строку
 * @param formula - химическая формула (например: "SO3", "H2S2O4", "O4W-2", "Mg(OH)2")
 * @returns отсортированная формула
 */
export function sortChemicalFormula(formula: string): string {
  // 1. Парсим формулу в атомарный словарь
  const atomCounts = parseFormula(formula);

  // 2. Сортируем атомы по алфавиту
  const sortedAtoms = Object.keys(atomCounts).sort();

  // 3. Собираем обратно в строку
  return sortedAtoms
    .map((atom) => {
      const count = atomCounts[atom];
      // Если количество равно 1, не выводим цифру
      return count === 1 ? atom : `${atom}${count}`;
    })
    .join('');
}

/**
 * Основной парсер химической формулы
 */
function parseFormula(formula: string): AtomCount {
  const tokens = tokenizeFormula(formula);
  return parseTokens(tokens);
}

/**
 * Токенизация формулы
 * Разбивает строку на атомы, группы и закрывающие скобки
 */
function tokenizeFormula(formula: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < formula.length) {
    const char = formula[i];

    // Открывающая скобка
    if (char === '(' || char === '[' || char === '{') {
      tokens.push({ type: 'group', value: char });
      i++;
      continue;
    }

    // Закрывающая скобка с возможным числом после
    if (char === ')' || char === ']' || char === '}') {
      let count = 1;
      let numStr = '';
      let j = i + 1;

      // Собираем число после скобки (если есть)
      while (j < formula.length && isDigit(formula[j])) {
        numStr += formula[j];
        j++;
      }

      if (numStr) {
        count = parseInt(numStr, 10);
      }

      tokens.push({ type: 'close', value: char, count });
      i = j;
      continue;
    }

    // Атом (заглавная буква, возможно с маленькой и числом)
    if (isUpperCase(char)) {
      let atom = char;
      i++;

      // Собираем строчные буквы (вторую часть атома)
      while (i < formula.length && isLowerCase(formula[i])) {
        atom += formula[i];
        i++;
      }

      // Собираем число после атома
      let count = 1;
      let numStr = '';
      while (i < formula.length && isDigit(formula[i])) {
        numStr += formula[i];
        i++;
      }

      if (numStr) {
        count = parseInt(numStr, 10);
      }

      tokens.push({ type: 'atom', value: atom, count });
      continue;
    }

    // Заряды (ионы) - пропускаем
    if (char === '-' || char === '+') {
      let charge = char;
      i++;

      // Собираем число заряда
      while (i < formula.length && isDigit(formula[i])) {
        charge += formula[i];
        i++;
      }

      // Заряды игнорируем при подсчете атомов
      continue;
    }

    // Пропускаем другие символы (цифры без атомов и т.д.)
    i++;
  }

  return tokens;
}

/**
 * Рекурсивный разбор токенов с учетом скобок
 */
function parseTokens(tokens: Token[], startIndex: number = 0, endIndex?: number): AtomCount {
  const result: AtomCount = {};
  let i = startIndex;

  while (i < tokens.length && (endIndex === undefined || i < endIndex)) {
    const token = tokens[i];

    if (token.type === 'atom') {
      // Обычный атом
      const atom = token.value;
      const count = token.count || 1;
      result[atom] = (result[atom] || 0) + count;
      i++;
    } else if (token.type === 'group') {
      // Нашли открывающую скобку, ищем соответствующую закрывающую
      const openChar = token.value;
      const closeChar = getClosingBracket(openChar);

      // Находим соответствующую закрывающую скобку
      let depth = 0;
      let closeIndex = -1;

      for (let j = i + 1; j < tokens.length; j++) {
        if (tokens[j].type === 'group' && tokens[j].value === openChar) {
          depth++;
        } else if (tokens[j].type === 'close' && tokens[j].value === closeChar) {
          if (depth === 0) {
            closeIndex = j;
            break;
          }
          depth--;
        }
      }

      if (closeIndex === -1) {
        throw new Error(`Не найдена закрывающая скобка для ${openChar}`);
      }

      // Рекурсивно парсим содержимое скобок
      const groupCount = tokens[closeIndex].count || 1;
      const innerTokens = parseTokens(tokens, i + 1, closeIndex);

      // Умножаем все атомы внутри скобок на множитель
      for (const [atom, count] of Object.entries(innerTokens)) {
        result[atom] = (result[atom] || 0) + count * groupCount;
      }

      i = closeIndex + 1;
    } else if (token.type === 'close') {
      // Закрывающая скобка без открывающей (должна быть обработана выше)
      i++;
    } else {
      i++;
    }
  }

  return result;
}

// Вспомогательные функции

function isUpperCase(char: string): boolean {
  return char >= 'A' && char <= 'Z';
}

function isLowerCase(char: string): boolean {
  return char >= 'a' && char <= 'z';
}

function isDigit(char: string): boolean {
  return char >= '0' && char <= '9';
}

function getClosingBracket(open: string): string {
  const map: { [key: string]: string } = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  return map[open] || open;
}
