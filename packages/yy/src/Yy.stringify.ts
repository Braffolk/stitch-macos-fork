import { FixedNumber } from './types/utility.js';

const escapable =
  // eslint-disable-next-line no-control-regex, no-misleading-character-class
  /[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
const meta = {
  // table of character substitutions
  '\b': '\\b',
  '\t': '\\t',
  '\n': '\\n',
  '\f': '\\f',
  '\r': '\\r',
  '"': '\\"',
  '\\': '\\\\',
};

const eol = `\r\n`; // GMS2 writes Windows-style line endings.

function quote(string: string) {
  // If the string contains no control characters, no quote characters, and no
  // backslash characters, then we can safely slap some quotes around it.
  // Otherwise we must also replace the offending characters with safe escape
  // sequences.

  escapable.lastIndex = 0;
  return escapable.test(string)
    ? '"' +
        string.replace(escapable, function (a) {
          const c = meta[a as keyof typeof meta];
          return typeof c === 'string'
            ? c
            : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        }) +
        '"'
    : '"' + string + '"';
}

export type AnyExceptPromise<T> = T extends Promise<any> ? never : T;

/**
 * Jsonify, with GameMaker-like JSON and allowing for BigInts.
 * Based on {@link https://github.com/sidorares/json-bigint/blob/master/lib/stringify.js json-bigint}
 */
export function stringifyYy(yyData: any): string {
  let gap = '';
  let level = 0; // Level 1 are root elements
  const indent = '  ';
  type Pointer = (string | number)[];

  /**
   * Recursively JSON-stringify
   */
  function stringify(key: number, holder: any[], pointer: Pointer): string;
  function stringify(
    key: string,
    holder: { [key: string]: string },
    pointer: Pointer,
  ): string;
  function stringify(key: number | string, holder: any, pointer: Pointer = []) {
    // Produce a string from holder[key].
    let value = holder[key];
    if (key !== '') {
      pointer.push(key);
    }

    const mind = gap;
    const startingLevel = level;

    if (value instanceof FixedNumber) {
      return value.toFixed(value.digits);
    }

    // If the value has a toJSON method, call it to obtain a replacement value.
    value = value?.toJSON?.(key) ?? value;

    // What happens next depends on the value's type.
    switch (typeof value) {
      case 'string':
        return quote(value);

      case 'number':
      case 'boolean':
      case 'bigint':
        // If the value is a boolean or null, convert it to a string. Note:
        // typeof null does not produce 'null'. The case is included here in
        // the remote chance that this gets fixed someday.

        return String(value);

      // If the type is 'object', we might be dealing with an object or an array or
      // null.

      case 'object': {
        // Due to a specification blunder in ECMAScript, typeof null is 'object',
        // so watch out for that case.

        if (!value) {
          return 'null';
        }

        // Make an array to hold the partial results of stringifying this object value.

        gap += indent;
        level++;

        // Is the value an array?

        if (Array.isArray(value)) {
          // Stringify every element. Use null as a placeholder
          // for non-JSON values.

          const jsonifiedValues = value.map(
            (_, i) => stringify(i, value, [...pointer]) || 'null',
          );

          // Join all of the elements together, separated with commas, and wrap them in
          // brackets.
          const v =
            jsonifiedValues.length === 0
              ? '[]'
              : `[${eol}` +
                gap +
                jsonifiedValues.join(`,${eol}` + gap) +
                `,${eol}` +
                mind +
                ']';
          gap = mind;
          level = startingLevel;
          return v;
        }

        const includeGaps = level <= 2;

        const partial: string[] = [];
        Object.keys(value).forEach(function (k) {
          const v = stringify(k, value, [...pointer]);
          if (v) {
            partial.push(quote(k) + (includeGaps ? ': ' : ':') + v);
          }
        });

        // Join all of the member texts together, separated with commas,
        // and wrap them in braces.

        const v =
          partial.length === 0
            ? '{}'
            : includeGaps
            ? `{${eol}` +
              gap +
              partial.join(`,${eol}` + gap) +
              `,${eol}` +
              mind +
              '}'
            : '{' + partial.join(',') + ',}';
        gap = mind;
        level = startingLevel;
        return v;
      }
    }
    return;
  }

  // If there is a replacer, it must be a function or an array.
  // Otherwise, throw an error.

  // Make a fake root object containing our value under the key of ''.
  // Return the result of stringifying the value.

  return stringify(
    '',
    {
      '': yyData,
    },
    [],
  );
}
