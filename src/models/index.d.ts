import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Words {
  readonly id: string;
  readonly word?: string;
  readonly category?: string;
  readonly subCategory?: string;
  constructor(init: ModelInit<Words>);
  static copyOf(source: Words, mutator: (draft: MutableModel<Words>) => MutableModel<Words> | void): Words;
}