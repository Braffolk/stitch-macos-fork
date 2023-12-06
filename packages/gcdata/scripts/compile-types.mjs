import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();
//
import { pathy } from '@bscotch/pathy';
import { ok } from 'assert';
import { compile } from 'json-schema-to-typescript';
import { GameChanger, Gcdata } from '../dist/GameChanger.js';
import { computeMotePointersFromSchema } from '../dist/util.js';

const packed = await GameChanger.from('Crashlands2');
ok(packed);

/** @type {string} */
let dataString = JSON.stringify(packed.base.data);
// Replace all refs with proper JSON Pointers
dataString = dataString
  .replace(/"\$ref":\s*"([^"]+)"/g, '"$ref": "#/$defs/$1"')
  .replace(
    /"additionalProperties":\s*0(\.0)?/g,
    '"additionalProperties": false',
  )
  .replace(/"additionalProperties":\s*1(\.0)?/g, '"additionalProperties": true')
  .replace(/"bConst"/g, '"const"');

/** @type {Gcdata['schemas']} */
const schemas = JSON.parse(dataString).schemas;

// We use "required: true" to indicate that ALL properties are required,
// so we need to iterate through all schemas to set that to JSON Schema spec
for (const schema of Object.values(schemas)) {
  recursivelyPortBschemaToJsonSchema(schema);
}

// await pathy('tmp.json').write(schemas);
const schemaNames = Object.keys(schemas);
const rootSchema = {
  $defs: schemas,
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: schemaNames,
  properties: Object.fromEntries(
    schemaNames.map((name) => [name, { $ref: `#/$defs/${name}` }]),
  ),
};

// // We want types for Storylines and Quests
// const storylineSchema = packed.getSchema('cl2_storyline');
// ok(storylineSchema);
// const questSchema = packed.getSchema('cl2_quest');
// ok(questSchema);

const storylineTypes = await compile(rootSchema, 'Schemas', {
  additionalProperties: false,
});
await pathy('src/cl2.types.auto.ts').write(
  `export namespace Crashlands2 {\n\t${storylineTypes.replace(
    /\n/g,
    '\n\t',
  )}\n}\n`,
);

// Create types for Quest Mote paths
const questMoteSchema = packed.base.getSchema('cl2_quest');
ok(questMoteSchema);
const questPointers = [
  ...computeMotePointersFromSchema(packed.base, questMoteSchema),
]
  .filter((p) => !p.startsWith('objectives'))
  .map((p) => `\`${p.replace(/\*/g, '${string}')}\``)
  .sort();
await pathy('src/cl2.quest.pointers.ts').write(
  `export type QuestMoteDataPointer = \`data/\${QuestMotePointer}\`;\nexport type QuestMotePointer = ${questPointers.join(
    '\n  | ',
  )};\n`,
);
const storylinePointers = [
  ...computeMotePointersFromSchema(
    packed.base,
    exists(packed.base.getSchema('cl2_storyline')),
  ),
]
  .map((p) => `\`${p.replace(/\*/g, '${string}')}\``)
  .sort();
await pathy('src/cl2.storyline.pointers.ts').write(
  `export type StorylineMoteDataPointer = \`data/\${StorylineMotePointer}\`;\nexport type StorylineMotePointer = ${storylinePointers.join(
    '\n  | ',
  )};\n`,
);

/**
 * @param {import('../dist/types.js').Bschema} schema
 */
function recursivelyPortBschemaToJsonSchema(schema) {
  const isObject =
    schema &&
    (schema.type === 'object' ||
      'properties' in schema ||
      'additionalProperties' in schema);
  if (!isObject) return schema;

  const propNames = Object.keys(schema.properties || {});
  if (schema.required && !Array.isArray(schema.required)) {
    // Then ALL fields are required
    schema.required = propNames;
  }
  // Continue on the property fields
  for (const propName of propNames) {
    recursivelyPortBschemaToJsonSchema(schema.properties[propName]);
  }
  recursivelyPortBschemaToJsonSchema(schema.additionalProperties);
  return schema;
}

/**
 * @template T
 * @param {T} thing
 * @returns {Exclude<T, undefined | null>}
 */
function exists(thing) {
  if ([undefined, null].includes(thing))
    throw new Error(`Expected ${thing} to exist`);
  return thing;
}
