import nspell from 'nspell';
import type { GameChanger } from './GameChanger.js';
import { ParsedLineItem } from './cl2.quest.types.js';
import { aff, dic } from './dict.js';
import {
  normalizePointer,
  parsedItemToWords,
  resolvePointerInSchema,
} from './util.js';

export class SpellChecker {
  protected checker = nspell(Buffer.from(aff), Buffer.from(dic));

  constructor(
    public readonly gameChanger: GameChanger,
    protected options: {
      /** Motes with these schema IDs will not have their names added to the dictionary */
      skipSchemas?: string[];
    } = {},
  ) {
    this.reload();
    // // NOTE: This is pretty expensive since it rebuilds the whole dictionary.
    // gameChangerEvents.on('gamechanger-changes-saved', () => this.reload());
  }

  checkWord(word: ParsedLineItem) {
    let value = word.value;
    if (value.match(/in'$/)) {
      // Then it's a Tendraam-style contraction
      value = value.replace(/in'$/, 'ing');
    }
    if (value.match(/'s$/)) {
      // Probably an intentional possessive of something.
      value = value.replace(/'s$/, '');
    }
    if (value.match(/s$/) && !this.checker.correct(value)) {
      // Probably a simple plural
      value = value.replace(/s$/, '');
    }
    const valid = this.checker.correct(value);
    return {
      ...word,
      valid,
      // // NOTE: Suggestions are costly to compute, should do it on demand
      // suggestions: valid ? undefined : this.checker.suggest(value),
    };
  }

  check(text: ParsedLineItem) {
    // Split the text into words
    return parsedItemToWords(text).map((w) => this.checkWord(w));
  }

  reload() {
    this.checker = nspell(Buffer.from(aff), Buffer.from(dic));
    const words = this.listMoteNameWords();
    this.checker.personal(words.join('\n'));
  }

  /** Get the list of localized Mote Names, broken into "words" for use in the dictionary. */
  protected listMoteNameWords() {
    const names: string[] = [];

    // Find all mote names that are meant to be localized, and
    // add those names to the spell checker.
    const motes = this.gameChanger.working.listMotes();
    for (const mote of motes) {
      if (this.options.skipSchemas?.includes(mote.schema_id)) continue;
      const schema = this.gameChanger.working.getSchema(mote.schema_id);
      const namePointer = schema?.name;
      if (!schema || !namePointer) continue;
      // Need to check one level up to see if this is an L10n field.
      const parentPointer = normalizePointer(namePointer);
      parentPointer.pop();
      const nameSchema = resolvePointerInSchema(
        parentPointer,
        mote,
        this.gameChanger.working,
      );
      if (
        nameSchema &&
        'format' in nameSchema &&
        nameSchema.format === 'l10n' &&
        !mote.data.wip?.draft
      ) {
        names.push(this.gameChanger.working.getMoteName(mote.id)!);
      }
    }

    const words = new Set<string>();
    for (const name of names) {
      const parts = name.trim().split(/\s+/g);
      for (let part of parts) {
        // Remove any apostrophes
        part = part.replace(/'.*/g, '');
        // Remove any trailing punctuation
        part = part.replace(/\s*[!?)\]-]+$/g, '');
        // Remove any leading punctuation
        part = part.replace(/^[!?([-]+\s*/g, '');

        const skip =
          part.length < 2 ||
          part.match(/^\d+|\d+x\d+|.*\/.*$/) ||
          this.checker.correct(part);
        if (!skip) {
          words.add(part);
        }
      }
    }
    // Sort by lower-case
    return [...words].sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase()),
    );
  }
}
