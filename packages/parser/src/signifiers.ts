import { Refs } from './project.location.js';
import { getTypes } from './types.checks.js';
import { Flags } from './types.flags.js';
import { Type, TypeStore } from './types.js';
import { PrimitiveName } from './types.primitives.js';

export class Signifier extends Refs(Flags) {
  readonly $tag = 'Sym';
  description: string | undefined = undefined;
  type: TypeStore = new TypeStore();
  /** For function params, the index of this param */
  idx: number | undefined = undefined;
  /** The Type containing this member */
  readonly parent: Type;

  constructor(parent: Type, readonly name: string, type?: Type | Type[]) {
    super();
    if (type) {
      this.type.type = type;
    }
    this.parent = parent;
  }

  toJSON() {
    return {
      $tag: this.$tag,
      name: this.name,
      type: this.type,
    };
  }

  describe(description: string | undefined): this {
    this.description = description;
    return this;
  }

  setType(newType: Type | TypeStore | (TypeStore | Type)[]): this {
    this.type.type = getTypes(newType);
    return this;
  }

  /** @deprecated Types should be set in one go instead of added piecemeal */
  addType(newType: Type | Type[]): this {
    // We may have duplicate types, but that information is
    // still useful since the same type information may have
    // come from multiple assignment statements.
    this.type.addType(newType);
    return this;
  }

  get isTyped(): boolean {
    return this.type.type.length > 0;
  }

  getTypeByKind<T extends PrimitiveName>(kind: T): Type<T> | undefined {
    return this.type.type.find((t) => t.kind === kind) as Type<T> | undefined;
  }
}
